import { loadSessions } from "../../utils/quizUtils";

const CATEGORY_LABELS = {
  all: "Pula pytań",
  skoda: "Śkoda",
  inspiro: "Inspiro",
  sygnalizacja: "Sygnalizacja",
  instrukcja: "Instrukcja",
  metropolis: "Metropolis",
  sop: "SOP",
  linia2: "Linia nr 2",
  starred: "Trudne",
  81: "Seria 81",
};

const CHART_HEIGHT = 60;
const BAR_WIDTH = 18;
const PASS_LINE = 75;

const TrendChart = ({ sessions }) => {
  const chartSessions = [...sessions].reverse().slice(-10);
  const total = chartSessions.length;
  const chartWidth = total * (BAR_WIDTH + 6) + 8;

  return (
    <div className="trend-chart-wrap">
      <svg width={chartWidth} height={CHART_HEIGHT + 20} style={{ overflow: "visible" }}>
        {/* linia progu zaliczenia 75% */}
        <line
          x1={0}
          y1={CHART_HEIGHT - (PASS_LINE / 100) * CHART_HEIGHT}
          x2={chartWidth}
          y2={CHART_HEIGHT - (PASS_LINE / 100) * CHART_HEIGHT}
          stroke="rgba(251,191,36,0.45)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text
          x={chartWidth - 2}
          y={CHART_HEIGHT - (PASS_LINE / 100) * CHART_HEIGHT - 3}
          fontSize="8"
          fill="rgba(251,191,36,0.6)"
          textAnchor="end"
        >
          75%
        </text>

        {chartSessions.map((s, i) => {
          const barH = Math.max(3, (s.percentage / 100) * CHART_HEIGHT);
          const x = i * (BAR_WIDTH + 6) + 4;
          const y = CHART_HEIGHT - barH;
          const color = s.passed ? "#22c55e" : s.percentage >= 50 ? "#f59e0b" : "#ef4444";

          return (
            <g key={i}>
              <rect x={x} y={y} width={BAR_WIDTH} height={barH} rx="3" fill={color} opacity="0.85" />
              <text
                x={x + BAR_WIDTH / 2}
                y={CHART_HEIGHT + 13}
                fontSize="8"
                fill="rgba(255,255,255,0.4)"
                textAnchor="middle"
              >
                {s.percentage}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SessionHistory = () => {
  const sessions = loadSessions();

  if (sessions.length === 0) {
    return (
      <div className="session-history">
        <p className="session-history-empty">Brak zapisanych sesji. Ukończ test, aby zobaczyć historię.</p>
      </div>
    );
  }

  const totalSessions = sessions.length;
  const passedCount = sessions.filter((s) => s.passed).length;
  const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.percentage, 0) / totalSessions);

  return (
    <div className="session-history">
      <p className="session-history-title">Statystyki sesji</p>

      {/* Podsumowanie */}
      <div className="session-summary">
        <div className="session-stat-pill">
          <span className="session-stat-val">{totalSessions}</span>
          <span className="session-stat-label">sesji</span>
        </div>
        <div className="session-stat-pill">
          <span className="session-stat-val" style={{ color: "#4ade80" }}>{passedCount}</span>
          <span className="session-stat-label">zaliczonych</span>
        </div>
        <div className="session-stat-pill">
          <span className="session-stat-val" style={{ color: avgScore >= 75 ? "#4ade80" : "#f87171" }}>{avgScore}%</span>
          <span className="session-stat-label">śr. wynik</span>
        </div>
      </div>

      {/* Wykres trendu */}
      {sessions.length >= 2 && (
        <div className="trend-chart-container">
          <p className="trend-chart-label">Trend (ostatnie {Math.min(sessions.length, 10)} sesji)</p>
          <TrendChart sessions={sessions} />
        </div>
      )}

      {/* Lista sesji */}
      <div className="session-list">
        {sessions.map((s, i) => {
          const date = new Date(s.date);
          const dateStr = date.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
          const timeStr = date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
          const cats = s.categories.map((c) => CATEGORY_LABELS[c] || c).join(", ");
          const statusClass = s.passed ? "session-pass" : "session-fail";
          const scoreClass = s.passed ? "score-pass" : "score-fail";

          return (
            <div key={i} className={`session-row ${statusClass}`}>
              <div className="session-date">{dateStr} · {timeStr}</div>
              <div className="session-cats">{cats}</div>
              <div className="session-score">
                <span className={scoreClass}>{s.percentage}%</span>
                <span className="score-detail">{s.correct}/{s.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionHistory;
