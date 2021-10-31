const DangerAlert = (props) => {
    const { answers, corectAnswer, nextQuestion } = props;

    return (
        <div
            className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-70">
            <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                </div>
                <div className="mt-2 px-7 py-3">
                    <p className=" text-white text-xl">
                        Prawidłową odpowiedźią jest nr. {corectAnswer + 1}
                    </p>
                    <p className=" text-green-400 text-xl font-bold">
                        {answers[corectAnswer]}
                    </p>
                </div>
                <div className="items-center px-4 py-3">
                    <button onClick={nextQuestion}
                        id="ok-btn"
                        className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                        Następne
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DangerAlert;