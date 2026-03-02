const ARTICLES = [
  {
    id: 1,
    category: "Razgovor",
    date: "15. mart 2025",
    title:
      "Zašto mladi sve više izbegavaju razgovor sa onima koji misle drugačije?",
    excerpt:
      "Algoritmi nas zatvaraju u mehure. Ali šta se desi kad izađeš iz svog? Razgovarali smo sa učesnicima prvog dijaloga mladih.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    tagColor: "var(--lilac-500)",
    category_color: "var(--lilac-500)",
  },
  {
    id: 2,
    category: "Iz zajednice",
    date: "8. mart 2025",
    title: '„Nisam očekivao da ćemo se složiti ni oko čega — ali jesmo."',
    excerpt:
      "Marko i Jovana su sedeli jedno naspram drugog sa potpuno suprotnim stavovima o EU. Ovo je njihova priča.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    tagColor: "var(--orange-500)",
    category_color: "var(--orange-500)",
  },
  {
    id: 3,
    category: "Istraživanje",
    date: "1. mart 2025",
    title: "Koliko zapravo znamo o stavovima svojih vršnjaka?",
    excerpt:
      "Pitali smo 200 mladih da pogode šta njihovi prijatelji misle o ključnim temama. Rezultati su bili iznenađujući.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    tagColor: "var(--mint-700)",
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
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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
                  <img src={article.image} alt={article.title} />
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
                  <p className="news-card-excerpt">{article.excerpt}</p>
                  <a className="news-card-link" href="#">
                    Pročitaj više →
                  </a>
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
