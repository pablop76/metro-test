# CLAUDE.md — Dusza projektu: Quiz Metro

## Czym jest ten projekt

Aplikacja quizowa dla **maszynistów metra warszawskiego** do samodzielnej nauki i powtarzania materiału na egzaminy okresowe. Zbudowana w React (Create React App + Craco + Tailwind CSS).

Demo: https://pablop76.github.io/metro-test/

---

## Uruchamianie projektu

```bash
npm install       # instalacja zależności (tylko raz)
npm start         # serwer deweloperski → http://localhost:3000
npm run build     # build produkcyjny → /build
npm run deploy    # build + publikacja na GitHub Pages
```

---

## Struktura katalogów

```
src/
  App.js                  # główny komponent — cały stan aplikacji
  App.css                 # style globalne + motyw Glassmorphism
  components/
    alerts/               # DangerAlert, SuccesAlert, EndTestAlert
    choiceTest/           # wybór kategorii (checkboxy z licznikami)
    quiz/                 # wyświetlanie pytania i odpowiedzi
    limitOfquestions/     # pole do ograniczenia liczby pytań
    wrongAnswers/         # widok błędnych odpowiedzi po teście
    header/ footer/       # statyczne elementy strony
    refreshQuiz/          # przycisk odświeżenia
    soundOnOff/           # przełącznik dźwięku
    themeToggle/          # przełącznik jasny/ciemny
    styleToggle/          # przełącznik stylu wizualnego (default/industrial/retro)
  sound/                  # oklaski.mp3, smiech.mp3
  images/                 # obrazy tła (bg.svg, stp.jpg, itd.)

public/
  questions.json          # BAZA PYTAŃ — główny plik danych
  images/                 # obrazki do pytań

scripts/
  count_categories.js     # liczy pytania per kategoria
  check_duplicates.js     # wykrywa duplikaty
```

---

## Baza pytań (`public/questions.json`)

Struktura każdego pytania:

```json
{
  "question": "Treść pytania",
  "content": ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C"],
  "correct": 0,
  "image": "./images/przyklad.png",
  "category": ["inspiro", "sop"]
}
```

- `correct` — indeks poprawnej odpowiedzi (0, 1 lub 2)
- `image` — opcjonalne, może nie być
- `category` — tablica, pytanie może należeć do wielu kategorii

### Kategorie

| Klucz | Opis |
|-------|------|
| `all` | Wszystkie pytania (bez `81`) — domyślna pula |
| `inspiro` | Pociągi Inspiro |
| `skoda` | Pociągi Škoda / Varsovia |
| `metropolis` | Pociągi Metropolis |
| `sop` | Systemy SOP / ATP / ATO |
| `sygnalizacja` | Semafory, wskaźniki, sygnały |
| `instrukcja` | Przepisy i procedury |
| `linia2` | Specyfika linii M2 |
| `81` | Bonus — seria 81 (oddzielna, nie wchodzi do `all`) |

> **Ważne:** pytania z kategorią `81` są zawsze wykluczone z puli `all` — logika w `App.js` traktuje je specjalnie.

---

## Architektura stanu (App.js)

Cały stan aplikacji żyje w `App.js` i przekazywany jest do komponentów przez propsy.

Kluczowe stany:
- `allQuestions` — pełna baza po załadowaniu z JSON
- `currentTest` — wylosowany zestaw pytań dla bieżącej sesji
- `test` — tablica wybranych kategorii, np. `["inspiro", "sop"]` (zawsze tablica)
- `categoryLimits` — obiekt `{ all: 335, skoda: 48, ... }` z licznikami
- `maxQuestions` — limit pytań (można ustawić ręcznie)
- `wrongAnswers` — pytania, na które odpowiedziano źle (do powtórki)
- `theme` — `"dark"` lub `"light"` (zapisywany w localStorage)
- `visualStyle` — `"default"` | `"industrial"` | `"retro"` (localStorage)

Pomocnicza funkcja `resetQuizState()` resetuje wszystkie stany sesji quizu do wartości początkowych — używana przy zmianie kategorii, starcie powtórki błędów itp.

---

## Przepływ logiki

1. Załadowanie `questions.json` → normalizacja kategorii → obliczenie `categoryLimits`
2. Zmiana kategorii (`test`) → filtrowanie + losowanie → nowy `currentTest`
3. Odpowiedź użytkownika → `answerChange` → alert + aktualizacja statystyk
4. Koniec pytań → `EndTestAlert` z wynikami
5. Opcja: "Powtórz tylko błędy" → `startMistakesReview` → nowy test z `wrongAnswers`

---

## Konwencje i styl kodu

- Komponenty funkcyjne React z hookami (`useState`, `useEffect`, `useRef`)
- Style: głównie **Tailwind CSS** + klasy własne w `App.css`
- Design **Glassmorphism** — przezroczyste karty z efektem rozmycia (`glass-card`)
- Czcionki: `Space Grotesk` (tekst) + `Bebas Neue` (nagłówki)
- Komentarze w kodzie po **polsku**
- Brak TypeScript — czysty JavaScript

### Ważne zasady importów

Stałe (`CATEGORIES`, `VISUAL_STYLES`, `STORAGE_KEYS`, `PASS_THRESHOLD`) importuj z `src/constants/index.js` — nie definiuj ich ponownie lokalnie.

Funkcje pomocnicze (`draw`, `getScorePercentage`) importuj z `src/utils/quizUtils.js` — nie duplikuj ich w komponentach.

---

## Co NIE powinno się zmieniać bez ostrożności

- Logika wykluczania kategorii `81` z puli `all` (w dwóch miejscach: ładowanie danych i filtrowanie)
- Pole `"homepage"` w `package.json` — konieczne dla poprawnego działania GitHub Pages
- Struktura `questions.json` — zmiana schematu wymaga aktualizacji filtrowania w `App.js`

---

## Przydatne skrypty

```bash
node scripts/count_categories.js    # podsumowanie liczby pytań per kategoria
node scripts/check_duplicates.js    # raport duplikatów pytań
```
