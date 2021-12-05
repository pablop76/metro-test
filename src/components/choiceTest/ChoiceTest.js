const ChoiceTest = (props) => {
    const { handleTest, test, questionslimit } = props;
    return (
        <form className="mt-4">
            <span className="text-yellow-400 text-xl">Wybór zakresu pytań:</span>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input type="radio" className="form-radio" name="choiceTest" value="all" checked={test === "all"} onChange={handleTest} />
                    <span className="ml-2">Wszystko ({questionslimit[0]})</span>
                </label>
                <label className="inline-flex items-center ml-3">
                    <input type="radio" className="form-radio" name="choiceTest" value="inspiro" checked={test === "inspiro"} onChange={handleTest} />
                    <span className="ml-2">Inspiro ({questionslimit[1]})</span>
                </label>
                <label className="inline-flex items-center ml-3">
                    <input type="radio" className="form-radio" name="choiceTest" value="sygnalizacja" checked={test === "sygnalizacja"} onChange={handleTest} />
                    <span className="ml-2">Sygnalizacja ({questionslimit[2]})</span>
                </label>
                <label className="inline-flex items-center ml-3">
                    <input type="radio" className="form-radio" name="choiceTest" value="linia2" checked={test === "linia2"} onChange={handleTest} />
                    <span className="ml-2">Linia nr 2 ({questionslimit[3]})</span>
                </label>
            </div>
        </form>
    );
}

export default ChoiceTest;