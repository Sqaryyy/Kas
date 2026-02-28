interface Topic {
  emoji: string;
  title: string;
  hot?: boolean;
}

const TOPICS: Topic[] = [
  {
    emoji: "🇪🇺",
    title: "Da li Srbija treba da uđe u EU?",
    hot: true,
  },
  {
    emoji: "📱",
    title: "Treba li zabraniti socijalne mreže za mlađe od 14?",
  },
  {
    emoji: "🗣️",
    title: "Postoji li granica slobode govora?",
    hot: true,
  },
  {
    emoji: "🌈",
    title: "Kako je biti deo LGBT zajednice u Srbiji?",
  },
  {
    emoji: "🏠",
    title: "Ostati u Srbiji ili odseliti se?",
  },
  {
    emoji: "🤝",
    title: "Kako je biti Roma u Srbiji danas?",
  },
  {
    emoji: "💼",
    title: "Da li je uspeh stvar rada ili privilegije?",
  },
];

export default function Topics() {
  return (
    <>
      <style>{`
        .topics {
          background: var(--ink);
          padding: 100px 5vw;
        }

        .topics-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange-500);
          color: white;
          font-family: var(--font-d);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          border: var(--border);
          margin-bottom: 20px;
        }

        .topics-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          color: white;
        }

        .topics-lead {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .topic-card {
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 24px 20px;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s, border-color 0.15s;
        }

        .topic-card:hover {
          transform: translate(-3px, -3px);
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--orange-300);
        }

        .topic-card-mystery {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .topic-emoji {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .topic-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
          line-height: 1.3;
        }

        .topic-title-muted {
          color: rgba(255, 255, 255, 0.5);
        }

        .topic-hot {
          display: inline-block;
          margin-top: 8px;
          background: var(--orange-500);
          color: white;
          font-family: var(--font-d);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
        }

        /* ── Mobile horizontal scroll ── */
        .topics-scroll-hint {
          display: none;
        }

        .topics-scroll-wrapper {
          position: relative;
        }

        @media (max-width: 640px) {
          .topics {
            padding: 60px 0 60px 5vw;
          }

          .topics-scroll-hint {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.75rem;
            font-family: var(--font-d);
            margin-bottom: 12px;
            animation: nudge 1.5s ease-in-out infinite;
          }

          @keyframes nudge {
            0%, 100% { transform: translateX(0); }
            50%       { transform: translateX(6px); }
          }

          .topics-scroll-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 100%;
            background: linear-gradient(to right, transparent, var(--ink));
            pointer-events: none;
            z-index: 2;
          }

          .topics-grid {
            display: flex;
            overflow-x: auto;
            gap: 12px;
            padding-right: 5vw;
            padding-bottom: 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .topics-grid::-webkit-scrollbar {
            display: none;
          }

          .topic-card {
            flex: 0 0 72vw;
            scroll-snap-align: start;
          }
        }
      `}</style>

      <section className="topics" id="teme">
        <div className="topics-tag">Teme razgovora</div>
        <h2 className="topics-heading">O čemu ćete pričati?</h2>
        <p className="topics-lead">
          Pitanja bez lakih odgovora. Tačno onakva kakva treba.
        </p>

        <p className="topics-scroll-hint" aria-hidden="true">
          Prevuci →
        </p>

        <div className="topics-scroll-wrapper">
          <div className="topics-grid">
            {TOPICS.map((topic) => (
              <div className="topic-card" key={topic.title}>
                <div className="topic-emoji" aria-hidden="true">
                  {topic.emoji}
                </div>
                <div className="topic-title">{topic.title}</div>
                {topic.hot && <div className="topic-hot">Vruće pitanje</div>}
              </div>
            ))}

            {/* Mystery card */}
            <div className="topic-card topic-card-mystery">
              <div className="topic-emoji" aria-hidden="true">
                ➕
              </div>
              <div className="topic-title topic-title-muted">
                I još... 3 pitanja otkrivamo na licu mesta
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
