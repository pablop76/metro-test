const LimitOfquestions = ({ maxQuestions, handleChangeLimit, poolSize = 0, disabled = false, children }) => (
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
        max={poolSize}
        disabled={disabled}
        title={disabled ? "Liczba pytań jest ustalona przez tryb egzaminu" : undefined}
      />
      {children}
    </div>
);

export default LimitOfquestions;
