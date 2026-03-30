const ProgressStats = ({ correctAnswers, inCorrectAnswers, maxQuestions, learningMode, totalAnswered }) => {
  const answeredCount = learningMode ? totalAnswered : correctAnswers + inCorrectAnswers;
  const percentage = maxQuestions ? Math.round((correctAnswers / maxQuestions) * 100) : 0;
  const passedThreshold = percentage >= 75;

  return (
    <>
      <div className="progress-container w-full max-w-md mx-auto px-4 mt-6">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${(answeredCount / maxQuestions) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm progress-label">
          <span>
            Pytanie {Math.min(answeredCount + 1, maxQuestions)} z {maxQuestions}
          </span>
          {!learningMode && <span>{percentage}%</span>}
        </div>
      </div>

      {!learningMode && <div className="stats-row text-white glass-card">
        <div className="stat-item stat-correct" title="Poprawne">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          {correctAnswers}
        </div>
        <div className="w-px h-8 bg-gray-500 opacity-50" />
        <div className="donut-chart" style={{ width: "60px", height: "60px", margin: "0" }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="6"
              fill="none"
              className="donut-bg-circle"
            />
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke={
                passedThreshold ? "#22c55e" : correctAnswers > 0 ? "#ea580c" : "transparent"
              }
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 150} 150`}
              className="donut-fill-circle"
            />
          </svg>
          <div className="donut-label" style={{ fontSize: "14px" }}>
            {percentage}%
          </div>
        </div>
        <div className="w-px h-8 bg-gray-500 opacity-50" />
        <div className="stat-item stat-incorrect" title="Błędne">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {inCorrectAnswers}
        </div>
      </div>}
    </>
  );
};

export default ProgressStats;
