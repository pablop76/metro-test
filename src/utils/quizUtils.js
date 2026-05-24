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

// ===== STARRED QUESTIONS =====

export const getStarredIds = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem("starred-questions") || "[]"));
  } catch {
    return new Set();
  }
};

export const toggleStarred = (questionText) => {
  const ids = getStarredIds();
  if (ids.has(questionText)) {
    ids.delete(questionText);
  } else {
    ids.add(questionText);
  }
  localStorage.setItem("starred-questions", JSON.stringify([...ids]));
  return new Set(ids);
};

// ===== SESSION HISTORY =====

export const loadSessions = () => {
  try {
    return JSON.parse(localStorage.getItem("session-history") || "[]");
  } catch {
    return [];
  }
};

export const saveSession = (session) => {
  const sessions = loadSessions();
  sessions.unshift(session);
  localStorage.setItem("session-history", JSON.stringify(sessions.slice(0, 15)));
};

// ===== QUESTION STATS =====

export const getQuestionStats = () => {
  try {
    return JSON.parse(localStorage.getItem("question-stats") || "{}");
  } catch {
    return {};
  }
};

export const updateQuestionStat = (questionText, isCorrect) => {
  const stats = getQuestionStats();
  if (!stats[questionText]) stats[questionText] = { correct: 0, wrong: 0 };
  if (isCorrect) {
    stats[questionText].correct++;
  } else {
    stats[questionText].wrong++;
  }
  localStorage.setItem("question-stats", JSON.stringify(stats));
};

export const getWeakestQuestions = (allQuestions) => {
  const stats = getQuestionStats();
  return allQuestions
    .filter((q) => {
      const s = stats[q.question];
      return s && (s.correct + s.wrong) >= 3 && s.wrong > 0;
    })
    .sort((a, b) => {
      const sa = stats[a.question];
      const sb = stats[b.question];
      const rateA = sa.correct / (sa.correct + sa.wrong);
      const rateB = sb.correct / (sb.correct + sb.wrong);
      return rateA - rateB;
    });
};
