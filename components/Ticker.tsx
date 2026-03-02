const TICKER_ITEMS = [
  "Za ili protiv ulaska Srbije u EU?",
  "Da li sloboda govora ima granicu?",
  "Da li je naš život moguć bez interneta?",
  "Dođi da se ne složimo",
  "Subotom od 12 do 16h",
];

export default function Ticker() {
  // Duplicate items so the loop is seamless
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <style>{`
        .ticker-wrap {
          background: var(--orange-500);
          border-top: var(--border);
          border-bottom: var(--border);
          overflow: hidden;
          padding: 14px 0;
        }

        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker 25s linear infinite;
          white-space: nowrap;
          width: max-content;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .ticker-item {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 1rem;
          color: white;
          padding: 0 32px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0;
        }

        .ticker-sep {
          color: rgba(255, 255, 255, 0.5);
          margin: 0 8px;
        }

        @keyframes ticker {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {items.map((item, i) => (
            <span className="ticker-item" key={i}>
              {item}
              <span className="ticker-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
