# Aplikacja "Quiz" — Testy okresowe na stanowisku maszynisty metra

* [DEMO](https://pablop76.github.io/metro-test/)

## Template

![template app](./template.png)

## Technologie

* React, Tailwind CSS, Craco

## Struktura danych

Pytania przechowywane są w pliku `public/questions.json` w jednej tablicy `questions`. Każde pytanie ma strukturę:

```json
{
  "question": "Treść pytania",
  "content": ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C"],
  "correct": 0,
  "image": "./images/przyklad.png",
  "category": ["inspiro", "sop"]
}
```

| Pole | Opis |
|------|------|
| `question` | Treść pytania |
| `content` | Tablica 3 odpowiedzi |
| `correct` | Indeks poprawnej odpowiedzi (0, 1 lub 2) |
| `image` | Ścieżka do obrazka (opcjonalne) |
| `category` | **Tablica kategorii** — pytanie może należeć do wielu kategorii |

### Kategorie

| Klucz | Opis | Pytania |
|-------|------|---------|
| `inspiro` | Pociągi Inspiro | 74 |
| `skoda` | Pociągi Śkoda / Varsovia | 51 |
| `metropolis` | Pociągi Metropolis | 57 |
| `sop` | System SOP (ATP/ATO) | 46 |
| `sygnalizacja` | Semafory, wskaźniki, sygnały | 61 |
| `instrukcja` | Przepisy, procedury, rozkazy | 80 |
| `linia2` | Specyfika linii M2 | 16 |

Łącznie **335 unikalnych pytań**. Pytanie może należeć do wielu kategorii jednocześnie (np. pytanie o SOP-3 w pociągu Inspiro → `["inspiro", "sop"]`).

### Dodawanie nowej kategorii

1. Dodaj klucz do `CATEGORIES` w `src/App.js`
2. Dodaj pytania z nową kategorią w tablicy `category` w `questions.json`

## Praca z projektem

```bash
npm install
npm start
```

## Deploy

```bash
npm run deploy
```

Wymaga w `package.json`: `"homepage": "https://pablop76.github.io/metro-test"`