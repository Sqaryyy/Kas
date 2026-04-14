"use client";

interface Props {
  field: string;
  value: string;
  onChange: (field: string, val: string) => void;
  options: string[];
}

export default function QuestionChoice({
  field,
  value,
  onChange,
  options,
}: Props) {
  return (
    <div className="choice-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`choice-btn${value === opt ? " active" : ""}`}
          onClick={() => onChange(field, opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
