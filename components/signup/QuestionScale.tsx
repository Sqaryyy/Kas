"use client";

interface Props {
  field: string;
  value: string;
  onChange: (field: string, val: string) => void;
  labels?: [string, string];
  allLabels?: [string, string, string, string, string];
}

export default function QuestionScale({
  field,
  value,
  onChange,
  labels,
  allLabels,
}: Props) {
  return (
    <div className="scale-wrap">
      {allLabels ? (
        // 5-label mode: each button gets its own label below
        <div className="scale-all-labels">
          {allLabels.map((lbl, i) => {
            const val = String(i + 1);
            return (
              <button
                key={val}
                type="button"
                className={`scale-all-btn${value === val ? " active" : ""}`}
                onClick={() => onChange(field, val)}
              >
                <span className="scale-all-num">{val}</span>
                <span className="scale-all-lbl">{lbl}</span>
              </button>
            );
          })}
        </div>
      ) : (
        // Standard endpoint-labels mode
        <>
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
        </>
      )}

      <style>{`
        .scale-all-labels {
          display: flex;
          gap: 8px;
        }

        .scale-all-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 6px;
          border: var(--border);
          border-radius: 14px;
          background: white;
          cursor: pointer;
          transition: background 0.12s, box-shadow 0.12s, transform 0.12s;
          font-family: var(--font-b);
        }

        .scale-all-btn:hover {
          background: var(--orange-100);
        }

        .scale-all-btn.active {
          background: var(--orange-500);
          color: white;
          box-shadow: 3px 3px 0 var(--ink);
          transform: translate(-1px, -1px);
        }

        .scale-all-num {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.1rem;
        }

        .scale-all-lbl {
          font-size: 0.65rem;
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
          color: inherit;
        }

        @media (max-width: 600px) {
          .scale-all-labels {
            flex-direction: column;
            gap: 6px;
          }

          .scale-all-btn {
            flex-direction: row;
            justify-content: flex-start;
            gap: 12px;
            padding: 10px 14px;
          }

          .scale-all-lbl {
            text-align: left;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
