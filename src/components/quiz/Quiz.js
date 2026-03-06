import { useEffect, useState } from "react";

const Quiz = (props) => {
  const { currentTest, currentQuestion, isDisabled, answerChange } = props;
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    setImageLoadError(false);
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
            {!imageLoadError && <img src={imgSrc} alt="" className="mx-auto rounded-lg" style={{ maxHeight: "200px" }} onError={() => setImageLoadError(true)} />}
            {imageLoadError && (
              <>
                <p style={{ color: "#6b7280", fontStyle: "italic", fontSize: "14px" }}>[Brak grafiki]</p>
                <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>Źródło obrazka: {imgSrc}</div>
              </>
            )}
          </div>
        )}
      </div>
      {props.children}
      <div className="container max-w-lg p-3 mx-auto">
        {currentTest[currentQuestion]?.content.map((answer, index) => {
          let btnClass = "answer-btn";
          if (isDisabled && props.selectedAnswerIndex !== undefined && props.selectedAnswerIndex === index) {
            btnClass += props.isAnswerCorrect ? " current" : " wrong";
          }
          return (
            <button key={index} className={btnClass} onClick={() => answerChange(index)} disabled={isDisabled}>
              <div className="answer-number">{index + 1}</div>
              <div className="answer-text">{answer}</div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Quiz;
