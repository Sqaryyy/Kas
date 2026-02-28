import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  muted?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Projekat",
    links: [
      { label: "O platformi", href: "#" },
      { label: "Kako funkcioniše?", href: "#kako" },
      { label: "Starter kartica", href: "#" },
      { label: "Kontakt", href: "#" },
    ],
  },
  {
    heading: "Gradovi",
    links: [
      { label: "Beograd ✓", href: "#" },
      { label: "Novi Sad (uskoro)", href: "#", muted: true },
      { label: "Niš (uskoro)", href: "#", muted: true },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privatnost", href: "#" },
  { label: "Uslovi korišćenja", href: "#" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: var(--ink);
          color: white;
          padding: 64px 5vw 40px;
          border-top: var(--border-t);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-brand-name {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.4rem;
          margin-bottom: 12px;
        }

        .footer-brand-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
          max-width: 280px;
        }

        .footer-col-heading {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 16px;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-col li {
          margin-bottom: 10px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: var(--orange-300);
        }

        .footer-link-muted {
          opacity: 0.4;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-legal-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal-link:hover {
          color: var(--orange-300);
        }

        .footer-legal-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">Dođi da se ne složimo</div>
            <p className="footer-brand-text">
              Platforma za dijalog mladih. Pilot projekat u Beogradu, a zatim u
              svim gradovima Srbije.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h4 className="footer-col-heading">{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`footer-link${link.muted ? " footer-link-muted" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dođi da se ne složimo</span>
          <nav className="footer-legal" aria-label="Legal links">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="footer-legal">
                <Link href={link.href} className="footer-legal-link">
                  {link.label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span className="footer-legal-sep">·</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
