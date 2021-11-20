const WrongAnswers = (props) => {
    const { wrongAnswers } = props;
    console.log(wrongAnswers);

    const items = wrongAnswers.map((el, index) => {
        return <li key={`wrongAnswer${index}`} className={"m-3 text-left"}>
            <h3 className={"text-xl"}>{el.question}</h3>
            {el.image ? <img src={el.image} alt="" className={"mx-auto"} /> : ""}
            <p className={"text-green-300 text-xl m-2"}>{el.content[el.correct]}</p></li>
    })
    return (
        <div className={"text-white m-auto bg-blue-800 text-center p-5 rounded-3xl"}>
            {wrongAnswers.length ? <h2 className={"text-2xl text-red-600 p-4"}>Błędne odpowiedzi</h2> : <h2 className={"text-2xl text-green-300 p-4"} > Wszystkie odpowiedzi były prawidłowe. GRATULACJE!!!</h2>}
            <ol>
                {items}
            </ol>
        </div>
    );
}

export default WrongAnswers;