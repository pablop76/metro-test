import {
  getQuestionId,
  toggleStarred,
  getStarredIds,
  updateQuestionStat,
  getQuestionStats,
  getWeakestQuestions,
  getCategoryStats,
  migrateStorageToIds,
  remapPausedSession,
} from "./quizUtils";
import { STORAGE_KEYS, SCHEMA_VERSION } from "../constants";

// Trzy pytania o identycznej treści, różniące się obrazkiem i poprawną odpowiedzią —
// odwzorowanie realnego przypadku z bazy ("Opisz symbole" × 17).
const SYMBOL_A = { id: "q010", question: "Opisz symbole", image: "./images/a.png", content: ["a", "b", "c"], correct: 0, category: ["sygnalizacja"] };
const SYMBOL_B = { id: "q011", question: "Opisz symbole", image: "./images/b.png", content: ["a", "b", "c"], correct: 1, category: ["sygnalizacja"] };
const SYMBOL_C = { id: "q012", question: "Opisz symbole", image: "./images/c.png", content: ["a", "b", "c"], correct: 2, category: ["sygnalizacja"] };
const UNIQUE = { id: "q001", question: "Tryb TB służy do", content: ["a", "b", "c"], correct: 2, category: ["linia2"] };

const BASE = [UNIQUE, SYMBOL_A, SYMBOL_B, SYMBOL_C];

beforeEach(() => localStorage.clear());

describe("getQuestionId", () => {
  it("zwraca id pytania z bazy", () => {
    expect(getQuestionId(SYMBOL_A)).toBe("q010");
  });

  it("rozróżnia pytania o tej samej treści", () => {
    expect(getQuestionId(SYMBOL_A)).not.toBe(getQuestionId(SYMBOL_B));
  });

  it("dla pytania bez id używa treści i obrazka", () => {
    const legacy = { question: "Opisz symbole", image: "./images/a.png" };
    const other = { question: "Opisz symbole", image: "./images/b.png" };
    expect(getQuestionId(legacy)).not.toBe(getQuestionId(other));
  });

  it("nie wywraca się na braku pytania", () => {
    expect(getQuestionId(undefined)).toBe("");
  });
});

describe("gwiazdki", () => {
  it("oznaczają wyłącznie wskazane pytanie, nie całą grupę o tej samej treści", () => {
    const ids = toggleStarred(SYMBOL_B);
    expect(ids.has("q011")).toBe(true);
    expect(ids.has("q010")).toBe(false);
    expect(ids.has("q012")).toBe(false);
  });

  it("drugie kliknięcie zdejmuje oznaczenie", () => {
    toggleStarred(SYMBOL_B);
    expect(toggleStarred(SYMBOL_B).has("q011")).toBe(false);
  });
});

describe("statystyki pytań", () => {
  it("liczą się osobno dla pytań o tej samej treści", () => {
    updateQuestionStat(SYMBOL_A, true);
    updateQuestionStat(SYMBOL_B, false);
    const stats = getQuestionStats();
    expect(stats.q010.correct).toBe(1);
    expect(stats.q010.wrong).toBe(0);
    expect(stats.q011.correct).toBe(0);
    expect(stats.q011.wrong).toBe(1);
    expect(stats.q012).toBeUndefined();
  });

  it("dwa błędy z rzędu wciągają do trudnych tylko to jedno pytanie", () => {
    updateQuestionStat(SYMBOL_B, false);
    updateQuestionStat(SYMBOL_B, false);
    const weak = getWeakestQuestions(BASE);
    expect(weak.map((q) => q.id)).toEqual(["q011"]);
  });

  it("dwie poprawne z rzędu zdejmują pytanie z trudnych", () => {
    updateQuestionStat(SYMBOL_B, false);
    updateQuestionStat(SYMBOL_B, false);
    updateQuestionStat(SYMBOL_B, true);
    updateQuestionStat(SYMBOL_B, true);
    expect(getWeakestQuestions(BASE)).toHaveLength(0);
  });

  it("statystyki kategorii nie zliczają jednego wyniku wielokrotnie", () => {
    updateQuestionStat(SYMBOL_A, true);
    const stats = getCategoryStats(BASE);
    expect(stats.sygnalizacja.total).toBe(3);
    expect(stats.sygnalizacja.correct).toBe(1);
  });
});

describe("migracja do identyfikatorów", () => {
  it("przenosi dane pytań o niepowtarzalnej treści", () => {
    localStorage.setItem(STORAGE_KEYS.questionStats, JSON.stringify({
      "Tryb TB służy do": { correct: 3, wrong: 1, wrongStreak: 0, correctStreak: 1, difficult: false },
    }));
    localStorage.setItem(STORAGE_KEYS.starredQuestions, JSON.stringify(["Tryb TB służy do"]));

    const report = migrateStorageToIds(BASE);

    expect(report).toEqual({ statsMoved: 1, statsDropped: 0, starredMoved: 1, starredDropped: 0 });
    expect(getQuestionStats().q001.correct).toBe(3);
    expect(getStarredIds().has("q001")).toBe(true);
  });

  it("odrzuca wpisy, których nie da się przypisać do konkretnego pytania", () => {
    localStorage.setItem(STORAGE_KEYS.questionStats, JSON.stringify({
      "Opisz symbole": { correct: 5, wrong: 9, wrongStreak: 2, correctStreak: 0, difficult: true },
    }));
    localStorage.setItem(STORAGE_KEYS.starredQuestions, JSON.stringify(["Opisz symbole"]));

    const report = migrateStorageToIds(BASE);

    expect(report.statsDropped).toBe(1);
    expect(report.starredDropped).toBe(1);
    expect(getQuestionStats()).toEqual({});
    expect(getStarredIds().size).toBe(0);
  });

  it("uruchamia się tylko raz", () => {
    expect(migrateStorageToIds(BASE)).not.toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.schemaVersion)).toBe(String(SCHEMA_VERSION));
    expect(migrateStorageToIds(BASE)).toBeNull();
  });

  it("nie rusza danych już zapisanych pod id", () => {
    localStorage.setItem(STORAGE_KEYS.questionStats, JSON.stringify({
      q011: { correct: 2, wrong: 0, wrongStreak: 0, correctStreak: 2, difficult: false },
    }));
    const report = migrateStorageToIds(BASE);
    expect(report.statsMoved).toBe(1);
    expect(getQuestionStats().q011.correct).toBe(2);
  });
});

describe("remapPausedSession", () => {
  it("uzupełnia id w sesji zapisanej starszą wersją aplikacji", () => {
    const legacy = {
      currentTest: [{ question: "Opisz symbole", image: "./images/c.png", content: ["a", "b", "c"], correct: 2 }],
      wrongAnswers: [{ question: "Tryb TB służy do", content: ["a", "b", "c"], correct: 2 }],
    };
    const remapped = remapPausedSession(legacy, BASE);
    expect(remapped.currentTest[0].id).toBe("q012");
    expect(remapped.wrongAnswers[0].id).toBe("q001");
  });

  it("zostawia pytania, których nie ma już w bazie", () => {
    const legacy = { currentTest: [{ question: "Pytanie usunięte z bazy", content: ["a", "b", "c"], correct: 0 }] };
    const remapped = remapPausedSession(legacy, BASE);
    expect(remapped.currentTest[0].question).toBe("Pytanie usunięte z bazy");
    expect(remapped.wrongAnswers).toEqual([]);
  });

  it("nie wywraca się na braku sesji", () => {
    expect(remapPausedSession(null, BASE)).toBeNull();
  });
});
