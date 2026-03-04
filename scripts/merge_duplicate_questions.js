const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'questions.json');
if (!fs.existsSync(filePath)) {
  console.error('questions.json not found at', filePath);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);
const questions = data.questions || [];

function normText(s) {
  if (!s) return '';
  return String(s).replace(/\s+/g, ' ').trim().toLowerCase();
}

// Group by normalized question text
const groups = new Map();
questions.forEach((q, idx) => {
  const key = normText(q.question);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({ q, idx });
});

const indicesToRemove = new Set();
let mergedCount = 0;

for (const [key, arr] of groups.entries()) {
  if (arr.length <= 1) continue;
  mergedCount += arr.length - 1;
  // keep first, merge categories from all
  const first = arr[0].q;
  const allCats = new Set();
  arr.forEach(({ q }) => {
    const cats = Array.isArray(q.category) ? q.category : [q.category];
    cats.forEach((c) => allCats.add(String(c)));
  });
  first.category = Array.from(allCats);
  // mark others for removal (by index)
  arr.slice(1).forEach(({ idx }) => indicesToRemove.add(idx));
}

if (indicesToRemove.size === 0) {
  console.log('No duplicates to merge.');
  process.exit(0);
}

// Create backup
const bakPath = filePath + '.bak.' + Date.now();
fs.writeFileSync(bakPath, raw, 'utf8');
console.log('Backup written to', bakPath);

// Build new questions array keeping original order but skipping removed indices
const newQuestions = questions.filter((_, idx) => !indicesToRemove.has(idx));

const newData = { ...data, questions: newQuestions };
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
console.log('Merged duplicates:', mergedCount);
console.log('Updated', filePath, 'with', newQuestions.length, 'questions (was', questions.length, ')');
