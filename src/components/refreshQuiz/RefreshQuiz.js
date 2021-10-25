const Refresh = (props) => {
    return (
        <button className="rounded-full m-5 bg-gray-700 p-2" onClick={props.refreshPage}>
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="23 4 23 10 17 10" />  <polyline points="1 20 1 14 7 14" />  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
        </button>
    );
}

export default Refresh;