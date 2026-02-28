import Link from "next/link";

export default function CtaBanner() {
  return (
    <>
      <style>{`
        .cta {
          background: var(--yellow-500);
          border-top: var(--border-t);
          padding: 100px 5vw;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-deco {
          position: absolute;
          font-size: 8rem;
          opacity: 0.12;
          pointer-events: none;
          user-select: none;
        }

        .cta-tag {
          display: inline-flex;
          align-items: center;
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
          margin-bottom: 28px;
        }

        .cta-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.0;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }

        .cta-lead {
          font-size: 1.2rem;
          color: var(--ink-60);
          margin-bottom: 40px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .btn-big {
          font-family: var(--font-d);
          font-weight: 700;
          border: var(--border-t);
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.12s, box-shadow 0.12s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--orange-500);
          color: white;
          padding: 18px 40px;
          font-size: 1.1rem;
          box-shadow: 6px 6px 0 var(--ink);
        }

        .btn-big:hover {
          transform: translate(-2px, -2px);
          box-shadow: 10px 12px 0 var(--ink);
        }
      `}</style>

      <section className="cta">
        {/* Decorative background emojis */}
        <div
          className="cta-deco"
          style={{ top: "-20px", left: "2%" }}
          aria-hidden="true"
        >
          ☕
        </div>
        <div
          className="cta-deco"
          style={{ bottom: "-20px", right: "5%" }}
          aria-hidden="true"
        >
          💬
        </div>
        <div
          className="cta-deco"
          style={{ top: "10px", right: "25%" }}
          aria-hidden="true"
        >
          🤝
        </div>

        <div className="cta-tag">Pilot · Beograd</div>

        <h2 className="cta-heading">
          Tvoj sagovornik
          <br />
          te čeka u subotu.
        </h2>

        <p className="cta-lead">
          Jedno prijavljivanje. Jedna kafa. Jedan razgovor koji možda promeni
          kako gledaš na svet.
        </p>

        <Link className="btn-big" href="#prijava">
          Prijavi se besplatno →
        </Link>
      </section>
    </>
  );
}
