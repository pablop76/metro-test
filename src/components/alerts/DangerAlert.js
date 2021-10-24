const DangerAlert = (props) => {
    return (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
            <div className="p-2 bg-indigo-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Źle !!!</span>
                <span className="font-semibold mr-2 text-left flex-auto">Prawidłowa odpowiedż to {props.description}</span>
            </div>
        </div>
    );
}

export default DangerAlert;