import { useId, useState } from "react";

type Props = {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (items: string[]) => void;
};

export default function ListEditor({ label, placeholder, items, onChange }: Props) {
  const id = useId();
  const [text, setText] = useState("");

  function add() {
    const t = text.trim();
    if (!t) return;
    onChange([...items, t]);
    setText("");
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={id}>{label}</label>
      <div className="add">
        <input
          id={id}
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <button type="button" className="btn ghost" onClick={add}>Add</button>
      </div>
      <ul className="chips">
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}