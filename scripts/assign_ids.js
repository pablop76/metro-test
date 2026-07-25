/**
 * Nadaje trwałe identyfikatory pytaniom w public/questions.json.
 *
 * Dlaczego: statystyki, gwiazdki i tryb trudnych pytań kluczowały pytania po
 * treści. W bazie jest 35 pytań (w 6 grupach) o identycznej treści, ale z różnymi
 * obrazkami i różnymi poprawnymi odpowiedziami (np. "Opisz symbole" × 17) —
 * dzieliły jeden wpis statystyk. Do tego każda poprawka literówki kasowała postęp.
 *
 * Skrypt jest idempotentny: nadaje id tylko pytaniom, które go nie mają,
 * numerując od najwyższego istniejącego. Istniejących id nigdy nie zmienia.
 *
 * Użycie:  node scripts/assign_ids.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "public", "questions.json");
const ID_PATTERN = /^q(\d+)$/;

// Kolejność kluczy w zapisywanym pytaniu — id na początku, reszta jak dotąd
const KEY_ORDER = ["id", "question", "content", "correct", "image", "category"];

const raw = fs.readFileSync(FILE, "utf8");
const data = JSON.parse(raw);
const questions = data.questions;

if (!Array.isArray(questions) || questions.length === 0) {
  console.error("Brak pytań w pliku — przerywam.");
  process.exit(1);
}

// Najwyższy numer już użyty (żeby nie nadpisać istniejących id)
let maxNum = 0;
questions.forEach((q) => {
  const m = typeof q.id === "string" && q.id.match(ID_PATTERN);
  if (m) maxNum = Math.max(maxNum, Number(m[1]));
});

let assigned = 0;
const withIds = questions.map((q) => {
  const next = { ...q };
  if (!next.id) {
    maxNum += 1;
    next.id = "q" + String(maxNum).padStart(3, "0");
    assigned += 1;
  }
  // Przepisanie w ustalonej kolejności kluczy (pola nieznane trafiają na koniec)
  const ordered = {};
  KEY_ORDER.forEach((k) => {
    if (next[k] !== undefined) ordered[k] = next[k];
  });
  Object.keys(next).forEach((k) => {
    if (!(k in ordered)) ordered[k] = next[k];
  });
  return ordered;
});

// Walidacja: id musi być unikalne i obecne wszędzie
const seen = new Map();
withIds.forEach((q, i) => {
  if (!q.id) {
    console.error(`Pytanie #${i} nie dostało id — przerywam.`);
    process.exit(1);
  }
  if (seen.has(q.id)) {
    console.error(`Duplikat id ${q.id} (pytania #${seen.get(q.id)} i #${i}) — przerywam.`);
    process.exit(1);
  }
  seen.set(q.id, i);
});

data.questions = withIds;
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");

console.log(`Pytań w bazie:     ${withIds.length}`);
console.log(`Nadano nowych id:  ${assigned}`);
console.log(`Zachowano id:      ${withIds.length - assigned}`);
console.log(`Zakres:            ${withIds[0].id} … ${withIds[withIds.length - 1].id}`);
