const limitOfquestions = (props) => {
    const { maxQuestions, handleChangeLimit } = props;
    return (
        <div className="m-5">
            <label htmlFor="counter" className="text-yellow-400 text-xl">Ustaw ilość pytań z puli:</label>
            <input className="block text-center rounded-3xl text-2xl text-black mt-3 m-auto" type="number" id="counter" value={maxQuestions} onChange={handleChangeLimit} min="0" max={props.currentTest.length} />
            {props.children}
        </div>
    );
}

export default limitOfquestions;