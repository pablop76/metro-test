const DangerAlert = (props) => {
    const { answers, corectAnswer, nextQuestion } = props;

    return (
        <div
            className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80">
            <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h3 className="text-xl leading-6 font-medium text-gray-900 m-5">Błąd!</h3>
                <div className="mt-2 px-7 py-3">
                    <p className=" text-white text-xl">
                        Prawidłowa odpowiedź to {corectAnswer + 1}
                    </p>
                    <p className=" text-green-400 text-xl font-bold">
                        {answers[corectAnswer]}
                    </p>
                </div>
                {/* <div className="items-center px-4 py-3">
                    <button onClick={nextQuestion}
                        id="ok-btn"
                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Następne
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default DangerAlert;