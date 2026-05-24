import { useEffect, useState } from "react";

const Quiz = (props) => {
  const { currentTest, currentQuestion, isDisabled, answerChange, onAnswerOrderChange, learningMode, correctAnswerIndex, starredIds, onToggleStar } = props;
  const [imageLoadError, setImageLoadError] = useState(false);
  // answerOrder[wyświetlanyIndex] = oryginalnyIndex — tasowanie odpowiedzi
  const [answerOrder, setAnswerOrder] = useState([0, 1, 2]);

  useEffect(() => {
    setImageLoadError(false);
    const count = currentTest[currentQuestion]?.content?.length || 3;
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setAnswerOrder(order);
    onAnswerOrderChange?.(order);
  }, [currentQuestion, currentTest]); // eslint-disable-line react-hooks/exhaustive-deps

  const question = currentTest[currentQuestion];
  const isStarred = starredIds && question ? starredIds.has(question.question) : false;
  const currentImage = question?.image;
  const imgPath = currentImage ? currentImage.replace(/^\.\//, "") : "";
  const imgSrc = imgPath ? `${process.env.PUBLIC_URL}/${imgPath}` : "";

  return (
    <>
      <div className="question-card" key={currentQuestion}>
        <button
          className={`star-btn ${isStarred ? "star-btn--active" : ""}`}
          onClick={() => question && onToggleStar?.(question.question)}
          title={isStarred ? "Usuń z oznaczonych" : "Oznacz jako trudne"}
          aria-label="Oznacz pytanie"
        >
          {isStarred ? "★" : "☆"}
        </button>
        <h2>{question?.question}</h2>
        {currentImage && (
          <div className="my-4">
            {!imageLoadError && (
              <img src={imgSrc} alt="" className="mx-auto rounded-lg" style={{ maxHeight: "200px" }} onError={() => setImageLoadError(true)} />
            )}
            {imageLoadError && (
              <p style={{ color: "#6b7280", fontStyle: "italic", fontSize: "14px" }}>[Brak grafiki]</p>
            )}
          </div>
        )}
      </div>
      {props.children}
      <div key={currentQuestion} className="answers-container container max-w-lg p-3 mx-auto">
        {answerOrder.map((originalIndex, displayIndex) => {
          const answer = currentTest[currentQuestion]?.content[originalIndex];
          let btnClass = "answer-btn";
          if (learningMode && originalIndex === correctAnswerIndex) {
            btnClass += " learning-correct";
          }
          if (isDisabled && props.selectedAnswerIndex === originalIndex) {
            btnClass += props.isAnswerCorrect ? " current" : " wrong";
          }
          return (
            <button key={originalIndex} className={btnClass} onClick={() => answerChange(originalIndex)} disabled={isDisabled}>
              <div className="answer-number">{displayIndex + 1}</div>
              <div className="answer-text">{answer}</div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Quiz;
