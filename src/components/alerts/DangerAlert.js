const DangerAlert = (props) => {
    const { answers, corectAnswer } = props;

    return (
        <div
            class="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-blue-500 bg-opacity-80">
            <div class="mt-3 text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500">
                    <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h3 class="text-xl leading-6 font-medium text-gray-900 m-5">Błąd!</h3>
                <div class="mt-2 px-7 py-3">
                    <p class=" text-white text-xl">
                        Prawidłowa odpowiedź to {corectAnswer + 1}
                    </p>
                    <p class=" text-green-400 text-xl font-bold">
                        {answers[corectAnswer]}
                    </p>
                </div>
                {/* <div class="items-center px-4 py-3">
                    <button
                        id="ok-btn"
                        class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        OK
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default DangerAlert;