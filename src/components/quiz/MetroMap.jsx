import { useState, useMemo } from "react";
import { getCategoryStats } from "../../utils/quizUtils";

const LINE1 = [
  { key: "inspiro",      label: "Inspiro",      cx: 75,  cy: 150, labelAnchor: "middle", labelDy: 28 },
  { key: "skoda",        label: "Śkoda",        cx: 210, cy: 150, labelAnchor: "middle", labelDy: 28 },
  { key: "sygnalizacja", label: "Sygnalizacja", cx: 350, cy: 150, labelAnchor: "middle", labelDy: 28 },
  { key: "metropolis",   label: "Metropolis",   cx: 630, cy: 150, labelAnchor: "middle", labelDy: 28 },
  { key: "81",           label: "Seria 81",     cx: 740, cy: 150, labelAnchor: "middle", labelDy: 28 },
];

const LINE2 = [
  { key: "sop",       label: "SOP",        cx: 490, cy: 230, labelAnchor: "start", labelDx: 30, labelDy: 4 },
  { key: "instrukcja",label: "Instrukcja", cx: 490, cy: 295, labelAnchor: "start", labelDx: 30, labelDy: 4 },
  { key: "linia2",    label: "Linia nr 2", cx: 490, cy: 355, labelAnchor: "start", labelDx: 30, labelDy: 4 },
];

const JUNCTION = { key: "_egzamin", label: "Egzamin", cx: 490, cy: 150 };
const ALL_STATIONS = [...LINE1, JUNCTION, ...LINE2];

const scoreColor = (score) => {
  if (score === null) return "#374151";
  if (score >= 75)    return "#22c55e";
  if (score >= 50)    return "#f59e0b";
  return "#ef4444";
};

const scoreGlow = (score) => {
  if (score === null) return "none";
  if (score >= 75)    return "drop-shadow(0 0 6px rgba(34,197,94,0.6))";
  if (score >= 50)    return "drop-shadow(0 0 6px rgba(245,158,11,0.6))";
  return "drop-shadow(0 0 6px rgba(239,68,68,0.6))";
};

const Station = ({ station, score, onClick, hovered, onHover }) => {
  const color = scoreColor(score);
  const r = station.key === "_egzamin" ? 22 : 16;
  const innerR = station.key === "_egzamin" ? 11 : 8;

  return (
    <g
      style={{ cursor: "pointer" }}
      onClick={() => onClick(station)}
      onMouseEnter={() => onHover(station.key)}
      onMouseLeave={() => onHover(null)}
      filter={hovered === station.key ? scoreGlow(score) : "none"}
    >
      {/* outer ring */}
      <circle cx={station.cx} cy={station.cy} r={r} fill="#071423" stroke={color} strokeWidth={station.key === "_egzamin" ? 4 : 3.5} />
      {/* inner dot */}
      <circle cx={station.cx} cy={station.cy} r={innerR} fill={color} opacity={score === null ? 0.4 : 0.95} />

      {/* egzamin label — above */}
      {station.key === "_egzamin" && (
        <>
          <text x={station.cx} y={station.cy - 30} textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12" fontWeight="700" letterSpacing="0.08em">
            EGZAMIN
          </text>
          <text x={station.cx} y={station.cy - 16} textAnchor="middle" fill={color} fontSize="11" fontWeight="600">
            {score !== null ? `${score}%` : "brak danych"}
          </text>
        </>
      )}

      {/* M1 stations — label below */}
      {station.labelDy && (
        <>
          <text x={station.cx + (station.labelDx || 0)} y={station.cy + station.labelDy} textAnchor={station.labelAnchor} fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="600">
            {station.label}
          </text>
          <text x={station.cx + (station.labelDx || 0)} y={station.cy + station.labelDy + 14} textAnchor={station.labelAnchor} fill={color} fontSize="11" fontWeight="700">
            {score !== null ? `${score}%` : "—"}
          </text>
        </>
      )}
    </g>
  );
};

const MetroMap = ({ allQuestions }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const catStats = useMemo(() => getCategoryStats(allQuestions), [allQuestions]);

  const getScore = (key) => {
    if (key === "_egzamin") {
      // średnia ważona wszystkich kategorii M1+M2
      let totalCorrect = 0, totalWrong = 0;
      [...LINE1, ...LINE2].forEach(s => {
        const c = catStats[s.key];
        if (c) { totalCorrect += c.correct; totalWrong += c.wrong; }
      });
      const tot = totalCorrect + totalWrong;
      return tot > 0 ? Math.round((totalCorrect / tot) * 100) : null;
    }
    const c = catStats[key];
    if (!c) return null;
    const tot = c.correct + c.wrong;
    return tot > 0 ? Math.round((c.correct / tot) * 100) : null;
  };

  // Ogólny progress
  const overallScore = getScore("_egzamin");
  const masteredCount = ALL_STATIONS.filter(s => s.key !== "_egzamin" && getScore(s.key) !== null && getScore(s.key) >= 75).length;
  const totalCats = LINE1.length + LINE2.length;

  // Gdzie "jedzie pociąg" — pierwsza nieukończona stacja
  const trainStation = ALL_STATIONS.find(s => s.key !== "_egzamin" && (getScore(s.key) === null || getScore(s.key) < 75)) || LINE1[LINE1.length - 1];

  const selectedStation = selected ? ALL_STATIONS.find(s => s.key === selected) : null;
  const selectedScore = selected ? getScore(selected) : null;
  const selectedCat = selected && catStats[selected];

  return (
    <div className="metro-map-wrap">
      {/* Nagłówek */}
      <div className="metro-map-header">
        <div>
          <div className="metro-map-title">Twoja linia metra</div>
          <div className="metro-map-subtitle">
            {masteredCount} z {totalCats} kategorii opanowanych
          </div>
        </div>
        {overallScore !== null && (
          <div className="metro-map-overall" style={{ color: scoreColor(overallScore) }}>
            {overallScore}%
            <span>ogólnie</span>
          </div>
        )}
      </div>

      {/* Pasek postępu */}
      <div className="metro-progress-bar-wrap">
        <div className="metro-progress-bar-bg">
          <div
            className="metro-progress-bar-fill"
            style={{ width: `${overallScore ?? 0}%`, background: overallScore >= 75 ? "#22c55e" : overallScore >= 50 ? "#f59e0b" : "#ef4444" }}
          />
          <div className="metro-progress-pass-line" />
        </div>
        <span className="metro-progress-label">75% min.</span>
      </div>

      {/* SVG Mapa */}
      <div className="metro-svg-container">
        <svg viewBox="0 0 800 400" className="metro-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* === LINIA M1 (niebieska, pozioma) === */}
          <line x1="55" y1="150" x2="760" y2="150" stroke="url(#lineGrad1)" strokeWidth="6" strokeLinecap="round" />

          {/* === LINIA M2 (czerwona, pionowa od węzła w dół) === */}
          <line x1="490" y1="168" x2="490" y2="372" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.85" />

          {/* Etykiety linii */}
          <rect x="30" y="138" width="26" height="16" rx="4" fill="#3b82f6" />
          <text x="43" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">M1</text>

          <rect x="478" y="375" width="26" height="16" rx="4" fill="#ef4444" />
          <text x="491" y="387" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">M2</text>

          {/* === STACJE M1 === */}
          {LINE1.map(s => (
            <Station key={s.key} station={s} score={getScore(s.key)} hovered={hovered} onHover={setHovered} onClick={st => setSelected(sel => sel === st.key ? null : st.key)} />
          ))}

          {/* === WĘZEŁ EGZAMIN === */}
          <Station station={JUNCTION} score={getScore("_egzamin")} hovered={hovered} onHover={setHovered} onClick={st => setSelected(sel => sel === st.key ? null : st.key)} />

          {/* === STACJE M2 === */}
          {LINE2.map(s => (
            <Station key={s.key} station={s} score={getScore(s.key)} hovered={hovered} onHover={setHovered} onClick={st => setSelected(sel => sel === st.key ? null : st.key)} />
          ))}

          {/* === POCIĄG (następna do nauki) === */}
          {trainStation && (
            <g transform={`translate(${trainStation.cx - 24}, ${trainStation.cy - 46})`} style={{ pointerEvents: "none" }}>
              <rect x="0" y="0" width="48" height="16" rx="5" fill="#3b82f6" opacity="0.92" />
              <rect x="3" y="2" width="10" height="10" rx="2" fill="rgba(255,255,255,0.22)" />
              <rect x="15" y="2" width="10" height="10" rx="2" fill="rgba(255,255,255,0.22)" />
              <rect x="27" y="2" width="10" height="10" rx="2" fill="rgba(255,255,255,0.22)" />
              <rect x="39" y="2" width="6" height="10" rx="2" fill="rgba(255,255,255,0.22)" />
              <text x="24" y="-3" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">tu jesteś</text>
            </g>
          )}
        </svg>
      </div>

      {/* Panel szczegółów po kliknięciu stacji */}
      {selectedStation && (
        <div className="metro-detail-panel">
          <div className="metro-detail-name" style={{ color: scoreColor(selectedScore) }}>
            {selectedStation.key === "_egzamin" ? "Egzamin (łączny)" : selectedStation.label}
          </div>
          <div className="metro-detail-stats">
            {selectedCat || selectedStation.key === "_egzamin" ? (
              <>
                <div className="metro-detail-score" style={{ color: scoreColor(selectedScore) }}>
                  {selectedScore !== null ? `${selectedScore}%` : "brak danych"}
                </div>
                {selectedStation.key !== "_egzamin" && selectedCat && (
                  <div className="metro-detail-sub">
                    {selectedCat.correct} poprawnych · {selectedCat.wrong} błędnych · {selectedCat.total} pytań w kategorii
                  </div>
                )}
                {selectedStation.key === "_egzamin" && (
                  <div className="metro-detail-sub">
                    {selectedScore !== null
                      ? selectedScore >= 75
                        ? "Zaliczony — gotowy na komisję"
                        : "Jeszcze nie gotowy — ćwicz dalej"
                      : "Brak danych — odpowiedz na kilka pytań"}
                  </div>
                )}
              </>
            ) : (
              <div className="metro-detail-sub">Brak danych — zacznij ćwiczyć tę kategorię</div>
            )}
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="metro-legend">
        <div className="metro-legend-item"><span className="metro-legend-dot" style={{ background: "#22c55e" }} />Opanowane ≥75%</div>
        <div className="metro-legend-item"><span className="metro-legend-dot" style={{ background: "#f59e0b" }} />W trakcie 50–74%</div>
        <div className="metro-legend-item"><span className="metro-legend-dot" style={{ background: "#ef4444" }} />Wymaga pracy &lt;50%</div>
        <div className="metro-legend-item"><span className="metro-legend-dot" style={{ background: "#374151" }} />Brak danych</div>
      </div>
    </div>
  );
};

export default MetroMap;
