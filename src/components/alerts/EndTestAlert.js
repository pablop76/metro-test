import Confetti from 'react-confetti';

const EndTestAlert = (props) => {
  const { correctAnswers, inCorrectAnswers, maxQuestions, colorSend } = props;
  const percentage = Math.round((correctAnswers / maxQuestions) * 100);
  const passed = percentage >= 75;

  return (
    <div className="alert-overlay">
      <div className="end-test-card">
        {passed && <Confetti width={380} height={500} style={{ position: 'absolute', top: 0, left: 0 }} />}
        <div className="alert-icon animateBounce">
          {passed ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#16a34a">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#dc2626">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', margin: '12px 0' }}>
          {passed ? "🎉 Zaliczone!" : "😔 Niestety, nie zdałeś"}
        </h3>

        {/* Duży donut */}
        <div className="donut-container" style={{ margin: '16px auto' }}>
          <div className="donut-chart">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
              <circle
                cx="55" cy="55" r="45"
                stroke={passed ? "#22c55e" : "#ef4444"}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 283} 283`}
              />
            </svg>
            <div className="donut-label">{percentage}%</div>
          </div>
        </div>

        {/* Statystyki */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '12px 0' }}>
          <span style={{ color: '#4ade80', fontSize: '20px', fontWeight: 700 }}>
            ✓ {correctAnswers}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span style={{ color: '#f87171', fontSize: '20px', fontWeight: 700 }}>
            ✗ {inCorrectAnswers}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', fontWeight: 600 }}>
            {correctAnswers + inCorrectAnswers}/{maxQuestions}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default EndTestAlert;