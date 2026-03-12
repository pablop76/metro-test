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
import { CATEGORIES, VISUAL_STYLES, STORAGE_KEYS, EXAM_TOTAL_COUNT, EXAM_SYGNALIZACJA_COUNT } from "./constants";
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
  const [examMode, setExamMode] = useState(false);
  const [learningMode, setLearningMode] = useState(false);

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
    setExamMode(false);
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

  // Resetuje stan quizu do wartości początkowych
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
      // W trybie nauki błędy nie są liczone
      if (!learningMode) {
        if (inCorrectAnswers + correctAnswers < maxQuestions) {
          setInCorrectAnswers(inCorrectAnswers + 1);
        }
        setWrongAnswers([...wrongAnswers, currentTest[currentQuestion]]);
      }
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

  // Refy dla obsługi klawiatury (zawsze aktualna wersja funkcji)
  const answerChangeRef = useRef(answerChange);
  answerChangeRef.current = answerChange;
  const nextQuestionRef = useRef(nextQuestion);
  nextQuestionRef.current = nextQuestion;

  // Skróty klawiszowe: 1/2/3 → wybór odpowiedzi, Enter → następne pytanie
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (endTest || showWrongAnswers) return;
      if (!isDisabled && currentTest[currentQuestion]) {
        if (e.key === "1") answerChangeRef.current(0);
        else if (e.key === "2") answerChangeRef.current(1);
        else if (e.key === "3") answerChangeRef.current(2);
      }
      if (isDisabled && (dangerAlert || succesAlert)) {
        if (e.key === "Enter") nextQuestionRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDisabled, endTest, currentQuestion, currentTest, dangerAlert, succesAlert, showWrongAnswers]);

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

  // Tryb egzaminu: 40 pytań (10 z sygnalizacji + 30 pozostałe)
  const startExamMode = () => {
    const sygnalizacjaPool = allQuestions.filter(q =>
      q.category.includes("sygnalizacja") && !q.category.includes("81")
    );
    const otherPool = allQuestions.filter(q =>
      !q.category.includes("sygnalizacja") && !q.category.includes("81")
    );
    if (sygnalizacjaPool.length < EXAM_SYGNALIZACJA_COUNT || otherPool.length < EXAM_TOTAL_COUNT - EXAM_SYGNALIZACJA_COUNT) return;

    const examSyg = draw(sygnalizacjaPool, EXAM_SYGNALIZACJA_COUNT);
    const examOther = draw(otherPool, EXAM_TOTAL_COUNT - EXAM_SYGNALIZACJA_COUNT);
    const combined = draw([...examSyg, ...examOther], EXAM_TOTAL_COUNT);

    if (combined) {
      setCurrentTest(combined);
      setMaxQuestions(EXAM_TOTAL_COUNT);
      setFullFilteredLength(EXAM_TOTAL_COUNT);
      resetQuizState();
      setExamMode(true);
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

        const normalized = questions.map((q) => {
          const cats = Array.isArray(q.category) ? q.category : [q.category];
          return { ...q, category: cats.map((c) => String(c)) };
        });
        setAllQuestions(normalized);

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

  useEffect(() => {
    if (allQuestions.length === 0) return;
    if (examMode) return; // tryb egzaminu sam ustawia currentTest

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
        <button
          className={`control-btn learning-btn ${learningMode ? "active" : ""}`}
          onClick={() => setLearningMode(l => !l)}
          title={learningMode ? "Wyłącz tryb nauki" : "Włącz tryb nauki (błędy nie są liczone)"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
        <Refresh refreshPage={refreshPage} />
      </div>

      {/* Pasek trybu egzaminu */}
      {examMode && (
        <div className="exam-mode-banner">
          TRYB EGZAMINU &nbsp;·&nbsp; {EXAM_TOTAL_COUNT} pytań &nbsp;·&nbsp; min. 75% + brak błędów z Sygnalizacji
        </div>
      )}
      {/* Pasek trybu nauki */}
      {learningMode && !examMode && (
        <div className="learning-mode-banner">
          TRYB NAUKI &nbsp;·&nbsp; błędy nie są liczone
        </div>
      )}

      <div className="flex justify-center flex-grow p-4">
        <div className="setup-panel glass-card w-full max-w-2xl p-6 text-center">
          <LimitOfquestions handleChangeLimit={handleChangeLimit} maxQuestions={examMode ? EXAM_TOTAL_COUNT : maxQuestions} currentTest={currentTest} poolSize={fullFilteredLength} disabled={examMode}>
            <ChoiceTest handleTest={handleTest} test={examMode ? ["all"] : test} categories={CATEGORIES} categoryLimits={categoryLimits} disabled={examMode} />
          </LimitOfquestions>
          {/* Przycisk trybu egzaminu */}
          {allQuestions.length > 0 && (
            <div className="mt-4">
              <button className={`exam-mode-btn ${examMode ? "active" : ""}`} onClick={examMode ? refreshPage : startExamMode}>
                {examMode
                  ? "Zakończ egzamin"
                  : `Tryb Egzaminu — ${EXAM_TOTAL_COUNT} pytań (${EXAM_SYGNALIZACJA_COUNT} z Sygnalizacji)`}
              </button>
            </div>
          )}
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
              <EndTestAlert correctAnswers={correctAnswers} inCorrectAnswers={inCorrectAnswers} maxQuestions={maxQuestions} hasSygnalizacjaError={hasSygnalizacjaError} examMode={examMode} learningMode={learningMode}>
                <ResultsButtons
                  onRetry={refreshPage}
                  onShowMistakes={() => { setShowWrongAnswers(true); setEndTest(false); }}
                  onReviewMistakes={startMistakesReview}
                  wrongAnswersCount={wrongAnswers.length}
                  learningMode={learningMode}
                />
              </EndTestAlert>
            )}
          </Quiz>

          {/* Podpowiedź klawiatury */}
          {!endTest && maxQuestions > 0 && !isDisabled && (
            <div className="kbd-hint">klawisze: 1 · 2 · 3</div>
          )}
          {!endTest && maxQuestions > 0 && isDisabled && (dangerAlert || succesAlert) && (
            <div className="kbd-hint">Enter → następne pytanie</div>
          )}

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
