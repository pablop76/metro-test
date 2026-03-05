const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'public', 'questions.json');
if (!fs.existsSync(file)) {
  console.error('questions.json not found at', file);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const questions = data.questions || [];

// Normalize question text for comparison: trim, collapse whitespace, lowercase
function normText(s) {
  if (!s) return '';
  return String(s).replace(/\s+/g, ' ').trim().toLowerCase();
}

const mapByText = new Map();
questions.forEach((q, idx) => {
  const key = normText(q.question);
  if (!mapByText.has(key)) mapByText.set(key, []);
  mapByText.get(key).push({ index: idx, question: q });
});

const duplicateGroups = [];
for (const [text, arr] of mapByText.entries()) {
  if (arr.length > 1) {
    duplicateGroups.push({ text, count: arr.length, indices: arr.map((a) => a.index) });
  }
}

const out = {
  totalQuestions: questions.length,
  duplicateGroups: duplicateGroups.length,
  groups: duplicateGroups,
};

const outPath = path.join(__dirname, 'duplicates_report.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

console.log('questions:', questions.length);
console.log('duplicate groups found:', duplicateGroups.length);
if (duplicateGroups.length > 0) console.log('Report written to', outPath);
else console.log('No exact duplicate question texts found.');
