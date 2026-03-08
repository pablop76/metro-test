const ResultsButtons = ({ onRetry, onShowMistakes, onReviewMistakes, wrongAnswersCount }) => (
  <div className="results-buttons">
    <button type="button" className="results-btn retry" onClick={onRetry}>
      Spróbuj ponownie
    </button>
    {wrongAnswersCount > 0 && (
      <>
        <button type="button" className="results-btn mistakes" onClick={onShowMistakes}>
          Pokaż błędy
        </button>
        <button type="button" className="results-btn review-mistakes" onClick={onReviewMistakes}>
          Powtórz tylko błędy
        </button>
      </>
    )}
  </div>
);

export default ResultsButtons;
