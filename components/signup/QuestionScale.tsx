"use client";

interface Props {
  field: string;
  value: string;
  onChange: (field: string, val: string) => void;
  labels?: [string, string];
}

export default function QuestionScale({
  field,
  value,
  onChange,
  labels,
}: Props) {
  return (
    <div className="scale-wrap">
      {labels && (
        <div className="scale-labels">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
      )}
      <div className="scale-buttons">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`scale-btn${value === String(n) ? " active" : ""}`}
            onClick={() => onChange(field, String(n))}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
