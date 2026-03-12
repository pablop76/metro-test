import { useEffect, useRef, useState } from "react";
import "./App.css";
import DangerAlert from "./components/alerts/DangerAlert";
import EndTestAlert from "./components/alerts/EndTestAlert";
import SuccesAlert from "./components/alerts/SuccesAlert";
import ChoiceTest from "./components/choiceTest/ChoiceTest";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LimitOfquestions from "./components/limitOfquestions/LimitOfquestions";
import Quiz from "./components/quiz/Quiz.js";
import ProgressStats from "./components/quiz/ProgressStats";
import ResultsButtons from "./components/quiz/ResultsButtons";
import Refresh from "./components/refreshQuiz/RefreshQuiz.js";
import SoundOnOff from "./components/soundOnOff/SoundOnOff.js";
import StyleToggle from "./components/styleToggle/StyleToggle.js";
import ThemeToggle from "./components/themeToggle/ThemeToggle.js";
import WrongAnswers from "./components/wrongAnswers/WrongAnswers";
import { CATEGORIES, VISUAL_STYLES, STORAGE_KEYS } from "./constants";
import { draw } from "./utils/quizUtils";
import oklaski from "./sound/oklaski.mp3";
import smiech from "./sound/smiech.mp3";

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentTest, setCurrentTest] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [endTest, setEndTest] = useState(false);
  const [audio, setAudioOn] = useState(false);
  const [correctAnswers, setCorectAnswers] = useState(0);
  const [inCorrectAnswers, setInCorrectAnswers] = useState(0);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [test, setTest] = useState(["all"]);
  const [categoryLimits, setCategoryLimits] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [isManualLimit, setIsManualLimit] = useState(false);
  const [fullFilteredLength, setFullFilteredLength] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [hasSygnalizacjaError, setHasSygnalizacjaError] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || "dark");
  const [visualStyle, setVisualStyle] = useState(() => localStorage.getItem(STORAGE_KEYS.visualStyle) || "default");

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.theme, theme); }, [theme]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.visualStyle, visualStyle); }, [visualStyle]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const toggleVisualStyle = () => {
    setVisualStyle((prev) => {
      const currentIndex = VISUAL_STYLES.indexOf(prev);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % VISUAL_STYLES.length;
      return VISUAL_STYLES[nextIndex];
    });
  };

  const handleTest = (e) => {
    const value = e.target.value;
    setTest((prev) => {
      if (value === "all") return ["all"];
      const next = prev.includes("all") ? [] : [...prev];
      if (next.includes(value)) {
        const filtered = next.filter((v) => v !== value);
        return filtered.length === 0 ? ["all"] : filtered;
      }
      return [...next, value];
    });
  };

  const sound = useRef(typeof Audio !== "undefined" ? new Audio(oklaski) : null);
  const sound2 = useRef(typeof Audio !== "undefined" ? new Audio(smiech) : null);

  // Resetuje stan quizu do wartości początkowych (używane przy zmianie kategorii, powtórce błędów itp.)
  const resetQuizState = () => {
    setCorectAnswers(0);
    setInCorrectAnswers(0);
    setCurrentQuestion(0);
    setEndTest(false);
    setDangerAlert(false);
    setSuccesAlert(false);
    setIsDisabled(false);
    setHasSygnalizacjaError(false);
    setSelectedAnswerIndex(null);
    setIsAnswerCorrect(null);
    setWrongAnswers([]);
    setShowWrongAnswers(false);
  };

  const answerChange = (answerUser) => {
    if (currentQuestion >= maxQuestions + 1) return;
    setIsDisabled(true);
    setSelectedAnswerIndex(answerUser);

    if (answerUser === currentTest[currentQuestion].correct) {
      if (audio && sound.current) {
        sound.current.currentTime = 0;
        sound.current.play();
      }
      setCorectAnswers(correctAnswers + 1);
      setIsAnswerCorrect(true);
      setSuccesAlert(true);
    } else {
      if (audio && sound2.current) {
        sound2.current.currentTime = 0;
        sound2.current.play();
      }
      const currentCategories = Array.isArray(currentTest[currentQuestion]?.category)
        ? currentTest[currentQuestion].category
        : [currentTest[currentQuestion]?.category];
      if (currentCategories.includes("sygnalizacja")) {
        setHasSygnalizacjaError(true);
      }
      setIsAnswerCorrect(false);
      setDangerAlert(true);
      if (inCorrectAnswers + correctAnswers < maxQuestions) {
        setInCorrectAnswers(inCorrectAnswers + 1);
      }
      setWrongAnswers([...wrongAnswers, currentTest[currentQuestion]]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 === maxQuestions) {
      setDangerAlert(false);
      setSuccesAlert(false);
      setEndTest(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswerIndex(null);
    setIsAnswerCorrect(null);
    setDangerAlert(false);
    setSuccesAlert(false);
    setIsDisabled(false);
  };

  const handleChangeLimit = (event) => {
    setIsManualLimit(true);
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    if (value === 0) {
      setMaxQuestions("");
      return;
    }
    setMaxQuestions(value);
  };

  const handleClickAudio = () => setAudioOn(!audio);
  const refreshPage = () => window.location.reload(false);

  const startMistakesReview = () => {
    if (wrongAnswers.length === 0) return;
    const pool = [...wrongAnswers];
    const poolSize = pool.length;
    const drawData = draw(pool, poolSize);
    if (drawData) {
      setFullFilteredLength(poolSize);
      setCurrentTest(drawData);
      setMaxQuestions(poolSize);
      resetQuizState();
    }
  };

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/questions.json");
        if (!response.ok) return;
        const data = await response.json();
        const questions = data.questions || [];
        if (questions.length === 0) return;

        // Normalizuj kategorie: wszystkie klucze jako stringi
        const normalized = questions.map((q) => {
          const cats = Array.isArray(q.category) ? q.category : [q.category];
          return { ...q, category: cats.map((c) => String(c)) };
        });
        setAllQuestions(normalized);

        // Oblicz limity dla każdej kategorii
        // Pytania oznaczone kategorią '81' liczymy tylko w tej kategorii
        const limits = { all: 0 };
        normalized.forEach((q) => {
          const cats = q.category;
          if (cats.includes("81")) {
            limits["81"] = (limits["81"] || 0) + 1;
            return;
          }
          limits.all++;
          cats.forEach((cat) => { limits[cat] = (limits[cat] || 0) + 1; });
        });
        setCategoryLimits(limits);
      } catch (err) {
        console.error("Błąd ładowania pytań:", err);
      }
    };
    getQuizData();
  }, []);

  // Filtrowanie i losowanie pytań przy zmianie kategorii lub załadowaniu danych
  useEffect(() => {
    if (allQuestions.length === 0) return;

    const filtered = allQuestions.filter((q) => {
      const cats = q.category;
      if (cats.includes("81")) return test.includes("81");
      if (test.includes("all")) return true;
      return cats.some((c) => test.includes(c));
    });

    if (filtered.length === 0) {
      setCurrentTest([]);
      setMaxQuestions(0);
      resetQuizState();
      return;
    }

    const poolSize = filtered.length;
    setFullFilteredLength(poolSize);
    const drawData = draw(filtered, poolSize);
    if (drawData) {
      setCurrentTest(drawData);
      setMaxQuestions((prev) => {
        if (isManualLimit && prev !== "" && prev !== null) return Math.min(prev, poolSize);
        return poolSize;
      });
      resetQuizState();
    }
  }, [test, allQuestions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`app-shell bg-container visual-${visualStyle} container mx-auto min-h-screen pb-5 flex flex-col content-center justify-center text-blue-50 transition-colors duration-500 ease-in-out ${theme === "light" ? "light-mode" : ""}`}>
      <Header />
      <div className="top-controls flex justify-center items-center gap-2">
        <StyleToggle visualStyle={visualStyle} toggleVisualStyle={toggleVisualStyle} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <SoundOnOff handleClickAudio={handleClickAudio} audio={audio} />
        <Refresh refreshPage={refreshPage} />
      </div>
      <div className="flex justify-center flex-grow p-4">
        <div className="setup-panel glass-card w-full max-w-2xl p-6 text-center">
          <LimitOfquestions handleChangeLimit={handleChangeLimit} maxQuestions={maxQuestions} currentTest={currentTest} poolSize={fullFilteredLength}>
            <ChoiceTest handleTest={handleTest} test={test} categories={CATEGORIES} categoryLimits={categoryLimits} />
          </LimitOfquestions>
        </div>
      </div>
      {showWrongAnswers ? (
        <WrongAnswers wrongAnswers={wrongAnswers} startMistakesReview={startMistakesReview} />
      ) : (
        <>
          <Quiz currentTest={currentTest} currentQuestion={currentQuestion} answerChange={answerChange} isDisabled={isDisabled} selectedAnswerIndex={selectedAnswerIndex} isAnswerCorrect={isAnswerCorrect}>
            {dangerAlert && <DangerAlert answers={currentTest[currentQuestion].content} correctAnswer={currentTest[currentQuestion].correct} nextQuestion={nextQuestion} />}
            {succesAlert && <SuccesAlert nextQuestion={nextQuestion} />}
            {endTest && (
              <EndTestAlert correctAnswers={correctAnswers} inCorrectAnswers={inCorrectAnswers} maxQuestions={maxQuestions} hasSygnalizacjaError={hasSygnalizacjaError}>
                <ResultsButtons
                  onRetry={refreshPage}
                  onShowMistakes={() => { setShowWrongAnswers(true); setEndTest(false); }}
                  onReviewMistakes={startMistakesReview}
                  wrongAnswersCount={wrongAnswers.length}
                />
              </EndTestAlert>
            )}
          </Quiz>

          {!endTest && maxQuestions > 0 && (
            <ProgressStats correctAnswers={correctAnswers} inCorrectAnswers={inCorrectAnswers} maxQuestions={maxQuestions} />
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
