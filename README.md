# Aplikacja "Quiz" — Testy okresowe na stanowisku maszynisty metra

Demo: https://pablop76.github.io/metro-test/

## Krótko
Projekt to prosty quiz w React (Create React App + Craco) z Tailwind CSS. Pytania znajdują się w `public/questions.json`.

## Struktura danych
Każde pytanie ma postać (przykład):

```json
{
  "question": "Treść pytania",
  "content": ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C"],
  "correct": 0,
  "image": "./images/przyklad.png",
  "category": ["inspiro", "skoda", "metropolis", "sop", "sygnalizacja", "instrukcja", "linia2", "81"]
}
```

- `question`: treść pytania
- `content`: tablica odpowiedzi
- `correct`: indeks poprawnej odpowiedzi (0|1|2)
- `image`: opcjonalna ścieżka do obrazka
- `category`: tablica kluczy kategorii (pytanie może mieć wiele kategorii)

Wszystkie dostępne klucze kategorii (przykładowy opis):

| Klucz | Opis |
|-------|------|
| `all` | Wszystkie pytania (domyślna pula; nie zawiera pytań oznaczonych `81`) |
| `inspiro` | Pytania dotyczące pociągów Inspiro |
| `skoda` | Pytania dotyczące pociągów Škoda / Varsovia |
| `metropolis` | Pytania dotyczące pociągów Metropolis |
| `sop` | Systemy SOP / ATP / ATO, bezpieczeństwo ruchu |
| `sygnalizacja` | Semafory, wskaźniki, sygnały i schematy sygnalizacji |
| `instrukcja` | Przepisy, procedury i instrukcje obsługi |
| `linia2` | Specyfika i zasady dla linii M2 |
| `81` | Bonus — "Bonus - seria 81" (oddzielna kategoria, nie domyślnie w `all`) |


UWAGA: istnieje specjalna, bonusowa kategoria o kluczu `81` — `"Bonus - seria 81"`. Pytania oznaczone `81` są traktowane oddzielnie i domyślnie nie wchodzą do puli `all`.

## Multi-wybór kategorii
Interfejs pozwala zaznaczać wiele kategorii jednocześnie (checkbox). Aplikacja przy wyborze wielu kategorii korzysta z unii pytań (unikalnych), aby uniknąć duplikatów — czyli wyświetlany licznik pokazuje liczbę unikalnych pytań dla zaznaczonych kategorii.

Jeśli chcesz policzyć sumę limitów kategorii z duplikatami (np. zsumować wszystkie liczniki kategorii bez usuwania powtórzeń), użyj skryptu poniżej.

## Narzędzie do liczenia kategorii
W repo znajduje się prosty skrypt `scripts/count_categories.js`, który wypisuje liczniki dla każdej kategorii oraz sumy. Uruchom:

```bash
node scripts/count_categories.js
```

## Uruchomienie lokalne

```bash
npm install
npm start
```

Jeśli port 3000 jest zajęty, CRA zaproponuje inny port.

## Deploy na GitHub Pages

Projekt korzysta z pakietu `gh-pages`. Aby zbudować i opublikować stronę:

```bash
npm run build
npm run deploy
```

**WAŻNE:** aby `gh-pages` poprawnie opublikowało aplikację i aby ścieżki do zasobów działały, w `package.json` musi być ustawione pole:

```json
"homepage": "https://pablop76.github.io/metro-test"
```

Bez tego opublikowana strona może mieć błędne odnośniki do plików CSS/JS i nie działać spod ścieżki `/metro-test/`.

## Git — commit i push
Po edycji `README.md` lub innych plików:

```bash
git add README.md
git commit -m "Update README: usage, deploy, categories"
git push origin main
```

---
Jeśli chcesz, dopiszę krótką sekcję z listą zmian (changelog) dotyczącą ostatnich modyfikacji: multi-wybór kategorii oraz obsługa kategorii bonusowej `81`.