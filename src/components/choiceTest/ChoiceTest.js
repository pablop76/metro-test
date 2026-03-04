const ChoiceTest = (props) => {
  const { handleTest, test, categories, categoryLimits } = props;
  return (
    <form className="mt-4">
      <span className="text-yellow-400 text-xl">Wybór zakresu pytań:</span>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {Object.entries(categories)
          .sort(([aKey], [bKey]) => {
            if (aKey === "81") return 1;
            if (bKey === "81") return -1;
            return 0;
          })
          .map(([key, label]) => {
            const is81 = key === "81";
            const labelClass = is81 ? "inline-flex items-center ml-3 text-gray-300" : "inline-flex items-center ml-3";
            const inputClass = is81 ? "form-checkbox text-gray-300" : "form-checkbox";
            return (
              <label key={key} className={labelClass}>
                <input
                  type="checkbox"
                  className={inputClass}
                  name="choiceTest"
                  value={key}
                  checked={Array.isArray(test) ? test.includes(key) : test === key}
                  onChange={handleTest}
                />
                <span className="ml-2">
                  {label} ({categoryLimits[key] || 0})
                </span>
              </label>
            );
          })}
      </div>
    </form>
  );
};

export default ChoiceTest;
