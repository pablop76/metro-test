// Kategorie pytań z etykietami do wyświetlenia
export const CATEGORIES = {
  all: "Pula pytań",
  skoda: "Śkoda / Varsovia",
  inspiro: "Inspiro",
  sygnalizacja: "Sygnalizacja",
  instrukcja: "Instrukcja",
  metropolis: "Metropolis",
  sop: "SOP",
  linia2: "Linia nr 2",
  starred: "Trudne ⭐",
  81: "Bonus - seria 81",
};

export const VISUAL_STYLES = ["default", "industrial", "retro"];

export const PASS_THRESHOLD = 75;

export const STORAGE_KEYS = {
  theme: "app-theme",
  visualStyle: "app-visual-style",
  starredQuestions: "starred-questions",
  sessionHistory: "session-history",
  questionStats: "question-stats",
  pausedSession: "quiz-paused-session",
  schemaVersion: "quiz-schema-version",
};

// Wersja schematu danych w localStorage.
// 2 — statystyki i gwiazdki kluczowane po `id` pytania zamiast po jego treści.
export const SCHEMA_VERSION = 2;

export const EXAM_TOTAL_COUNT = 40;
export const EXAM_SYGNALIZACJA_COUNT = 10;
export const MIN_QUESTIONS_FOR_STATS = 20;

// Ile milisekund czekamy po ostatnim znaku, zanim przefiltrujemy pulę pytań
export const SEARCH_DEBOUNCE_MS = 250;
