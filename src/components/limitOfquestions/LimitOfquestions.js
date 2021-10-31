const limitOfquestions = (props) => {
    const { maxQuestions, handleChangeLimit } = props;
    return (
        <div className="m-5">
            <label htmlFor="counter" className="text-xl">Ustaw ilość pytań</label>
            <input className="block text-center rounded-3xl text-2xl text-black mt-3 m-auto" type="number" id="counter" value={maxQuestions} onChange={handleChangeLimit} min="0" max={props.currentTest.length} />
        </div>
    );
}

export default limitOfquestions;