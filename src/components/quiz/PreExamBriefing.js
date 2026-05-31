import { useMemo } from "react";
import { getCategoryStats, loadSessions, getQuestionStats } from "../../utils/quizUtils";

const EXAM_CATS = [
  { key: "inspiro",      label: "Inspiro" },
  { key: "skoda",        label: "Śkoda / Varsovia" },
  { key: "sygnalizacja", label: "Sygnalizacja" },
  { key: "sop",          label: "SOP" },
  { key: "instrukcja",   label: "Instrukcja" },
  { key: "metropolis",   label: "Metropolis" },
  { key: "linia2",       label: "Linia nr 2" },
];

const ScoreBar = ({ score, color }) => (
  <div className="briefing-bar-bg">
    <div
      className="briefing-bar-fill"
      style={{ width: `${score}%`, background: color }}
    />
    <div className="briefing-bar-pass-line" />
  </div>
);

const PreExamBriefing = ({ allQuestions, onStartExam, onStudyWeak, weakCount }) => {
  const catStats   = useMemo(() => getCategoryStats(allQuestions), [allQuestions]);
  const qStats     = useMemo(() => getQuestionStats(), []);
  const sessions   = useMemo(() => loadSessions(), []);

  // ===== GOTOWOŚĆ PER KATEGORIA =====
  const catScores = EXAM_CATS.map(({ key, label }) => {
    const c = catStats[key];
    if (!c || c.correct + c.wrong === 0) return { key, label, score: null, correct: 0, wrong: 0, total: c?.total || 0 };
    const score = Math.round((c.correct / (c.correct + c.wrong)) * 100);
    return { key, label, score, correct: c.correct, wrong: c.wrong, total: c.total };
  });

  const answeredCats = catScores.filter(c => c.score !== null);
  const hasData = answeredCats.length > 0;

  // ===== OGÓLNA GOTOWOŚĆ (ważona liczbą prób) =====
  const totalCorrect  = answeredCats.reduce((s, c) => s + c.correct, 0);
  const totalAttempts = answeredCats.reduce((s, c) => s + c.correct + c.wrong, 0);
  const readiness     = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  // ===== SYGNALIZACJA (dyskwalifikuje egzamin przy błędzie) =====
  const sygCat  = catScores.find(c => c.key === "sygnalizacja");
  const sygOk   = sygCat?.score !== null && sygCat.score >= 75;
  const sygWarn = sygCat?.score !== null && sygCat.score < 75;

  // ===== SŁABE KATEGORIE =====
  const weakCats = catScores
    .filter(c => c.score !== null && c.score < 75)
    .sort((a, b) => a.score - b.score);

  const goodCats = catScores.filter(c => c.score !== null && c.score >= 75);

  // ===== NAJTRUDNIEJSZE PYTANIA =====
  const hardQuestions = allQuestions
    .filter(q => {
      const s = qStats[q.question];
      return s && s.difficult === true;
    })
    .map(q => {
      const s = qStats[q.question];
      const tot = s.correct + s.wrong;
      return { text: q.question, rate: tot > 0 ? Math.round((s.correct / tot) * 100) : 0, wrong: s.wrong };
    })
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 5);

  // ===== TREND Z HISTORII =====
  const recent5    = sessions.slice(0, 5);
  const recentAvg  = recent5.length > 0
    ? Math.round(recent5.reduce((s, x) => s + x.percentage, 0) / recent5.length)
    : null;
  const trendUp    = recent5.length >= 2 && recent5[0].percentage > recent5[recent5.length - 1].percentage;
  const trendDown  = recent5.length >= 2 && recent5[0].percentage < recent5[recent5.length - 1].percentage;

  // ===== ETYKIETA GOTOWOŚCI =====
  const readinessInfo = (() => {
    if (readiness === null) return null;
    if (readiness >= 85) return { label: "Gotowy na egzamin",       color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)",  icon: "✓" };
    if (readiness >= 75) return { label: "Prawie gotowy",           color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.25)", icon: "✓" };
    if (readiness >= 55) return { label: "Wymaga więcej ćwiczeń",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  icon: "!" };
    return                       { label: "Za wcześnie na egzamin", color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)",   icon: "✗" };
  })();

  const scoreColor = (s) => {
    if (s === null) return "#4b5563";
    if (s >= 75) return "#22c55e";
    if (s >= 50) return "#f59e0b";
    return "#ef4444";
  };

  // ===== BRAK DANYCH =====
  if (!hasData) {
    return (
      <div className="briefing-wrap">
        <div className="briefing-no-data">
          <div className="briefing-no-data-icon">📋</div>
          <p className="briefing-no-data-title">Brak danych do analizy</p>
          <p className="briefing-no-data-sub">Odpowiedz na kilka pytań w quizie — po pierwszej sesji zobaczysz tutaj swoją gotowość do egzaminu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="briefing-wrap">

      {/* ===== NAGŁÓWEK ===== */}
      <div className="briefing-header">
        <div>
          <div className="briefing-label">PRZED EGZAMINEM</div>
          <div className="briefing-sub">Analiza Twojej gotowości na podstawie {totalAttempts} odpowiedzi</div>
        </div>
        {recentAvg !== null && (
          <div className="briefing-trend">
            <span style={{ color: trendUp ? "#4ade80" : trendDown ? "#f87171" : "rgba(255,255,255,0.5)" }}>
              {trendUp ? "↑" : trendDown ? "↓" : "→"}
            </span>
            <span>{recentAvg}%</span>
            <span className="briefing-trend-label">śr. ostatnie sesje</span>
          </div>
        )}
      </div>

      {/* ===== WSKAŹNIK GOTOWOŚCI ===== */}
      {readinessInfo && (
        <div className="briefing-readiness" style={{ background: readinessInfo.bg, borderColor: readinessInfo.border }}>
          <div className="briefing-readiness-score" style={{ color: readinessInfo.color }}>
            {readiness}%
          </div>
          <div className="briefing-readiness-right">
            <div className="briefing-readiness-label" style={{ color: readinessInfo.color }}>
              {readinessInfo.icon} {readinessInfo.label}
            </div>
            <ScoreBar score={readiness} color={readinessInfo.color} />
            <div className="briefing-readiness-counts">
              <span style={{ color: "#4ade80" }}>{goodCats.length} kat. opanowanych</span>
              {weakCats.length > 0 && <span style={{ color: "#f87171" }}>{weakCats.length} do nadrobienia</span>}
            </div>
          </div>
        </div>
      )}

      {/* ===== SYGNALIZACJA ALERT ===== */}
      {sygCat?.score !== null && (
        <div className={`briefing-syg-alert ${sygOk ? "briefing-syg-ok" : "briefing-syg-warn"}`}>
          <span className="briefing-syg-icon">{sygOk ? "✓" : "⚠"}</span>
          <span>
            <strong>Sygnalizacja {sygCat.score}%</strong>
            {sygOk
              ? " — jeden błąd dyskwalifikuje egzamin. Wynik bezpieczny."
              : " — UWAGA: jeden błąd z sygnalizacji dyskwalifikuje egzamin. Ćwicz priorytetowo!"}
          </span>
        </div>
      )}

      <div className="briefing-grid">

        {/* ===== SŁABE KATEGORIE ===== */}
        {weakCats.length > 0 && (
          <div className="briefing-card">
            <div className="briefing-card-title">Słabe kategorie</div>
            {weakCats.map(c => (
              <div key={c.key} className="briefing-cat-row">
                <span className="briefing-cat-name">{c.label}</span>
                <div className="briefing-cat-bar-wrap">
                  <div className="briefing-cat-bar-bg">
                    <div className="briefing-cat-bar-fill" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                    <div className="briefing-cat-pass-line" />
                  </div>
                </div>
                <span className="briefing-cat-score" style={{ color: scoreColor(c.score) }}>{c.score}%</span>
              </div>
            ))}
          </div>
        )}

        {/* ===== NAJTRUDNIEJSZE PYTANIA ===== */}
        {hardQuestions.length > 0 && (
          <div className="briefing-card">
            <div className="briefing-card-title">Najtrudniejsze pytania <span className="briefing-card-hint">({hardQuestions.length} aktywnych)</span></div>
            {hardQuestions.map((q, i) => (
              <div key={i} className="briefing-q-row">
                <span className="briefing-q-num">{i + 1}</span>
                <span className="briefing-q-text">{q.text}</span>
                <span className="briefing-q-rate" style={{ color: scoreColor(q.rate) }}>{q.rate}%</span>
              </div>
            ))}
            {weakCount > 5 && (
              <div className="briefing-q-more">+{weakCount - 5} więcej trudnych pytań</div>
            )}
          </div>
        )}

        {/* ===== WYNIK KATEGORII (wszystkie) ===== */}
        <div className="briefing-card briefing-card-wide">
          <div className="briefing-card-title">Wszystkie kategorie egzaminacyjne</div>
          <div className="briefing-all-cats">
            {catScores.map(c => (
              <div key={c.key} className="briefing-all-cat-row">
                <span className="briefing-all-cat-name">{c.label}</span>
                <div className="briefing-all-cat-bar-bg">
                  {c.score !== null
                    ? <div className="briefing-all-cat-bar-fill" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                    : <div className="briefing-all-cat-nodata">brak danych</div>
                  }
                  <div className="briefing-cat-pass-line" />
                </div>
                <span className="briefing-all-cat-score" style={{ color: scoreColor(c.score) }}>
                  {c.score !== null ? `${c.score}%` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ===== CTA BUTTONS ===== */}
      <div className="briefing-actions">
        {weakCount > 0 && (
          <button className="briefing-btn briefing-btn-weak" onClick={onStudyWeak}>
            Ćwicz trudne pytania ({weakCount})
          </button>
        )}
        <button className="briefing-btn briefing-btn-exam" onClick={onStartExam}>
          Zacznij egzamin próbny
        </button>
      </div>

    </div>
  );
};

export default PreExamBriefing;
