const ChoiceTest = (props) => {
  const { handleTest, test, categories, categoryLimits } = props;
  return (
    <div className="mt-5">
      <p className="text-yellow-400 text-lg font-semibold mb-3">Wybór zakresu pytań:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(categories)
          .sort(([aKey], [bKey]) => {
            if (aKey === "81") return 1;
            if (bKey === "81") return -1;
            return 0;
          })
          .map(([key, label]) => {
            const is81 = key === "81";
            const isActive = Array.isArray(test) ? test.includes(key) : test === key;
            let pillClass = "category-pill";
            if (isActive) {
              pillClass += is81 ? " active-bonus" : " active";
            }
            return (
              <label key={key} className={pillClass}>
                <input type="checkbox" name="choiceTest" value={key} checked={isActive} onChange={handleTest} />
                {label}
                <span className="pill-count">{categoryLimits[key] || 0}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default ChoiceTest;
