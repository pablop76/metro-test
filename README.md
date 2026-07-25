# Quiz — Testy egzaminacyjne maszynisty metra

Aplikacja online: **https://pablop76.github.io/metro-test/**

## O projekcie

Aplikacja do nauki i sprawdzania wiedzy przed egzaminem na stanowisko maszynisty metra warszawskiego. Pytania są losowane z `public/questions.json` i podzielone na kategorie tematyczne.

---

## Funkcje

### Tryby nauki
| Tryb | Opis |
|------|------|
| **Standardowy** | Losowy zestaw pytań z wybranej kategorii (domyślnie 30) |
| **Tryb Egzaminu** | 40 pytań (10 z Sygnalizacji + 30 pozostałe), próg zaliczenia 75% + brak błędów z Sygnalizacji |
| **Trudne pytania** | Automatycznie zbiera pytania na których popełniłeś 2 błędy z rzędu; znikają po 2 poprawnych odpowiedziach z rzędu |
| **Tryb nauki** | Poprawna odpowiedź oznaczona na bieżąco; błędna odpowiedź blokuje tylko ten przycisk — musisz znaleźć poprawną; brak popupów |

### Statystyki i postęp
| Funkcja | Opis |
|---------|------|
| **Historia sesji** | Ostatnie 15 zakończonych testów z wykresem trendu (ikona zegara) |
| **Mapa metra** | Wizualizacja opanowania kategorii jako stacje na mapie metra M1/M2 (ikona mapy) |
| **Przed egzaminem** | Analiza gotowości: wskaźnik %, słabe kategorie, najtrudniejsze pytania, alert Sygnalizacji, trend |
| **Reset statystyk** | Przycisk w historii sesji — kasuje historię i statystyki pytań (gwiazdki zostają) |

### Oznaczanie pytań
- **Gwiazdka (⭐)** na karcie pytania ręcznie oznacza je jako trudne
- Kategoria **"Trudne ⭐"** — pula pytań oznaczonych + pytań ze złymi seriami odpowiedzi
- Oznaczone pytania wchodzą do trybu **Trudnych pytań** natychmiast po zaznaczeniu

### UX
- **Skróty klawiszowe**: `1` / `2` / `3` → wybór odpowiedzi, `Enter` → następne pytanie
- **Animacja slide-in** między pytaniami
- **Pauza i wznowienie** — postęp zapisywany automatycznie po każdym pytaniu
- **Wyszukiwarka pytań** — filtrowanie puli po treści pytania
- **Dźwięki** — opcjonalne efekty przy poprawnej/błędnej odpowiedzi
- **Motywy** — dark/light + style wizualne (default / industrial / retro)

---

## Struktura pytania (questions.json)

```json
{
  "id": "q001",
  "question": "Treść pytania",
  "content": ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C"],
  "correct": 0,
  "image": "./images/przyklad.png",
  "category": ["inspiro", "sygnalizacja"]
}
```

| Pole | Typ | Opis |
|------|-----|------|
| `id` | string | Trwały identyfikator (`q001`…). Klucz statystyk, gwiazdek i trudnych pytań |
| `question` | string | Treść pytania |
| `content` | string[] | Tablica 3 odpowiedzi |
| `correct` | 0\|1\|2 | Indeks poprawnej odpowiedzi |
| `image` | string? | Opcjonalna ścieżka do grafiki |
| `category` | string[] | Klucze kategorii (pytanie może mieć kilka) |

> **Dodajesz pytanie?** Nie wymyślaj `id` ręcznie — dopisz pytanie bez tego pola
> i uruchom `node scripts/assign_ids.js`. Skrypt nada kolejny wolny numer i nigdy
> nie rusza już istniejących. **Nigdy nie zmieniaj ani nie przenumerowuj istniejących
> `id`** — użytkownicy mają pod nimi zapisany postęp w `localStorage`.

### Kategorie

| Klucz | Etykieta | Opis |
|-------|----------|------|
| `inspiro` | Inspiro | Pociągi Inspiro |
| `skoda` | Śkoda / Varsovia | Pociągi Škoda / Varsovia |
| `metropolis` | Metropolis | Pociągi Metropolis |
| `sop` | SOP | Systemy SOP / ATP / ATO, bezpieczeństwo ruchu |
| `sygnalizacja` | Sygnalizacja | Semafory, wskaźniki, sygnały — błąd dyskwalifikuje egzamin |
| `instrukcja` | Instrukcja | Przepisy i procedury obsługi |
| `linia2` | Linia nr 2 | Specyfika linii M2 |
| `81` | Seria 81 | Bonus — oddzielna kategoria, nie wchodzi do puli `all` |

---

## Zasady zapisywania statystyk

Sesja trafia do historii tylko gdy:
- test **nie** jest w trybie nauki
- test **nie** jest powtórką błędnych odpowiedzi
- test **nie** jest trybem trudnych pytań
- test zawiera **≥ 20 pytań**

---

## Stack

React 18 + Vite 6, Tailwind 3, testy na Vitest.

## Uruchomienie lokalne

```bash
npm install
npm start          # → http://localhost:3000/metro-test/
```

> Adres kończy się na `/metro-test/` — to ścieżka bazowa aplikacji, ta sama co na
> GitHub Pages. Samo `localhost:3000` zwróci 404.

```bash
npm test           # testy jednostkowe (Vitest)
npm run test:watch # testy w trybie ciągłym
npm run build      # build produkcyjny → /build
npm run preview    # podgląd zbudowanej wersji → http://localhost:4173/metro-test/
```

## Deploy na GitHub Pages

```bash
npm run deploy     # buduje i publikuje katalog build/ na branch gh-pages
```

> **WAŻNE:** ścieżkę bazową ustawia pole `base` w `vite.config.js`. Bez niej
> odwołania do CSS, JS i grafik nie działają spod `/metro-test/`.

> **Zanim zdeployujesz:** sprawdź, czy na `gh-pages` nie ma poprawek, których nie
> ma w źródle — deploy nadpisuje ten branch w całości i takie zmiany przepadają.

```bash
git fetch origin
git diff origin/main:public/questions.json origin/gh-pages:questions.json
```
