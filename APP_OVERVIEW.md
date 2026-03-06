# Przegląd aplikacji testu metra

Ten dokument podsumowuje strukturę i działanie aplikacji quizowej Metro Test. Służy jako punkt odniesienia przy przenoszeniu do nowego kontekstu lub refaktoryzacji kodu.

## Cel

Aplikacja jest oparta na React i stanowi quiz dla maszynistów metra, pomagający w okresowym sprawdzeniu wiedzy. Pytania ładowane są z pliku JSON (`public/questions.json`). Użytkownik może wybierać kategorie pytań, ograniczać ich liczbę, przełączać dźwięk/motyw oraz przeglądać błędne odpowiedzi.

---

## Punkt wejścia: `src/App.js`

- **Zarządzanie stanem**
  - `allQuestions`: pełna pula pytań pobrana z JSON.
  - `currentTest`: losowy zestaw pytań przygotowany na obecną sesję.
  - `currentQuestion`: indeks aktywnego pytania.
  - `maxQuestions`: liczba pytań do pokazania (można ją ręcznie ograniczyć).
  - Śledzenie postępów (`correctAnswers`, `inCorrectAnswers`, `wrongAnswers` itd.).
  - Kontrolki UI: alerty (`dangerAlert`, `succesAlert`, `endTest`), dźwięk, motyw, stan wyłączenia przycisków.
  - Wybór kategorii (`test`) oraz obliczone limity (`categoryLimits`).
  - Motyw zapisywany w `localStorage`.

- **Efekty (useEffect)**
  - Ładowanie danych pytań przy montowaniu, normalizacja kategorii, obliczanie limitów.
  - Ponowne filtrowanie/losowanie pytań przy zmianie wybranych kategorii.

- **Funkcje obsługi**
  - `handleTest` – przełączanie zaznaczonych kategorii.
  - `answerChange` – obsługa wybrania odpowiedzi, odtwarzanie dźwięku, aktualizacja statystyk i listy błędów.
  - `nextQuestion` – przejście do następnego pytania lub zakończenie testu.
  - `handleChangeLimit`, `handleClickAudio`, `refreshPage`, `startMistakesReview`.
  - `draw` – pomocnicza funkcja losująca podzbiór pytań.

- **Budowa interfejsu**
  - Globalne kontrolki: przełącznik motywu, dźwięku i przycisk odświeżania.
  - `LimitOfquestions` opakowuje `ChoiceTest` (wybór kategorii i ograniczenie liczby pytań).
  - Główny quiz korzysta z komponentu `Quiz` i dziecięcych alertów (`DangerAlert`, `SuccesAlert`, `EndTestAlert`).
  - Pasek postępu i statystyki wyświetlane po uruchomieniu testu.
  - Widok `WrongAnswers` przy przeglądaniu błędów.
  - Trwały nagłówek i stopka.

---

## Przegląd komponentów

### `components/quiz/Quiz.js`

Wyświetla tekst pytania, opcjonalnie obraz oraz przyciski odpowiedzi. Przyjmuje propsy ze stanem i callbackami.

### `components/limitOfquestions/LimitOfquestions.js`

Pole typu number umożliwiające ręczne ustawienie liczby pytań. Zawiera dzieci (wyboru kategorii).

### `components/choiceTest/ChoiceTest.js`

Prezentuje klikalne pigułki kategorii z liczbą dostępnych pytań. Obsługuje wielokrotny wybór oraz specjalne traktowanie kategorii "81".

### Alerty (`components/alerts/`)

- `DangerAlert`: widoczny po błędnej odpowiedzi, pokazuje prawidłowy wybór.
- `SuccesAlert`: pokaz po poprawnej odpowiedzi z konfetti.
- `EndTestAlert`: podsumowanie po zakończeniu testu z wykresem donut i przyciskami powtórki/analizy błędów.
- `StartModal`: modal informacyjny przy ładowaniu strony (z danymi autora).

### `components/refreshQuiz/RefreshQuiz.js`

Przycisk odświeżający stronę quizu.

### `components/soundOnOff/SoundOnOff.js`

Przełącza dźwięk w quizie, zmienia ikonę.

### `components/themeToggle/ThemeToggle.js`

Przełącznik jasny/ciemny motyw, aktualizuje klasę i tytuł.

### `components/header/Header.js` & `components/footer/Footer.js`

Statyczne elementy nagłówka i stopki wyświetlane na początku i końcu.

### `components/wrongAnswers/WrongAnswers.js`

Lista pytań, które użytkownik odpowiedział źle, wraz z przyciskiem do powtórki tylko tych.

---

## Przepływ danych

1. Aplikacja inicjalizuje się i pobiera `/questions.json`.
2. Pytania zapisywane są w `allQuestions`; kategorie normalizowane do tablic stringów.
3. Obliczane są limity dla każdej kategorii i zapisane w `categoryLimits`.
4. Użytkownik wybiera kategorie przez `ChoiceTest` (stan `test`).
5. Efekt filtruje `allQuestions`, losuje i uaktualnia `currentTest`.
6. W razie potrzeby użytkownik ogranicza liczbę pytań przez `LimitOfquestions`.
7. Każde pytanie wyświetla komponent `Quiz`; użytkownik wybiera odpowiedź.
8. `answerChange` aktualizuje statystyki, wywołuje alerty i opcjonalnie loguje błędne odpowiedzi.
9. Po zakończeniu testu `EndTestAlert` pokazuje wyniki, oferując powtórkę lub analizę błędów.
10. Błędne odpowiedzi można przeglądać osobno, przywracając stan quizu.

---

## Zasoby i konfiguracja

- Plik pytań: `public/questions.json` (struktura: `{ "questions": [ { question, content, correct, category, image? } ] }`).
- Pliki audio w `src/sound/` ładowane przez obiekty `Audio`.
- Style CSS/Tailwind: `App.css` oraz `tailwind.config.js`.

---

## Budowanie i uruchamianie

Standardowy workflow oparty na Create React App:

```bash
npm install
npm start         # uruchamia serwer deweloperski na localhost
npm run build      # buduje paczkę produkcyjną pod /build
```

---

Ta dokumentacja powinna pomóc w orientacji w strukturze aplikacji i jej działaniu. W razie zmiany kontekstu odwołuj się do tego pliku przy modyfikacjach lub refaktoryzacji.

Deploy na GitHub Pages
Projekt korzysta z pakietu gh-pages. Aby zbudować i opublikować stronę:

npm run build
npm run deploy
WAŻNE: aby gh-pages poprawnie opublikowało aplikację i aby ścieżki do zasobów działały, w package.json musi być ustawione pole:

"homepage": "https://pablop76.github.io/metro-test"
Bez tego opublikowana strona może mieć błędne odnośniki do plików CSS/JS i nie działać spod ścieżki /metro-test/.
