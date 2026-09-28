function SplitText({ text, as: Tag = "span", active = false, className = "" }) {
  const chars = String(text).split("");

  return (
    <Tag className={`split-text ${active ? "is-on" : ""} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, index) => (
          <span key={index} className="split-char" style={{ "--i": index }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Tag>
  );
}

export default SplitText;