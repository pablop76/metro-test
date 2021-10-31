const AcceptAlert = (props) => {
    const { nextQuestion } = props;

    return (
        <div
            className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-70">
            <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                </div>
                <div className="items-center px-4 py-3 my-5">
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