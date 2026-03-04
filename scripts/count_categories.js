const fs = require('fs');
const p = 'public/questions.json';
try {
  const data = JSON.parse(fs.readFileSync(p,'utf8'));
  const q = data.questions || [];
  console.log('questions:', q.length);
  const limits = { all: 0 };
  q.forEach((item) => {
    const cats = Array.isArray(item.category) ? item.category : [item.category];
    if (cats.includes('81')) {
      limits['81'] = (limits['81'] || 0) + 1;
      return;
    }
    limits.all = (limits.all || 0) + 1;
    cats.forEach((c) => {
      limits[c] = (limits[c] || 0) + 1;
    });
  });
  console.log(JSON.stringify(limits, null, 2));
} catch (err) {
  console.error('Error reading file', err.message);
  process.exit(1);
}
