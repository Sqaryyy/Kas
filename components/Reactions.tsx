interface Reaction {
  text: string;
  name: string;
  info: string;
  avatar: string;
  bgColor?: string;
}

const REACTIONS: Reaction[] = [
  {
    text: "Došao sam jer me zanima kako neko može biti protiv EU. Otišao sam kući sa mnogo manje sigurnosti u sopstvene stavove. I to je bila poenta.",
    name: "Stefan K.",
    info: "24g · student prava",
    avatar: "👨",
  },
  {
    text: "Mislila sam da će biti awkward. Bilo je — prvih 5 minuta. A posle smo razgovarali 3 sata i zaboravili da je trebalo da idemo.",
    name: "Milica T.",
    info: "21g · grafički dizajn",
    avatar: "👩",
    bgColor: "var(--mint-100)",
  },
  {
    text: "Nisam promenio mišljenje. Ali sam razumeo odakle dolazi to njeno. To je bio cilj, zar ne?",
    name: "Andrej M.",
    info: "26g · novinar",
    avatar: "🧑",
    bgColor: "var(--lilac-100)",
  },
];

export default function Reactions() {
  return (
    <>
      <style>{`
        .reactions {
          background: var(--orange-100);
          border-top: var(--border);
          border-bottom: var(--border);
          padding: 100px 5vw;
        }

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

        .reactions-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .reactions-lead {
          font-size: 1.1rem;
          color: var(--ink-60);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        .reactions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .reaction-card {
          background: white;
          border: var(--border);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 5px 5px 0 var(--ink);
          position: relative;
        }

        .reaction-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 24px;
          font-family: var(--font-d);
          font-size: 5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--orange-300);
        }

        .reaction-text {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 20px;
          padding-top: 24px;
        }

        .reaction-person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reaction-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          background: var(--cream);
          flex-shrink: 0;
        }

        .reaction-name {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .reaction-info {
          font-size: 0.8rem;
          color: var(--ink-60);
        }
      `}</style>

      <section className="reactions">
        <div className="section-tag">Šta kažu učesnici?</div>
        <h2 className="reactions-heading">
          Nismo se složili.
          <br />I to je bilo odlično.
        </h2>
        <p className="reactions-lead">Reakcije posle prvog pilot događaja.</p>

        <div className="reactions-grid">
          {REACTIONS.map((reaction) => (
            <blockquote
              className="reaction-card"
              key={reaction.name}
              style={
                reaction.bgColor ? { background: reaction.bgColor } : undefined
              }
            >
              <p className="reaction-text">{reaction.text}</p>
              <footer className="reaction-person">
                <div className="reaction-avatar" aria-hidden="true">
                  {reaction.avatar}
                </div>
                <div>
                  <div className="reaction-name">{reaction.name}</div>
                  <div className="reaction-info">{reaction.info}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
