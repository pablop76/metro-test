import { STORAGE_KEYS, SCHEMA_VERSION } from "../constants";

/**
 * Losuje `counter` pytań z tablicy bez powtórzeń (Fisher-Yates shuffle variant)
 * @param {Array} arr - tablica pytań
 * @param {number} counter - ile pytań wylosować
 * @returns {Array|null} - wylosowana tablica lub null przy błędzie
 */
export const draw = (arr, counter) => {
  const arr2 = [...arr];
  const result = [];
  if (arr2.length < counter) {
    return null;
  }
  for (let i = 0; i < counter; i++) {
    const index = Math.floor(Math.random() * arr2.length);
    result.push(arr2[index]);
    arr2.splice(index, 1);
  }
  return result;
};

/**
 * Oblicza procent poprawnych odpowiedzi
 */
export const getScorePercentage = (correct, total) =>
  total > 0 ? Math.round((correct / total) * 100) : 0;

// ===== IDENTYFIKACJA PYTAŃ =====

/**
 * Klucz zastępczy dla pytań bez `id` — np. zapisanych w pauzie przez starszą
 * wersję aplikacji albo dopisanych ręcznie do bazy. Para treść+obrazek jest
 * unikalna w całej bazie, więc rozróżnia nawet pytania o identycznym brzmieniu.
 */
const legacyKey = (question) => `${question.question}||${question.image || ""}`;

/**
 * Stabilny identyfikator pytania — klucz statystyk, gwiazdek i trybu trudnych pytań.
 *
 * Nie wolno tu wracać do samej treści pytania: 35 pytań w 6 grupach brzmi
 * identycznie (np. "Opisz symbole" × 17), a różni je wyłącznie obrazek
 * i poprawna odpowiedź. Treść jest też nietrwała — poprawka literówki
 * kasowałaby postęp zapisany pod starym brzmieniem.
 */
export const getQuestionId = (question) => {
  if (!question) return "";
  return question.id || legacyKey(question);
};

// ===== STARRED QUESTIONS =====

export const getStarredIds = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.starredQuestions) || "[]"));
  } catch {
    return new Set();
  }
};

export const toggleStarred = (question) => {
  const key = getQuestionId(question);
  const ids = getStarredIds();
  if (ids.has(key)) {
    ids.delete(key);
  } else {
    ids.add(key);
  }
  localStorage.setItem(STORAGE_KEYS.starredQuestions, JSON.stringify([...ids]));
  return new Set(ids);
};

// ===== SESSION HISTORY =====

export const loadSessions = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.sessionHistory) || "[]");
  } catch {
    return [];
  }
};

export const saveSession = (session) => {
  const sessions = loadSessions();
  sessions.unshift(session);
  localStorage.setItem(STORAGE_KEYS.sessionHistory, JSON.stringify(sessions.slice(0, 15)));
};

// ===== PAUSED SESSION =====

export const savePausedSession = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.pausedSession, JSON.stringify(data));
  } catch {}
};

export const loadPausedSession = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.pausedSession) || "null");
  } catch {
    return null;
  }
};

export const clearPausedSession = () => {
  localStorage.removeItem(STORAGE_KEYS.pausedSession);
};

/**
 * Podmienia pytania zapisane w pauzie na aktualne obiekty z bazy — dzięki temu
 * wznowiona sesja korzysta z bieżącej treści i ma `id` (sesje zapisane starszą
 * wersją aplikacji go nie miały). Dopasowanie po treści+obrazku, bo ta para
 * jest unikalna. Pytania, których nie ma już w bazie, zostają bez zmian.
 */
export const remapPausedSession = (session, allQuestions) => {
  if (!session || !Array.isArray(session.currentTest)) return session;
  const byKey = new Map(allQuestions.map((q) => [legacyKey(q), q]));
  return {
    ...session,
    currentTest: session.currentTest.map((q) => byKey.get(legacyKey(q)) || q),
    wrongAnswers: Array.isArray(session.wrongAnswers)
      ? session.wrongAnswers.map((q) => byKey.get(legacyKey(q)) || q)
      : [],
  };
};

// ===== QUESTION STATS =====

export const getQuestionStats = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.questionStats) || "{}");
  } catch {
    return {};
  }
};

export const updateQuestionStat = (question, isCorrect) => {
  const key = getQuestionId(question);
  if (!key) return;
  const stats = getQuestionStats();
  if (!stats[key]) stats[key] = { correct: 0, wrong: 0, wrongStreak: 0, correctStreak: 0, difficult: false };
  const s = stats[key];
  if (isCorrect) {
    s.correct++;
    s.correctStreak = (s.correctStreak || 0) + 1;
    s.wrongStreak = 0;
    if (s.correctStreak >= 2) s.difficult = false;
  } else {
    s.wrong++;
    s.wrongStreak = (s.wrongStreak || 0) + 1;
    s.correctStreak = 0;
    if (s.wrongStreak >= 2) s.difficult = true;
  }
  localStorage.setItem(STORAGE_KEYS.questionStats, JSON.stringify(stats));
};

export const getCategoryStats = (allQuestions) => {
  const stats = getQuestionStats();
  const result = {};
  allQuestions.forEach((q) => {
    const s = stats[getQuestionId(q)];
    q.category.forEach((cat) => {
      if (!result[cat]) result[cat] = { total: 0, correct: 0, wrong: 0 };
      result[cat].total++;
      if (s) {
        result[cat].correct += s.correct || 0;
        result[cat].wrong += s.wrong || 0;
      }
    });
  });
  return result;
};

export const getWeakestQuestions = (allQuestions) => {
  const stats = getQuestionStats();
  return allQuestions
    .filter((q) => stats[getQuestionId(q)]?.difficult === true)
    .sort((a, b) => {
      const sa = stats[getQuestionId(a)];
      const sb = stats[getQuestionId(b)];
      const rateA = sa.correct / (sa.correct + sa.wrong);
      const rateB = sb.correct / (sb.correct + sb.wrong);
      return rateA - rateB;
    });
};

// ===== MIGRACJA DO IDENTYFIKATORÓW =====

/**
 * Przenosi statystyki i gwiazdki ze starego klucza (treść pytania) na `id`.
 * Uruchamiana raz, po załadowaniu bazy pytań.
 *
 * Wpisy dla pytań o powtarzającej się treści są odrzucane — nie da się ustalić,
 * którego z nich dotyczyły, a przeniesienie ich na wszystkie pytania w grupie
 * powieliłoby błąd, który ta zmiana naprawia. Na obecnej bazie kosztuje to
 * 6 z 314 zapisanych wpisów; pozostałe 308 przechodzą 1:1.
 *
 * @returns {Object|null} raport z migracji albo null, gdy nie była potrzebna
 */
export const migrateStorageToIds = (allQuestions) => {
  if (Number(localStorage.getItem(STORAGE_KEYS.schemaVersion) || 0) >= SCHEMA_VERSION) return null;

  // Treść pytania → lista id. Więcej niż jedno id oznacza kolizję nie do rozstrzygnięcia.
  const byText = new Map();
  allQuestions.forEach((q) => {
    const list = byText.get(q.question) || [];
    list.push(getQuestionId(q));
    byText.set(q.question, list);
  });
  const knownIds = new Set(allQuestions.map((q) => getQuestionId(q)));

  const resolve = (oldKey) => {
    if (knownIds.has(oldKey)) return oldKey; // już zmigrowane
    const ids = byText.get(oldKey);
    return ids && ids.length === 1 ? ids[0] : null;
  };

  const report = { statsMoved: 0, statsDropped: 0, starredMoved: 0, starredDropped: 0 };

  const oldStats = getQuestionStats();
  const newStats = {};
  Object.entries(oldStats).forEach(([oldKey, value]) => {
    const id = resolve(oldKey);
    if (id) {
      newStats[id] = value;
      report.statsMoved++;
    } else {
      report.statsDropped++;
    }
  });
  localStorage.setItem(STORAGE_KEYS.questionStats, JSON.stringify(newStats));

  const oldStarred = getStarredIds();
  const newStarred = new Set();
  oldStarred.forEach((oldKey) => {
    const id = resolve(oldKey);
    if (id) {
      newStarred.add(id);
      report.starredMoved++;
    } else {
      report.starredDropped++;
    }
  });
  localStorage.setItem(STORAGE_KEYS.starredQuestions, JSON.stringify([...newStarred]));

  localStorage.setItem(STORAGE_KEYS.schemaVersion, String(SCHEMA_VERSION));
  return report;
};
