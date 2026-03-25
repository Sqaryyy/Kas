import Link from "next/link";
import Footer from "./Footer";

export default function OPlatformi() {
  return (
    <>
      <style>{`
        .about {
          background: var(--warm-white);
          min-height: 100vh;
        }

        /* ── Nav bar ── */
        .about-nav {
          padding: 24px 5vw;
          border-bottom: var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .about-nav-logo {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--ink);
          text-decoration: none;
        }

        .about-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--ink);
          text-decoration: none;
          border: var(--border);
          border-radius: 999px;
          padding: 8px 20px;
          transition: box-shadow 0.12s, transform 0.12s;
          background: white;
        }

        .about-nav-back:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 var(--ink);
        }

        /* ── Content section ── */
        .about-content {
          background: white;
          border-top: var(--border);
          border-bottom: var(--border);
          padding: 80px 5vw;
        }

        .about-content-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: start;
        }

        .about-content-label {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-60);
          position: sticky;
          top: 32px;
        }

        .about-body {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-paragraph {
          font-size: 1.1rem;
          color: var(--ink);
          line-height: 1.8;
        }

        .about-paragraph strong {
          font-family: var(--font-d);
          font-weight: 800;
          color: var(--ink);
        }

        /* ── KAS card ── */
        .about-kas-card {
          background: var(--warm-white);
          border: var(--border);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 6px 6px 0 var(--ink);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-kas-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange-100);
          color: var(--orange-700);
          font-family: var(--font-d);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--orange-300);
          width: fit-content;
        }

        .about-kas-name {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--ink);
          line-height: 1.3;
        }

        .about-kas-text {
          font-size: 0.92rem;
          color: var(--ink-60);
          line-height: 1.7;
        }

        .about-kas-text a {
          color: var(--ink);
          font-weight: 700;
          text-decoration: underline;
          text-decoration-color: var(--orange-500);
          text-underline-offset: 3px;
          transition: color 0.15s;
        }

        .about-kas-text a:hover {
          color: var(--orange-500);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .about-content-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .about-content-label {
            position: static;
          }
        }
      `}</style>

      <div className="about">
        {/* ── Nav ── */}
        <nav className="about-nav">
          <Link href="/" className="about-nav-logo">
            Dođi da se ne složimo
          </Link>
          <Link href="/" className="about-nav-back">
            ← Nazad
          </Link>
        </nav>

        {/* ── Content ── */}
        <div className="about-content">
          <div className="about-content-inner">
            <div className="about-content-label">O projektu</div>

            <div className="about-body">
              <p className="about-paragraph">
                <strong>"Dođi da se ne složimo"</strong> je dijaloški format
                koji okuplja mlade sa različitim stavovima u opuštenom razgovoru
                uz kafu i piće. Cilj je da se ohrabrimo da slušamo, razumemo i
                otvoreno razgovaramo čak i kada se ne slažemo.
              </p>

              <div className="about-kas-card">
                <div className="about-kas-tag">Partner projekta</div>
                <div className="about-kas-name">Fondacija Konrad Adenauer</div>
                <p className="about-kas-text">
                  Projekat realizuje{" "}
                  <a
                    href="https://www.kas.de/sr/web/serbien"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fondacija Konrad Adenauer
                  </a>
                  , posvećena vrednostima slobode, pravde i solidarnosti. Kroz
                  umrežavanje aktivnih i odgovornih ljudi, fondacija podstiče
                  učešće mladih u oblikovanju sopstvene budućnosti i društva
                  koje je pravedno, održivo i efikasno.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
