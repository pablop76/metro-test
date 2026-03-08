const DangerAlert = (props) => {
  const { answers, correctAnswer, nextQuestion } = props;

  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <div className="alert-icon animateBounce">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#dc2626">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p style={{ color: '#f87171', fontSize: '16px', fontWeight: 600, margin: '4px 0' }}>
          Błędna odpowiedź
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '8px 0 4px' }}>
          Prawidłowa odpowiedź nr {correctAnswer + 1}:
        </p>
        <p style={{ color: '#4ade80', fontSize: '16px', fontWeight: 700, margin: '4px 0 8px', lineHeight: 1.4 }}>
          {answers[correctAnswer]}
        </p>
        <button onClick={nextQuestion} className="alert-btn alert-btn-danger">
          Następne pytanie →
        </button>
      </div>
    </div>
  );
};

export default DangerAlert;