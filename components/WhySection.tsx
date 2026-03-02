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
          gap: 0;
          align-items: center;
        }

        /* ── Image visual ── */
        .why-visual {
          background: var(--ink);
          border: var(--border-t);
          border-radius: 32px;
          padding: 40px;
          box-shadow: 12px 12px 0 var(--orange-500);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-visual-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
          object-fit: contain;
        }

        /* ── Right column ── */
        .why-text {
          padding-left: 120px;
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

          .why-text {
            padding-left: 0;
            padding-top: 40px;
          }
        }
      `}</style>

      <section className="why" id="zasto">
        <div className="why-inner">
          <div className="why-grid">
            {/* ── Left: Image visual ── */}
            <div className="why-visual" aria-hidden="true">
              <img
                src="/slika1.png"
                alt="Ljudi razgovaraju uz kafu"
                className="why-visual-img"
              />
            </div>

            {/* ── Right: Text + points ── */}
            <div className="why-text">
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
