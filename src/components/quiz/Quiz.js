import { useEffect, useState } from "react";

const Quiz = (props) => {
  const { currentTest, currentQuestion, isDisabled, answerChange } = props;
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
  }, [currentQuestion, currentTest]);

  const currentImage = currentTest[currentQuestion]?.image;
  const imgPath = currentImage ? currentImage.replace(/^\.\//, "") : "";
  const imgSrc = imgPath ? `${process.env.PUBLIC_URL}/${imgPath}` : "";

  return (
    <>
      <div className="question-card" key={currentQuestion}>
        <h2>{currentTest[currentQuestion]?.question}</h2>
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
      <div className="container max-w-lg p-3 mx-auto">
        {answerOrder.map((originalIndex, displayIndex) => {
          const answer = currentTest[currentQuestion]?.content[originalIndex];
          let btnClass = "answer-btn";
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
