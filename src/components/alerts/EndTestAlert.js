const EndTestAlert = (props) => {
    const { correctAnswers, inCorrectAnswers, maxQuestions, colorSend } = props;

    return (
        <div
            className="fixed left-1/2 top-1/2 p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80" style={{ transform: "translate(-50%,-50%)" }}>
            <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
                    {(Math.round(correctAnswers / maxQuestions * 100) >= 75) ?
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        : <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                    }
                </div>
                <h3 className="text-xl leading-6 font-medium text-white m-5">{(Math.round(correctAnswers / maxQuestions * 100) >= 75) ? "Zaliczone!!!" : "Oblałeś :("}</h3>
                <div className="mt-2 px-7 py-3">
                    <div className=" text-white text-xl">
                        <div className="flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5">
                            {correctAnswers + inCorrectAnswers} / {maxQuestions}
                        </div>
                        <div className="flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5">
                            <span style={{ color: 'green' }}>{correctAnswers}:</span><span style={{ color: 'red' }}>{inCorrectAnswers}</span>
                        </div>
                        <div className={`flex items-baseline justify-center text-4xl ${colorSend} text-white rounded-full max-w-xs mx-auto m-5`}>{Math.round(correctAnswers / maxQuestions * 100)}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EndTestAlert;