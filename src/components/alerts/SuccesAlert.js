const AcceptAlert = (props) => {
    const { nextQuestion } = props;

    return (
        <div
            className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80">
            <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
                    <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />  <polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <h3 className="text-xl leading-6 font-medium text-white m-5">OK</h3>
                <div className="mt-2 px-7 py-3">
                    <p className=" text-white text-xl">
                        Prawidłowa odpowiedź.
                    </p>
                </div>
                <div className="items-center px-4 py-3">
                    <button onClick={nextQuestion}
                        id="ok-btn"
                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Następne
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AcceptAlert;