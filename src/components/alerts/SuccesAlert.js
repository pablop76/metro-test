import Confetti from 'react-confetti';

const AcceptAlert = (props) => {
  const { nextQuestion } = props;

  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <Confetti width={300} height={250} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div className="alert-icon animateBounce">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="#16a34a">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{ color: '#4ade80', fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>
          Prawidłowa odpowiedź!
        </p>
        <button onClick={nextQuestion} className="alert-btn alert-btn-success">
          Następne pytanie →
        </button>
      </div>
    </div>
  );
};

export default AcceptAlert;