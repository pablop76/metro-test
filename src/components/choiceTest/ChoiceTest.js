const ChoiceTest = (props) => {
  const { handleTest, test, categories, categoryLimits } = props;
  return (
    <form className="mt-4">
      <span className="text-yellow-400 text-xl">Wybór zakresu pytań:</span>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {Object.entries(categories).map(([key, label]) => (
          <label key={key} className="inline-flex items-center ml-3">
            <input
              type="radio"
              className="form-radio"
              name="choiceTest"
              value={key}
              checked={test === key}
              onChange={handleTest}
            />
            <span className="ml-2">
              {label} ({categoryLimits[key] || 0})
            </span>
          </label>
        ))}
      </div>
    </form>
  );
};

export default ChoiceTest;
