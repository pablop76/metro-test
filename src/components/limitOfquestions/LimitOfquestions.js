const LimitOfquestions = (props) => {
  const { maxQuestions, handleChangeLimit } = props;
  return (
    <div className="m-5">
      <label htmlFor="counter" className="text-yellow-400 text-lg font-semibold">
        Ustaw ilość pytań z puli:
      </label>
      <input
        className="number-input"
        type="number"
        id="counter"
        value={maxQuestions}
        onChange={handleChangeLimit}
        min="0"
        max={props.currentTest.length}
      />
      {props.children}
    </div>
  );
};

export default LimitOfquestions;