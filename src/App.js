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
import Refresh from "./components/refreshQuiz/RefreshQuiz.js";
import SoundOnOff from "./components/soundOnOff/SoundOnOff.js";
import ThemeToggle from "./components/themeToggle/ThemeToggle.js";
import WrongAnswers from "./components/wrongAnswers/WrongAnswers";
import oklaski from "./sound/oklaski.mp3";
import smiech from "./sound/smiech.mp3";

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
};

// Definicja kategorii z etykietami do wyświetlenia
const CATEGORIES = {
  all: "Wszystko",
  skoda: "Śkoda / Varsovia",
  inspiro: "Inspiro",
  sygnalizacja: "Sygnalizacja",
  instrukcja: "Instrukcja",
  metropolis: "Metropolis",
  sop: "SOP",
  linia2: "Linia nr 2",
  81: "Bonus - seria 81",
};

function App() {
  const [allQuestions, setAllQuestions] = useState([]); // pełna baza pytań
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
  const [test, setTest] = useState(["all"]);
  const [categoryLimits, setCategoryLimits] = useState({}); // { all: 335, skoda: 48, ... }
  // zapisuje błedne odpowiedzi ale jeszcze nic z nimi nie robi
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  
  const [isManualLimit, setIsManualLimit] = useState(false);
  const [fullFilteredLength, setFullFilteredLength] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // Dodanie stanu Theme i inicjalizacja z localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "dark";
  });

  // Zapisywanie motywu przy jego zmianie i aktualizacja atrybutu w dokumencie dla globalnych stylów
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    // Dodawanie/usuwanie klasy z elementu body pozwala na nadpisanie zmiennych globalnych w przyszłości, 
    // ale główny switch robimy na samej nakładce (divie) w return.
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // ustawienie tematu testu (wielokrotny wybór)
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
      setIsAnswerCorrect(false);
      setDangerAlert(true);
      if (inCorrectAnswers + correctAnswers < maxQuestions) {
        setInCorrectAnswers(inCorrectAnswers + 1);
        // zbieranie niepoprawnych odpowiedzi
        setSaveInCorrectAnswers([
          ...saveInCorrectAnswers,
          currentTest[currentQuestion],
        ]);
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
    // max bazuje teraz poprawnie na limitach wewn. eventu (tzn. input limitowany do max poolSize w LimitOfquestions)
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    if (value === 0) {
      setMaxQuestions("");
      return;
    }
    setMaxQuestions(value);
  };

  const handleClickAudio = () => {
    setAudioOn(!audio);
  };
  const refreshPage = () => {
    window.location.reload(false);
  };

  const startMistakesReview = () => {
    if (wrongAnswers.length === 0) return;
    
    // Create a new pool from wrong answers
    const pool = [...wrongAnswers];
    const poolSize = pool.length;
    
    setFullFilteredLength(poolSize);
    const drawData = draw(pool, poolSize); // Or just use pool if we want to keep original order, but draw is safer/consistent
    
    if (drawData) {
      setCurrentTest(drawData);
      setMaxQuestions(poolSize);
      setCorectAnswers(0);
      setInCorrectAnswers(0);
      setCurrentQuestion(0);
      setEndTest(false);
      setDangerAlert(false);
      setSuccesAlert(false);
      setIsDisabled(false);
      setWrongAnswers([]); // Reset wrong answers for the new "mistakes review" session
      setShowWrongAnswers(false);
    }
  };


  let colorSend = (() => {
    if (Math.round((correctAnswers / maxQuestions) * 100) >= 75) {
      return "bg-green-700";
    }
    return "bg-red-600";
  })();

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
          const cats = Array.isArray(q.category) ? q.category : [q.category];
          if (cats.includes("81")) {
            limits["81"] = (limits["81"] || 0) + 1;
            return;
          }
          limits.all = (limits.all || 0) + 1;
          cats.forEach((cat) => {
            limits[cat] = (limits[cat] || 0) + 1;
          });
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
      const cats = Array.isArray(q.category) ? q.category : [q.category];
      if (cats.includes("81")) {
        return Array.isArray(test) ? test.includes("81") : test === "81";
      }
      if (Array.isArray(test) && test.includes("all")) return true;
      if (!Array.isArray(test) && test === "all") return true;
      if (Array.isArray(test)) {
        return cats.some((c) => test.includes(c));
      }
      return cats.includes(test);
    });

    if (filtered.length === 0) {
      // If no questions match the selected categories, clear the current test
      // so we don't keep showing the previous question pool.
      setCurrentTest([]);
      setMaxQuestions(0);
      setCorectAnswers(0);
      setInCorrectAnswers(0);
      setCurrentQuestion(0);
      setEndTest(false);
      setDangerAlert(false);
      setSuccesAlert(false);
      setIsDisabled(false);
      setWrongAnswers([]);
      setShowWrongAnswers(false);
      return;
    }

    // Always reset to the full filtered pool when categories change.
    const poolSize = filtered.length;
    setFullFilteredLength(poolSize);
    const drawData = draw(filtered, poolSize);
    if (drawData) {
      setCurrentTest(drawData);
      setMaxQuestions(prev => {
        if (isManualLimit && prev !== "" && prev !== null) {
          return Math.min(prev, poolSize);
        }
        return poolSize;
      });
      setCorectAnswers(0);
      setInCorrectAnswers(0);
      setCurrentQuestion(0);
      setEndTest(false);
      setDangerAlert(false);
      setSuccesAlert(false);
      setIsDisabled(false);
      setWrongAnswers([]);
      setShowWrongAnswers(false);
    }
  }, [test, allQuestions]);

  return (
    <div className={`bg-container container mx-auto min-h-screen pb-5 flex flex-col content-center justify-center text-blue-50 transition-colors duration-500 ease-in-out ${theme === 'light' ? 'light-mode' : ''}`}>
      <Header />
      <div className="flex justify-center items-center gap-2">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <SoundOnOff handleClickAudio={handleClickAudio} audio={audio} />
        <Refresh refreshPage={refreshPage} />
      </div>
      <div className="flex justify-center flex-grow p-4">
        <div className="glass-card w-full max-w-2xl p-6 text-center">
          <LimitOfquestions
            handleChangeLimit={handleChangeLimit}
            maxQuestions={maxQuestions}
            currentTest={currentTest}
            poolSize={fullFilteredLength}
          >
            <ChoiceTest
              handleTest={handleTest}
              test={test}
              categories={CATEGORIES}
              categoryLimits={categoryLimits}
            />
          </LimitOfquestions>
        </div>
      </div>
      {showWrongAnswers ? (
        <WrongAnswers wrongAnswers={wrongAnswers} startMistakesReview={startMistakesReview} />
      ) : (
        <>
          <Quiz
          currentTest={currentTest}
          currentQuestion={currentQuestion}
          answerChange={answerChange}
          isDisabled={isDisabled}
          selectedAnswerIndex={selectedAnswerIndex}
          isAnswerCorrect={isAnswerCorrect}
        >
          {dangerAlert && (
            <DangerAlert
              answers={currentTest[currentQuestion].content}
              corectAnswer={currentTest[currentQuestion].correct}
              nextQuestion={nextQuestion}
            />
          )}
          {succesAlert && <SuccesAlert nextQuestion={nextQuestion} />}
          {endTest && (
            <EndTestAlert
              correctAnswers={correctAnswers}
              inCorrectAnswers={inCorrectAnswers}
              maxQuestions={maxQuestions}
              colorSend={colorSend}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
                <button
                  className="results-btn retry"
                  style={{
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                  onClick={refreshPage}
                >
                  Spróbuj ponownie
                </button>
                {wrongAnswers.length > 0 && (
                  <button
                    className="results-btn mistakes"
                    style={{
                      padding: "10px 16px",
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                    onClick={() => {
                      setShowWrongAnswers(true);
                      setEndTest(false);
                    }}
                  >
                    Pokaż błędy
                  </button>
                )}
                {wrongAnswers.length > 0 && (
                  <button
                    className="results-btn review-mistakes"
                    style={{
                      padding: "10px 16px",
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                    onClick={startMistakesReview}
                  >
                    Powtórz tylko błędy
                  </button>
                )}
              </div>
            </EndTestAlert>
          )}
          </Quiz>

          {/* Progress Bar & Stats */}
          {!endTest && maxQuestions > 0 && !showWrongAnswers && (
            <>
              <div className="progress-container w-full max-w-md mx-auto px-4 mt-6">
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${((correctAnswers + inCorrectAnswers) / maxQuestions) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm progress-label">
                  <span>Pytanie {Math.min(correctAnswers + inCorrectAnswers + 1, maxQuestions)} z {maxQuestions}</span>
                  <span>{maxQuestions ? Math.round((correctAnswers / maxQuestions) * 100) : 0}%</span>
                </div>
              </div>

              <div className="stats-row text-white glass-card">
                <div className="stat-item stat-correct" title="Poprawne">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  {correctAnswers}
                </div>
                <div className="w-px h-8 bg-gray-500 opacity-50"></div>
                <div className="donut-chart" style={{ width: '60px', height: '60px', margin: '0' }}>
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" className="donut-bg-circle" />
                    <circle 
                      cx="30" cy="30" r="24" 
                      stroke={Math.round((correctAnswers / maxQuestions) * 100) >= 75 ? "#22c55e" : (correctAnswers > 0 ? "#ea580c" : "transparent")} 
                      strokeWidth="6" fill="none" strokeLinecap="round" 
                      strokeDasharray={`${(Math.round((correctAnswers / maxQuestions) * 100) / 100) * 150} 150`}
                      className="donut-fill-circle"
                    />
                  </svg>
                  <div className="donut-label" style={{ fontSize: '14px' }}>{maxQuestions ? Math.round((correctAnswers / maxQuestions) * 100) : 0}%</div>
                </div>
                <div className="w-px h-8 bg-gray-500 opacity-50"></div>
                <div className="stat-item stat-incorrect" title="Błędne">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  {inCorrectAnswers}
                </div>
              </div>
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}


export default App;
