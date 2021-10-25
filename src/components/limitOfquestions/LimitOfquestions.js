const limitOfquestions = (props) => {
    return (
        <div className="m-5">
            <label htmlFor="counter" className="text-xl">Z ilu pytań chcesz się sprawdzić?</label>
            <input className="block text-center rounded-3xl text-2xl text-black mt-3" type="number" id="counter" value={props.maxQuestions} onChange={props.handleChangeLimit} min="0" max="40" />
        </div>
    );
}

export default limitOfquestions;