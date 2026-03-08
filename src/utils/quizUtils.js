/**
 * Losuje `counter` pytań z tablicy bez powtórzeń (Fisher-Yates shuffle variant)
 * @param {Array} arr - tablica pytań
 * @param {number} counter - ile pytań wylosować
 * @returns {Array|null} - wylosowana tablica lub null przy błędzie
 */
export const draw = (arr, counter) => {
  const arr2 = [...arr];
  const result = [];
  if (arr2.length < counter) {
    return null;
  }
  for (let i = 0; i < counter; i++) {
    const index = Math.floor(Math.random() * arr2.length);
    result.push(arr2[index]);
    arr2.splice(index, 1);
  }
  return result;
};

/**
 * Oblicza procent poprawnych odpowiedzi
 */
export const getScorePercentage = (correct, total) =>
  total > 0 ? Math.round((correct / total) * 100) : 0;
