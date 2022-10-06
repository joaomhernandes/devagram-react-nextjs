export default function Button({
  type = "button",
  text,
  color = "primaria",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`btn ${color}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
