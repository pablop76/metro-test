const STYLE_LABELS = {
  default: "Styl: Domyślny",
  industrial: "Styl: Industrial",
  retro: "Styl: Retro",
};

const StyleToggle = ({ visualStyle, toggleVisualStyle }) => {
  return (
    <button
      onClick={toggleVisualStyle}
      className="control-btn style-btn"
      title="Przełącz styl interfejsu"
      aria-label="Przełącz styl interfejsu"
    >
      <span>{STYLE_LABELS[visualStyle] || "Styl"}</span>
    </button>
  );
};

export default StyleToggle;
