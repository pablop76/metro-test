import Header from "./components/header/Header";
import LimitOfquestions from "./components/limitOfquestions/LimitOfquestions";
import DangerAlert from "./components/alerts/DangerAlert";
import SuccesAlert from "./components/alerts/SuccesAlert";
import EndTestAlert from "./components/alerts/EndTestAlert";
import SoundOnOff from "./components/soundOnOff/SoundOnOff.js";
import Refresh from "./components/refreshQuiz/RefreshQuiz.js";
import Quiz from "./components/quiz/Quiz.js";
import ChoiceTest from "./components/choiceTest/ChoiceTest";
import Footer from "./components/footer/Footer";
import WrongAnswers from "./components/wrongAnswers/WrongAnswers";
import { useEffect, useState } from 'react';
import './App.css';
import oklaski from './sound/oklaski.mp3';
import smiech from './sound/smiech.mp3';

function App() {

  const [currentTest, setCurrentTest] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [endTest, setEndTest] = useState(false);
  const [audio, setAudioOn] = useState(false);
  const [correctAnswers, setCorectAnswers] = useState(0);
  const [inCorrectAnswers, setInCorrectAnswers] = useState(0);
  const [saveInCorrectAnswers, setSaveInCorrectAnswers] = useState([]);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [test, setTest] = useState("all");
  const [allLimit, setAllLimit] = useState(0);
  const [inspiroLimit, setInspiroLimit] = useState(0);
  const [sygnalizacjaLimit, setSygnalizacjaLimit] = useState(0);
  // zapisuje błedne odpowiedzi ale jeszcze nic z nimi nie robi
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  // ustawienie tematu testu
  const handleTest = (e) => {
    setTest(e.target.value);
  }

  // Losowanie pytań od 0 do długość tablicy
  const draw = (arr, counter) => {
    const arr2 = [...arr];
    const arr3 = [];
    if (arr2.length >= counter) {
      for (let i = 0; i < counter; i++) {
        let index = Math.floor(Math.random() * arr2.length);
        arr3.push(arr2[index]);
        arr2.splice(index, 1);
      }
    } else {
      alert("Nie ma tyle pytań w puli");
      return;
    }
    return arr3;
  }
  const sound = new Audio(oklaski);
  const sound2 = new Audio(smiech);

  const answerChange = (answerUser, el) => {

    if (currentQuestion >= maxQuestions + 1) return;
    setIsDisabled(true);
    let answerDiv = el.currentTarget;

    if (answerUser === currentTest[currentQuestion].correct) {
      if (audio) sound.play();
      setCorectAnswers(correctAnswers + 1);
      answerDiv.classList.add("current");
      setSuccesAlert(true);

    } else {
      if (audio) sound2.play();
      answerDiv.classList.add("wrong");
      setDangerAlert(true);
      if (inCorrectAnswers + correctAnswers < maxQuestions) {
        setInCorrectAnswers(inCorrectAnswers + 1);
        // zbieranie niepoprawnych odpowiedzi
        setSaveInCorrectAnswers([...saveInCorrectAnswers, currentTest[currentQuestion]]);
      }
      setWrongAnswers([...wrongAnswers, currentTest[currentQuestion]])
    }

  }

  const nextQuestion = () => {
    if (currentQuestion + 1 === maxQuestions) {
      setDangerAlert(false);
      setSuccesAlert(false);
      setEndTest(true);
      return;
    };
    setCurrentQuestion(currentQuestion + 1);
    document.querySelector(".wrong")?.classList.remove("wrong");
    document.querySelector(".current")?.classList.remove("current");
    setDangerAlert(false);
    setSuccesAlert(false);
    setIsDisabled(false);
  }

  const handleChangeLimit = event => {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    if (value === 0) {
      setMaxQuestions("");
      return;
    }
    setMaxQuestions(value)
  };

  const handleClickAudio = () => {
    setAudioOn(!audio);
  };
  const refreshPage = () => {
    window.location.reload(false);
  }

  let colorSend = (() => {
    if (Math.round(correctAnswers / maxQuestions * 100) >= 75) {
      return "bg-green-700";
    }
    return "bg-red-600";
  })();


  useEffect(() => {
    const startApp = (data, drawData, expr) => {
      drawData = draw(data[expr], data[expr].length);
      setCurrentTest(drawData);
      setMaxQuestions(data[expr].length);
      setCorectAnswers(0);
      setInCorrectAnswers(0);
    }
    const getQuizData = async (expr) => {

      const response = await fetch('./questions.json');
      const data = await response.json();
      setAllLimit(data.all.length);
      setInspiroLimit(data.inspiro.length);
      setSygnalizacjaLimit(data.sygnalizacja.length);
      let drawData = [];
      switch (expr) {
        case 'inspiro':
          startApp(data, drawData, expr);
          break;
        case 'sygnalizacja':
          startApp(data, drawData, expr);
          break;
        default:
          startApp(data, drawData, expr);
      }

    }
    getQuizData(test);
  }, [test]);

  return (
    <div className="bg-container container mx-auto min-h-screen pb-5 flex flex-col content-center justify-center">
      <div className="flex items-baseline justify-center text-white flex-wrap bg-overlay-top flex-grow">
        <div className="flex-1 text-center">
          <LimitOfquestions handleChangeLimit={handleChangeLimit} maxQuestions={maxQuestions} currentTest={currentTest} >
            <ChoiceTest handleTest={handleTest} test={test} questionslimit={[allLimit, inspiroLimit, sygnalizacjaLimit]} />
          </LimitOfquestions>
        </div>
        <div className="flex-initial">
          <Header />
        </div>
        <div className="flex flex-1 m-auto justify-center">
          <SoundOnOff handleClickAudio={handleClickAudio} audio={audio} />
          <Refresh refreshPage={refreshPage} />
        </div>
      </div>
      {showWrongAnswers ? <WrongAnswers wrongAnswers={wrongAnswers} /> :
        <Quiz currentTest={currentTest} currentQuestion={currentQuestion} answerChange={answerChange} isDisabled={isDisabled}>
          {dangerAlert ? <DangerAlert answers={currentTest[currentQuestion].content} corectAnswer={currentTest[currentQuestion].correct} nextQuestion={nextQuestion} /> : ""}
          {succesAlert ? <SuccesAlert nextQuestion={nextQuestion} /> : ""}
          {endTest ? <EndTestAlert correctAnswers={correctAnswers} inCorrectAnswers={inCorrectAnswers} maxQuestions={maxQuestions} colorSend={colorSend}>
            <Refresh refreshPage={refreshPage} />
            <button className={"bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"} onClick={() => {
              setShowWrongAnswers(true);
              setEndTest(false)
            }}>Pokaż moje błędy</button>
          </EndTestAlert> : ""};
        </Quiz>}
      <div className="flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5">
        odpowiedzi {correctAnswers + inCorrectAnswers} / {maxQuestions}
      </div>
      <div className="flex items-center justify-center text-3xl bg-white rounded-full w-32 m-5 mx-auto">
        <span style={{ color: 'green', display: 'flex', alignItems: 'center' }}><svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>{correctAnswers}:</span><span style={{ color: 'red', display: 'flex', alignItems: 'center' }}>{inCorrectAnswers}<svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg></span>
      </div>
      <div className={`flex items-baseline justify-center text-4xl ${colorSend} text-white rounded-full w-32 m-5 mx-auto`}>{maxQuestions ? Math.round(correctAnswers / maxQuestions * 100) : ""}%</div>
      <Footer />
    </div>
  );
}

export default App;
