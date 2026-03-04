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
  "category": ["inspiro", "sop"]
}
```

- `question`: treść pytania
- `content`: tablica odpowiedzi
- `correct`: indeks poprawnej odpowiedzi (0|1|2)
- `image`: opcjonalna ścieżka do obrazka
- `category`: tablica kluczy kategorii (pytanie może mieć wiele kategorii)

## Kategorie i liczby (stan na teraz)
- `all` (wszystkie): 343
- `inspiro`: 74
- `skoda`: 51
- `metropolis`: 57
- `sop`: 45
- `sygnalizacja`: 61
- `instrukcja`: 90
- `linia2`: 14

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

W `package.json` powinna być ustawiona właściwość `homepage` na `https://pablop76.github.io/metro-test`.

## Git — commit i push
Po edycji `README.md` lub innych plików:

```bash
git add README.md
git commit -m "Update README: usage, deploy, categories"
git push origin main
```

---
Jeśli chcesz, dopiszę krótką sekcję z listą zmian (changelog) dotyczącą ostatnich modyfikacji: multi-wybór kategorii oraz obsługa kategorii bonusowej `81`.