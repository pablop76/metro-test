const Quiz = (props) => {

    const { currentTest, currentQuestion, isDisabled } = props;
    return (
        <>
            <div className="p-6 text-2xl text-center bg-yellow-500 text-gray-800 rounded-full max-w-xl mx-auto m-5 font-bold">
                {currentTest[currentQuestion]?.question}
                {currentTest[currentQuestion]?.image ? <img src={`./${currentTest[currentQuestion]?.image}`} alt="" className="mx-auto" /> : ""}
            </div>
            {props.children}
            <div className="container max-w-md p-3 mx-auto">
                {currentTest[currentQuestion]?.content.map((answer, index) =>
                    <button
                        key={index}
                        className="flex cursor-pointer m-5"
                        onClick={(el) => props.answerChange(index, el)}
                        disabled={isDisabled}
                    >
                        <div className={`flex items-center justify-center rounded-full bg-blue-500 p-5`}>
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-700 text-white font-bold p-4">
                                {index + 1}
                            </div>
                            <div className="py-2 px-4 text-white font-semibold text-left">
                                {answer}
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </>
    );
}

export default Quiz;