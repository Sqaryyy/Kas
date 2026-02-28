import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--cream);
          border-bottom: var(--border);
          padding: 0 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .nav-logo {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.1rem;
          text-decoration: none;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-logo-dot {
          width: 10px;
          height: 10px;
          background: var(--orange-500);
          border-radius: 50%;
          border: var(--border);
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          color: var(--ink-60);
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--ink);
        }

        .btn-cta {
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
          padding: 10px 24px;
          font-size: 0.9rem;
          box-shadow: 4px 4px 0 var(--ink);
        }

        .btn-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 8px 0 var(--ink);
        }

       @media (max-width: 640px) {
      .nav-links {
        display: none;
      }

      .navbar {
        gap: 12px;
      }

      .nav-logo {
        font-size: 0.85rem;
        min-width: 0;        /* allows it to shrink */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .btn-cta {
        padding: 8px 14px;
        font-size: 0.8rem;
        white-space: nowrap;  /* prevents button text wrapping */
        flex-shrink: 0;       /* prevents button from shrinking */
      }
    }
      `}</style>

      <nav className="navbar">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-dot" />
          Dođi da se ne složimo
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="#kako">Kako funkcioniše?</Link>
          </li>
          <li>
            <Link href="#teme">Teme</Link>
          </li>
          <li>
            <Link href="#prijava">Prijavi se</Link>
          </li>
        </ul>

        <Link href="#prijava" className="btn-cta">
          Prijavi se →
        </Link>
      </nav>
    </>
  );
}
