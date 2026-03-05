const Quiz = (props) => {
  const { currentTest, currentQuestion, isDisabled, answerChange } = props;
  return (
    <>
      <div className="question-card" key={currentQuestion}>
        <h2>{currentTest[currentQuestion]?.question}</h2>
        {currentTest[currentQuestion]?.image && (
          <div className="my-4">
            <img
              src={`${process.env.PUBLIC_URL}/${currentTest[currentQuestion]?.image.replace(/^\.\//, "")}`}
              alt=""
              className="mx-auto rounded-lg"
              style={{ maxHeight: "200px" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.insertAdjacentHTML(
                  "afterend",
                  '<p style="color:#6b7280;font-style:italic;font-size:14px">[Brak grafiki]</p>'
                );
              }}
            />
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
            <button
              key={index}
              className={btnClass}
              onClick={() => answerChange(index)}
              disabled={isDisabled}
            >
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
