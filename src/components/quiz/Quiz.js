const Quiz = (props) => {

    const { currentTest, currentQuestion, isDisabled, answerChange } = props;
    return (
        <>
            <div className="p-5 text-2xl text-center bg-yellow-500 text-gray-800 rounded-3xl max-w-xl mx-auto m-5 font-bold">
                {currentTest[currentQuestion]?.question}
                <div className="my-5">{currentTest[currentQuestion]?.image ? <img src={`${process.env.PUBLIC_URL}/${currentTest[currentQuestion]?.image.replace(/^\.\//,'')}`} alt="" className="mx-auto" onError={(e) => { e.target.style.display='none'; e.target.insertAdjacentHTML('afterend','<p class="text-gray-500 italic text-base">[Brak grafiki]</p>'); }} /> : ""}</div>
            </div>
            {props.children}
            <div className="container max-w-md p-3 mx-auto">
                {currentTest[currentQuestion]?.content.map((answer, index) =>
                    <button
                        key={index}
                        className="flex cursor-pointer m-5 answer items-center justify-left rounded-3xl bg-blue-800 mx-auto w-full"
                        onClick={(el) => answerChange(index, el)}
                        disabled={isDisabled}
                    >
                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white p-4">
                            {index + 1}
                        </div>
                        <div className="py-2 px-4 text-white text-left">
                            {answer}
                        </div>
                    </button>
                )}
            </div>
        </>
    );
}

export default Quiz;