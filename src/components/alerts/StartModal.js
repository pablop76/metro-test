const StartModal = (props) => {

    const { handleModal, open } = props;

    const customStyles = {
        modal: {
            display: open,
            border: "1px solid #FFF"
        },
        button: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-end"
        },
        header: {
            fontSize: "22px",
            color: "#FFF",
            padding: "20px"
        },
        content: {
            marginTop: "20px",
            padding: "20px"
        }
    };
    return (
        <div className="startModal" style={customStyles.modal}>
            <div style={customStyles.button}>
                <button onClick={handleModal}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#FFFFFF"><path d="M16.7 32.1 24 24.8 31.3 32.1 32.1 31.3 24.8 24 32.1 16.7 31.3 15.9 24 23.2 16.7 15.9 15.9 16.7 23.2 24 15.9 31.3ZM24 41.4Q20.35 41.4 17.175 40.05Q14 38.7 11.65 36.35Q9.3 34 7.95 30.825Q6.6 27.65 6.6 24Q6.6 20.35 7.95 17.175Q9.3 14 11.65 11.65Q14 9.3 17.175 7.95Q20.35 6.6 24 6.6Q27.65 6.6 30.825 7.95Q34 9.3 36.35 11.65Q38.7 14 40.05 17.175Q41.4 20.35 41.4 24Q41.4 27.65 40.05 30.825Q38.7 34 36.35 36.35Q34 38.7 30.825 40.05Q27.65 41.4 24 41.4ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 40.3Q30.75 40.3 35.525 35.525Q40.3 30.75 40.3 24Q40.3 17.25 35.525 12.475Q30.75 7.7 24 7.7Q17.25 7.7 12.475 12.475Q7.7 17.25 7.7 24Q7.7 30.75 12.475 35.525Q17.25 40.3 24 40.3Z" /></svg></button>
            </div>
            <header>
                <h1 style={customStyles.header}>TEST WIEDZY NA STANOWISKU MASZYNISTY METRA</h1>
            </header>
            <div style={customStyles.content}>
                Jeżeli pamiętasz jakieś pytania egzaminacyjne, które się nie pojawiły, lub znalazłeś błąd w teście to
                <a href="mailto:pawelpoltoraczyk@gmail.com"> DAJ ZNAĆ <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M4 20Q3.175 20 2.588 19.413Q2 18.825 2 18V6Q2 5.175 2.588 4.588Q3.175 4 4 4H20Q20.825 4 21.413 4.588Q22 5.175 22 6V18Q22 18.825 21.413 19.413Q20.825 20 20 20ZM12 13 4 8V18Q4 18 4 18Q4 18 4 18H20Q20 18 20 18Q20 18 20 18V8ZM12 11 20 6H4ZM4 8V6V8V18Q4 18 4 18Q4 18 4 18Q4 18 4 18Q4 18 4 18Z" /></svg></a>
            </div>
        </div>
    );
}

export default StartModal;