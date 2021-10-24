const limitOfquestions = (props) => {
    return (
        <div className="m-5">
            <label htmlFor="counter" className="text-xl">Z ilu pytań chcesz się sprawdzić?</label>
            <input style={{ borderRadius: '55px', textAlign: 'center', fontSize: '22px', color: 'black' }} className="block" type="number" id="counter" value={props.maxQuestions} onChange={props.handleChangeLimit} min="0" max="40" />
        </div>
    );
}

export default limitOfquestions;