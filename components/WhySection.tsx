interface WhyPoint {
  emoji: string;
  colorClass: string;
  title: string;
  text: string;
}

const WHY_POINTS: WhyPoint[] = [
  {
    emoji: "☕",
    colorClass: "why-icon-o",
    title: "Opuštenost kafića radi",
    text: "Nije konferencija. Nije debatni klub. Kafa menja atmosferu — smanjuje napetost i povećava iskrenost.",
  },
  {
    emoji: "🎯",
    colorClass: "why-icon-m",
    title: "Prave teme, pravi razgovori",
    text: "EU, sloboda govora, manjinska prava — teme koje zaista dele. Ne akademske diskusije.",
  },
  {
    emoji: "🧠",
    colorClass: "why-icon-y",
    title: "Cilj nije ubediti",
    text: "Cilj je razumeti. Ni pobednici ni gubitnici. Samo dvoje ili više ljudi koji su malo bolje razumeli svet.",
  },
  {
    emoji: "🔒",
    colorClass: "why-icon-l",
    title: "Bezbedna atmosfera",
    text: "Psiholozi su prisutni u prostoru. Starter kartica postavlja osnovna pravila razgovora.",
  },
];

interface ChatMessage {
  side: "left" | "right";
  avatar: string;
  text: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    side: "left",
    avatar: "😤",
    text: '„Sloboda govora treba da bude apsolutna. Uvek."',
  },
  {
    side: "right",
    avatar: "🤔",
    text: '„Čekaj, šta bi bio konkretan primer gde se ti ne bi složio s tim?"',
  },
  {
    side: "left",
    avatar: "😤",
    text: '„Hm... OK, ovo je dobar primer. Nisam razmišljao o tome ovako."',
  },
];

export default function Why() {
  return (
    <>
      <style>{`
        .why {
          padding: 100px 5vw;
        }

        .why-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        /* ── Chat visual ── */
        .why-visual {
          background: var(--ink);
          border: var(--border-t);
          border-radius: 32px;
          padding: 48px 40px;
          box-shadow: 12px 12px 0 var(--orange-500);
        }

        .chat {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-time {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 4px;
          text-align: center;
        }

        .msg {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .msg-right {
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .msg-bubble {
          background: rgba(255, 255, 255, 0.12);
          color: white;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.9rem;
          max-width: 240px;
          line-height: 1.5;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .msg-bubble-right {
          background: var(--orange-500);
        }

        .chat-result {
          margin-top: 24px;
          background: var(--mint-500);
          color: var(--ink);
          border-radius: 16px;
          padding: 14px 20px;
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.9rem;
          text-align: center;
          border: var(--border);
        }

        /* ── Right column ── */
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ink);
          color: var(--cream);
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

        .why-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .why-lead {
          font-size: 1.1rem;
          color: var(--ink-60);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        /* ── Why points ── */
        .why-points {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .why-point {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .why-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border: var(--border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          box-shadow: 3px 3px 0 var(--ink);
        }

        .why-icon-o { background: var(--orange-100); }
        .why-icon-m { background: var(--mint-100); }
        .why-icon-y { background: var(--yellow-100); }
        .why-icon-l { background: var(--lilac-100); }

        .why-point-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 4px;
        }

        .why-point-text {
          font-size: 0.9rem;
          color: var(--ink-60);
          line-height: 1.6;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="why" id="zasto">
        <div className="why-inner">
          <div className="why-grid">
            {/* ── Left: Chat visual ── */}
            <div className="why-visual" aria-hidden="true">
              <div className="chat">
                <p className="chat-time">Posle razgovora o slobodi govora...</p>
                {CHAT_MESSAGES.map((msg, i) => (
                  <div
                    className={`msg${msg.side === "right" ? " msg-right" : ""}`}
                    key={i}
                  >
                    <div className="msg-avatar">{msg.avatar}</div>
                    <div
                      className={`msg-bubble${msg.side === "right" ? " msg-bubble-right" : ""}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div className="chat-result">
                  🤝 Nisu se složili — i obojici je bilo super.
                </div>
              </div>
            </div>

            {/* ── Right: Text + points ── */}
            <div>
              <div className="section-tag">Zašto baš ovako?</div>
              <h2 className="why-heading">
                Soba za razgovor
                <br />
                ne postoji.
              </h2>
              <p className="why-lead">
                Živimo u balonima. Pratimo ljude koji misle kao mi. A onda se
                čudimo što jedni druge ne razumemo.
              </p>

              <div className="why-points">
                {WHY_POINTS.map((point) => (
                  <div className="why-point" key={point.title}>
                    <div
                      className={`why-icon ${point.colorClass}`}
                      aria-hidden="true"
                    >
                      {point.emoji}
                    </div>
                    <div>
                      <h3 className="why-point-title">{point.title}</h3>
                      <p className="why-point-text">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
