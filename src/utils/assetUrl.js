/**
 * Buduje adres pliku leżącego w katalogu `public/` z uwzględnieniem ścieżki
 * bazowej aplikacji (`/metro-test/` na GitHub Pages, `/` przy dev serwerze).
 *
 * Zastępuje `process.env.PUBLIC_URL` z czasów Create React App. Uwaga:
 * `import.meta.env.BASE_URL` kończy się ukośnikiem, a ścieżki grafik w bazie
 * pytań zaczynają się od `./` — obie strony trzeba przyciąć, żeby nie skleić
 * adresu z podwójnym ukośnikiem.
 *
 * @param {string} path ścieżka względem public/, np. "questions.json" lub "./images/a.png"
 * @returns {string} pełna ścieżka, np. "/metro-test/images/a.png"
 */
export const assetUrl = (path) => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const clean = String(path).replace(/^\.?\/+/, "");
  return `${base}/${clean}`;
};
