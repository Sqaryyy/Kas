import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero {
          min-height: 92vh;
          padding: 80px 5vw 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: visible;
        }

        /* ── Background blobs ── */
        .hero-blob-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }
        .hero-blob-1 {
          width: 500px;
          height: 500px;
          background: var(--orange-300);
          top: -100px;
          right: 10%;
        }
        .hero-blob-2 {
          width: 400px;
          height: 400px;
          background: #9de8c4;
          bottom: -50px;
          right: 30%;
        }

        /* ── Left column ── */
        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--yellow-500);
          border: var(--border);
          border-radius: 999px;
          padding: 6px 16px;
          font-family: var(--font-d);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
          box-shadow: 2px 2px 0 #1A1108;
        }

        .hero-eyebrow-blink {
          width: 8px;
          height: 8px;
          background: var(--ink);
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-title {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: -0.025em;
          margin-bottom: 28px;
        }

        .hero-title-highlight {
          position: relative;
          display: inline-block;
        }

        .hero-title-highlight::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 12px;
          background: var(--yellow-500);
          z-index: -1;
          border-radius: 2px;
        }

        .hero-sub {
          font-size: 1.15rem;
          color: var(--ink-60);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 480px;
        }

        .hero-sub strong {
          color: var(--ink);
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          padding: 4px;
        }

        /* ── Shared button base ── */
        .btn {
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
        }

        .btn-big {
          background: var(--orange-500);
          color: white;
          padding: 18px 40px;
          font-size: 1.1rem;
          box-shadow: 4px 4px 0 #1A1108 !important;
        }

        .btn-big:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 8px 0 #1A1108 !important;
}

        .btn-outline {
          background: transparent;
          color: var(--ink);
          padding: 18px 40px;
          font-size: 1.1rem;
          box-shadow: 4px 4px 0 #1A1108;
        }

        .btn-outline:hover {
          transform: translate(-2px, -2px);
          background: var(--ink-10);
          box-shadow: 6px 8px 0 #1A1108;
        }

        /* ── Stats ── */
        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 2rem;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--ink-60);
          margin-top: 4px;
        }

        /* ── Right column — photo ── */
        .hero-visual {
          position: relative;
          z-index: 1;
          height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-photo-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          border: var(--border-t);
          box-shadow: 14px 14px 0 #1A1108;
        }

        .hero-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: saturate(0.88);
        }

        /* Warm overlay tint */
        .hero-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(255, 122, 53, 0.15) 0%,
            rgba(255, 248, 240, 0.0) 45%,
            rgba(26, 17, 8, 0.55) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Bottom caption */
        .hero-photo-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 28px;
          background: linear-gradient(to top, rgba(26,17,8,0.88) 0%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }

        .hero-photo-quote {
          font-family: var(--font-b);
          font-style: italic;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.93);
          line-height: 1.5;
          max-width: 260px;
        }

        .hero-photo-quote span {
          display: block;
          font-style: normal;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          margin-top: 5px;
        }

        /* Tag top-left */
        .hero-photo-tag {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 4;
          background: var(--orange-500);
          color: white;
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 999px;
          border: var(--border);
          box-shadow: 3px 3px 0 #1A1108;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 60px 5vw;
          }

          .hero-visual {
            display: none;
          }

          .hero-stats {
            gap: 16px;
          }

          .hero-btns {
            flex-direction: column;
            gap: 12px;
          }

          .btn-big,
          .btn-outline {
            width: 100%;
            justify-content: center;
            padding: 16px 24px;
          }
        }
      `}</style>

      <div className="hero">
        {/* Background blobs — contained so they don't affect button shadows */}
        <div className="hero-blob-container" aria-hidden="true">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
        </div>

        {/* ── Left: Content ── */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-blink" aria-hidden="true" />
            Beograd · Subote 12–16h · Besplatno
          </div>

          <h1 className="hero-title">
            Šta ako
            <br />
            pričaš sa nekim
            <br />
            ko se <span className="hero-title-highlight">ne slaže?</span>
          </h1>

          <p className="hero-sub">
            <strong>Bez debate. Bez svađe.</strong> Samo kafa sa nekim ko misli
            potpuno drugačije. Iznenadi se.
          </p>

          <div className="hero-btns">
            <Link className="btn btn-big" href="#prijava">
              Prijavi se besplatno 🔥
            </Link>
            <Link className="btn btn-outline" href="#kako">
              Kako to izgleda? →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">18–26</span>
              <span className="stat-label">godina</span>
            </div>
            <div className="stat">
              <span className="stat-num">☕</span>
              <span className="stat-label">kafić, ne predavaonica</span>
            </div>
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">besplatno</span>
            </div>
          </div>
        </div>

        {/* ── Right: Photo ── */}
        <div className="hero-visual">
          <div className="hero-photo-frame">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=80"
              alt="Dvoje mladih razgovaraju uz kafu"
              fill
              priority
              sizes="(max-width: 900px) 0px, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "saturate(0.88)",
              }}
            />

            {/* Overlay tint */}
            <div className="hero-photo-overlay" aria-hidden="true" />

            {/* Tag */}
            <div className="hero-photo-tag">☕</div>

            {/* Caption */}
            <div className="hero-photo-caption">
              <blockquote className="hero-photo-quote">
                „Nisam promenio mišljenje. Ali sam razumeo odakle dolazi njeno."
                <span>— Andrej, 26g · posle razgovora</span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
