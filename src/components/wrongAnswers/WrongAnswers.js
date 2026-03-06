const WrongAnswers = (props) => {
  const { wrongAnswers } = props;

  const items = wrongAnswers.map((el, index) => {
    return (
      <li key={`wrongAnswer${index}`}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{el.question}</h3>
        {el.image && (
          <img
            src={`${process.env.PUBLIC_URL}/${el.image.replace(/^\.\//, "")}`}
            alt=""
            className="mx-auto"
            style={{ maxHeight: '150px', borderRadius: '8px', margin: '8px 0' }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.insertAdjacentHTML("afterend", '<p style="color:#6b7280;font-style:italic;font-size:14px">[Brak grafiki]</p>');
            }}
          />
        )}
        <p style={{ color: '#4ade80', fontWeight: 700, marginTop: '4px' }}>
          ✓ {el.content[el.correct]}
        </p>
      </li>
    );
  });

  return (
    <div className="wrong-answers-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        {wrongAnswers.length ? (
          <h2 style={{ fontSize: '22px', color: '#f87171', fontWeight: 700, margin: 0 }}>
            ✗ Błędne odpowiedzi
          </h2>
        ) : (
          <h2 style={{ fontSize: '22px', color: '#4ade80', fontWeight: 700, margin: 0 }}>
            ✓ Wszystkie odpowiedzi prawidłowe
          </h2>
        )}
        
        {wrongAnswers.length > 0 && (
          <button
            onClick={props.startMistakesReview}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          >
            Powtórz tylko te błędy
          </button>
        )}
      </div>
      <ol style={{ listStyle: 'none', padding: 0 }}>{items}</ol>
    </div>
  );
};

export default WrongAnswers;