const TICKER_ITEMS = [
  "EU ili ne EU?",
  "Sloboda govora ima granicu?",
  "Socijalne mreže za decu?",
  "Beograd → Srbija",
  "Besplatno za sve",
  "Dođi da se ne složimo",
  "12–16h svake subote",
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
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
