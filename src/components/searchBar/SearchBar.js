const SearchBar = ({ value, onChange, disabled, resultCount }) => (
  <div className="search-bar-wrap">
    <div className="search-input-wrap">
      <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Szukaj pytania lub odpowiedzi…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} title="Wyczyść">
          ×
        </button>
      )}
    </div>
    {value.trim() && (
      <p className="search-results-info">
        {resultCount > 0
          ? `${resultCount} pasujących pytań`
          : "Brak wyników — spróbuj innej frazy"}
      </p>
    )}
  </div>
);

export default SearchBar;
