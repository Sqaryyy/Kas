interface Step {
  num: string;
  emoji: string;
  title: string;
  text: string;
  accentColor: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    emoji: "📝",
    title: "Prijavi se online",
    text: "Popuniš par pitanja o temama koje te zanimaju. To nam pomaže da te spojimo sa osobom koja misli drugačije.",
    accentColor: "var(--orange-500)",
  },
  {
    num: "02",
    emoji: "📅",
    title: "Izaberi datum",
    text: "Odaberi subotu koja ti odgovara. Događaj traje 12–16h, dođi kad ti odgovara.",
    accentColor: "var(--mint-500)",
  },
  {
    num: "03",
    emoji: "☕",
    title: "Dođi u kafić",
    text: "Nema bine ni mikrofona. Samo stol, kafa i neko ko vidi svet potpuno drugačije od tebe.",
    accentColor: "var(--yellow-500)",
  },
  {
    num: "04",
    emoji: "💬",
    title: "Razgovarajte",
    text: "Uz pomoć starter kartice pokreneš temu. Odatle — videćeš. Možda se ni malo ne složite. I to je OK.",
    accentColor: "var(--lilac-500)",
  },
];

export default function HowItWorks() {
  return (
    <>
      <style>{`
        .how {
          background: var(--warm-white);
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

        .how-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .how-lead {
          font-size: 1.1rem;
          color: var(--ink-60);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .step {
          background: white;
          border: var(--border);
          border-radius: 24px;
          padding: 32px 28px;
          box-shadow: 5px 5px 0 var(--ink);
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .step:hover {
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0 var(--ink);
        }

        .step-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
        }

        .step-num {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 3.5rem;
          line-height: 1;
          color: var(--ink-10);
          margin-bottom: 12px;
        }

        .step-emoji {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }

        .step-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .step-text {
          font-size: 0.9rem;
          color: var(--ink-60);
          line-height: 1.6;
        }
      `}</style>

      <section className="how" id="kako">
        <div className="section-tag">Kako funkcioniše?</div>
        <h2 className="how-heading">
          Četiri koraka do
          <br />
          pravog razgovora.
        </h2>
        <p className="how-lead">
          Bez komplikovanih procedura. Prijaviš se, dođeš, razgovaraš.
        </p>

        <div className="steps">
          {STEPS.map((step) => (
            <div className="step" key={step.num}>
              <div
                className="step-accent"
                style={{ background: step.accentColor }}
                aria-hidden="true"
              />
              <div className="step-num" aria-hidden="true">
                {step.num}
              </div>
              <div className="step-emoji" aria-hidden="true">
                {step.emoji}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
