import Image from "next/image";
import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    slug: "kada-nasilje-postane-normalno",
    category: "Bezbednost",
    date: "15. mart 2025",
    author: "Maša Vračar, alumnistkinja Fondacije Konrad Adenauer",
    title: 'Kada nasilje postane „normalno"',
    excerpt:
      "Scrollujemo kroz snimke tuča, pretnji i govora mržnje kao da su deo svakodnevice. Šta se dešava kada generacija odrasta u atmosferi u kojoj se granica između konflikta i nasilja sve više briše?",
    image: "/ppl.png",
    category_color: "var(--lilac-500)",
  },
  {
    id: 2,
    slug: "ostati-ili-otici",
    category: "Migracije",
    date: "8. mart 2025",
    author: "Maša Vračar, alumnistkinja Fondacije Konrad Adenauer",
    title: "Ostati ili otići?",
    excerpt:
      '„Čim završim fakultet, idem." Razgovor o odlasku postao je deo svakodnevice mladih u Srbiji. Ali priča o migracijama mnogo je složenija od jednostavne podele na ostati ili otići.',
    image: "/go.png",
    category_color: "var(--orange-500)",
  },
  {
    id: 3,
    slug: "tehnologija-ko-kome-sluzi",
    category: "Tehnologija",
    date: "1. mart 2025",
    author: "Maša Vračar, alumnistkinja Fondacije Konrad Adenauer",
    title: "Tehnologija — ko kome služi?",
    excerpt:
      "Sedamdest dva posto mladih navodi da se često susreće sa lažnim vestima, a 71,9% ne prepoznaje AI-generisani sadržaj. Pitanje više nije da li tehnologija utiče na nas — već ko koga kontroliše.",
    image: "/tech.png",
    category_color: "var(--mint-700)",
  },
];

export default function News() {
  return (
    <>
      <style>{`
        .news {
          background: var(--cream);
          border-top: var(--border);
          padding: 100px 5vw;
        }

        .news-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        .news-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .news-tag {
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
          margin-bottom: 16px;
        }

        .news-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
        }

        .news-all-link {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--ink);
          text-decoration: none;
          border: var(--border);
          border-radius: 999px;
          padding: 10px 24px;
          box-shadow: 3px 3px 0 var(--ink);
          transition: transform 0.12s, box-shadow 0.12s;
          white-space: nowrap;
        }

        .news-all-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--ink);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .news-card {
          background: white;
          border: var(--border);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 7px 7px 0 var(--ink);
          display: flex;
          flex-direction: column;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .news-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 12px 12px 0 var(--ink);
        }

        .news-card-thumb {
          width: 100%;
          height: 240px;
          overflow: hidden;
          border-bottom: var(--border);
          position: relative;
        }

        .news-card-thumb img {
          transition: transform 0.4s ease;
        }

        .news-card:hover .news-card-thumb img {
          transform: scale(1.04);
        }

        .news-card-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .news-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .news-card-category {
          font-family: var(--font-d);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .news-card-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ink-30);
        }

        .news-card-date {
          font-size: 0.78rem;
          color: var(--ink-60);
        }

        .news-card-author {
          font-size: 0.78rem;
          color: var(--ink-60);
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .news-card-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.35;
          margin-bottom: 12px;
          color: var(--ink);
        }

        .news-card-excerpt {
          font-size: 0.9rem;
          color: var(--ink-60);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 24px;
        }

        .news-card-link {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--ink);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.15s;
        }

        .news-card-link:hover {
          gap: 10px;
        }

        .news-mobile-link {
          display: none;
          justify-content: center;
          margin-top: 40px;
        }

        .news-mobile-link a {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--ink);
          text-decoration: none;
          border: var(--border);
          border-radius: 999px;
          padding: 12px 32px;
          box-shadow: 3px 3px 0 var(--ink);
        }

        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .news-grid {
            grid-template-columns: 1fr;
          }

          .news-all-link {
            display: none;
          }

          .news-mobile-link {
            display: flex;
          }
        }
      `}</style>

      <section className="news">
        <div className="news-inner">
          <div className="news-header">
            <div>
              <div className="news-tag">News</div>
              <h2 className="news-heading">Naše priče</h2>
            </div>
            <a className="news-all-link" href="#sve">
              Sve objave →
            </a>
          </div>

          <div className="news-grid">
            {ARTICLES.map((article) => (
              <div className="news-card" key={article.id}>
                <div className="news-card-thumb">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: article.id === 2 ? "60% 27%" : "center",
                    }}
                  />
                </div>
                <div className="news-card-body">
                  <div className="news-card-meta">
                    <span
                      className="news-card-category"
                      style={{ color: article.category_color }}
                    >
                      {article.category}
                    </span>
                    <div className="news-card-dot" />
                    <span className="news-card-date">{article.date}</span>
                  </div>
                  <h3 className="news-card-title">{article.title}</h3>
                  {/* Added Author Name Here */}
                  <div className="news-card-author">{article.author}</div>
                  <p className="news-card-excerpt">{article.excerpt}</p>
                  <Link
                    className="news-card-link"
                    href={`/vesti/${article.slug}`}
                  >
                    Pročitaj više →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="news-mobile-link">
            <a href="#sve">Sve objave →</a>
          </div>
        </div>
      </section>
    </>
  );
}
