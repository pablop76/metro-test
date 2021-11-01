const ChoiceTest = (props) => {
    const { handleTest, test } = props;
    return (
        <form className="mt-4">
            <span className="text-yellow-400 text-xl">Wybór testu</span>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input type="radio" className="form-radio" name="choiceTest" value="all" checked={test === "all"} onChange={handleTest} />
                    <span className="ml-2">Wszystko</span>
                </label>
                <label className="inline-flex items-center ml-3">
                    <input type="radio" className="form-radio" name="choiceTest" value="inspiro" checked={test === "inspiro"} onChange={handleTest} />
                    <span className="ml-2">Inspiro</span>
                </label>
                <label className="inline-flex items-center ml-3">
                    <input type="radio" className="form-radio" name="choiceTest" value="sygnalizacja" checked={test === "sygnalizacja"} onChange={handleTest} />
                    <span className="ml-2">Sygnalizacja</span>
                </label>
            </div>
        </form>
    );
}

export default ChoiceTest;