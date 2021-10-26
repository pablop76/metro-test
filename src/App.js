import Header from "./components/header/Header";
import LimitOfquestions from "./components/limitOfquestions/LimitOfquestions";
import DangerAlert from "./components/alerts/DangerAlert";
import SoundOnOff from "./components/soundOnOff/SoundOnOff.js";
import Refresh from "./components/refreshQuiz/RefreshQuiz.js";
import Quiz from "./components/quiz/Quiz.js";
import { useEffect, useState } from 'react';
import './App.css';
import oklaski from './sound/oklaski.mp3';
import smiech from './sound/smiech.mp3';

function App() {

  const [currentTest, setCurrentTest] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState("10");
  const [audio, setAudioOn] = useState(false);
  const [correctAnswers, setCorectAnswers] = useState(0);
  const [inCorrectAnswers, setInCorrectAnswers] = useState(0);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const sound = new Audio(oklaski);
  const sound2 = new Audio(smiech);
  const getQuizData = async () => {
    const response = await fetch('./questions.json');
    const data = await response.json();
    setCurrentTest(data.test[0].questions)
  }
  const answerChange = (answerUser, el) => {
    if (currentQuestion >= maxQuestions) return;
    setIsDisabled(true);
    let answerDiv = el.currentTarget.firstChild;

    if (answerUser === currentTest[currentQuestion].correct) {
      if (audio) sound.play();
      setCorectAnswers(correctAnswers + 1);
      answerDiv.classList.add("current");

    } else {
      if (audio) sound2.play();
      answerDiv.classList.add("wrong");
      setDangerAlert(true);
      if (inCorrectAnswers + correctAnswers < maxQuestions) {
        setInCorrectAnswers(inCorrectAnswers + 1);
      }
    }

    setTimeout(() => {
      if (currentQuestion >= maxQuestions - 1) return;
      setCurrentQuestion(currentQuestion + 1);
      answerDiv.classList.remove("current", "wrong");
      setDangerAlert(false);
      setIsDisabled(false);
    }, 5000);
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
    if (Math.round(correctAnswers / maxQuestions * 100) >= 60) {
      return "current";
    }
    return "wrong";
  })();

  useEffect(() => getQuizData(), [])
  return (
    <div className="bg-container container mx-auto min-h-screen pb-5">
      <div className="flex items-baseline justify-center bg-gray-900 text-white flex-wrap bg-overlay-top">
        <LimitOfquestions handleChangeLimit={handleChangeLimit} maxQuestions={maxQuestions} />
        <Header />
        <SoundOnOff handleClickAudio={handleClickAudio} audio={audio} />
        <Refresh refreshPage={refreshPage} />
      </div>
      <Quiz currentTest={currentTest} currentQuestion={currentQuestion} answerChange={answerChange} isDisabled={isDisabled}>
        {dangerAlert ? <DangerAlert description={currentTest[currentQuestion].correct + 1} /> : ""}
      </Quiz>
      <div className="flex justify-center p-5 text-2xl bg-blue-800 text-white rounded-full max-w-xs mx-auto m-5">
        odpowiedzi {correctAnswers + inCorrectAnswers} / {maxQuestions}
      </div>
      <div className="flex items-baseline justify-center text-3xl bg-white rounded-full max-w-xs mx-auto m-5">
        <span style={{ color: 'green' }}>{correctAnswers}:</span><span style={{ color: 'red' }}>{inCorrectAnswers}</span>
      </div>
      <div className={`flex items-baseline justify-center text-4xl ${colorSend} text-white rounded-full max-w-xs mx-auto m-5`}>{maxQuestions ? Math.round(correctAnswers / maxQuestions * 100) : ""}%</div>
    </div>
  );
}

export default App;