import {
  Smartphone,
  MessageSquare,
  Rainbow,
  Home,
  Users,
  Globe,
  Briefcase,
  Plus,
} from "lucide-react";
import type { ComponentType } from "react";

interface Topic {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  color: string;
  bg: string;
  title: string;
  hot?: boolean;
}

const TOPICS: Topic[] = [
  {
    icon: Smartphone,
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.15)",
    title: "Treba li zabraniti socijalne mreže za mlađe od 14?",
  },
  {
    icon: MessageSquare,
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.15)",
    title: "Postoji li granica slobode govora?",
  },
  {
    icon: Rainbow,
    color: "#e879f9",
    bg: "rgba(232, 121, 249, 0.15)",
    title: "Kako je biti deo LGBT zajednice u Srbiji?",
  },
  {
    icon: Home,
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.15)",
    title: "Ostati u Srbiji ili se iseliti?",
  },
  {
    icon: Users,
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.15)",
    title: "Kako je biti Rom ili pripadnik manjine u Srbiji danas?",
  },
  {
    icon: Globe,
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.15)",
    title: "Da li Srbija treba da uđe u EU?",
  },
  {
    icon: Briefcase,
    color: "#a78bfa",
    bg: "rgba(167, 139, 250, 0.15)",
    title: "Da li je uspeh stvar rada ili privilegija?",
  },
];

export default function Topics() {
  return (
    <>
      <style>{`
        .topics {
          background: var(--ink);
          padding: 100px 5vw;
        }

        .topics-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange-500);
          color: white;
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

        .topics-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          color: white;
        }

        .topics-lead {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .topic-card {
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 24px 20px;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s, border-color 0.15s;
        }

        .topic-card:hover {
          transform: translate(-3px, -3px);
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .topic-card-mystery {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .topic-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          margin-bottom: 14px;
          transition: transform 0.15s;
        }

        .topic-card:hover .topic-icon-wrap {
          transform: scale(1.1);
        }

        .topic-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
          line-height: 1.3;
        }

        .topic-hot {
          display: inline-block;
          margin-top: 8px;
          background: var(--orange-500);
          color: white;
          font-family: var(--font-d);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
        }

        .topics-scroll-hint {
          display: none;
        }

        .topics-scroll-wrapper {
          position: relative;
        }

        @media (max-width: 640px) {
          .topics {
            padding: 60px 0 60px 5vw;
          }

          .topics-scroll-hint {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.75rem;
            font-family: var(--font-d);
            margin-bottom: 12px;
            animation: nudge 1.5s ease-in-out infinite;
          }

          @keyframes nudge {
            0%, 100% { transform: translateX(0); }
            50%       { transform: translateX(6px); }
          }

          .topics-scroll-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 100%;
            background: linear-gradient(to right, transparent, var(--ink));
            pointer-events: none;
            z-index: 2;
          }

          .topics-grid {
            display: flex;
            overflow-x: auto;
            gap: 12px;
            padding-right: 5vw;
            padding-bottom: 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .topics-grid::-webkit-scrollbar {
            display: none;
          }

          .topic-card {
            flex: 0 0 72vw;
            scroll-snap-align: start;
          }
        }
      `}</style>

      <section className="topics" id="teme">
        <div className="topics-tag">Teme razgovora</div>
        <h2 className="topics-heading">O čemu ćete pričati?</h2>
        <p className="topics-lead">
          Pitanja bez lakih odgovora. Tačno onakva kakva treba da budu.
        </p>

        <p className="topics-scroll-hint" aria-hidden="true">
          Prevuci →
        </p>

        <div className="topics-scroll-wrapper">
          <div className="topics-grid">
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              return (
                <div className="topic-card" key={topic.title}>
                  <div
                    className="topic-icon-wrap"
                    aria-hidden="true"
                    style={{ background: topic.bg }}
                  >
                    <Icon size={24} strokeWidth={1.75} color={topic.color} />
                  </div>
                  <div className="topic-title">{topic.title}</div>
                  {topic.hot && <div className="topic-hot">Vruće pitanje</div>}
                </div>
              );
            })}

            {/* Mystery card */}
            <div className="topic-card topic-card-mystery">
              <div
                className="topic-icon-wrap"
                aria-hidden="true"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <Plus
                  size={24}
                  strokeWidth={1.75}
                  color="rgba(255,255,255,0.5)"
                />
              </div>
              <div className="topic-title">I još tema...</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
