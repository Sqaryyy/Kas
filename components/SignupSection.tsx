"use client";

import { useState } from "react";

const DATES = [
  "Subota, 15. mart — 12–16h",
  "Subota, 22. mart — 12–16h",
  "Subota, 29. mart — 12–16h",
];

interface FormState {
  ime: string;
  prezime: string;
  email: string;
  godine: string;
  grad: string;
  datum: string;
}

const INITIAL_FORM: FormState = {
  ime: "",
  prezime: "",
  email: "",
  godine: "",
  grad: "",
  datum: "",
};

const PREVIEW_QUESTIONS = [
  "Da li Srbija treba da uđe u EU?",
  "Treba li zabraniti socijalne mreže za mlađe od 14 godina?",
  "Da li treba da postoji apsolutna sloboda govora?",
];

export default function Signup() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to backend / form service
    console.log("Form submitted:", form);
  }

  return (
    <>
      <style>{`
        .signup {
          background: var(--warm-white);
          border-top: var(--border);
          padding: 100px 5vw;
        }

        .signup-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Left column ── */
        .section-tag {
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
          margin-bottom: 20px;
        }

        .signup-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .signup-lead {
          font-size: 1.1rem;
          color: var(--ink-60);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        /* ── Questions preview ── */
        .questions-preview {
          background: white;
          border: var(--border);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 6px 6px 0 var(--ink);
        }

        .qp-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .question-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--ink-10);
          align-items: flex-start;
        }

        .question-item:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .q-num {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--orange-500);
          min-width: 28px;
        }

        .q-text {
          font-size: 0.9rem;
          color: var(--ink);
          line-height: 1.5;
        }

        .q-votes {
          margin-top: 6px;
          display: flex;
          gap: 8px;
        }

        .q-vote {
          font-size: 0.7rem;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.1s;
          background: none;
          font-family: var(--font-b);
        }

        .q-vote:hover { opacity: 0.7; }

        .q-vote-yes {
          background: var(--mint-100);
          color: var(--mint-700);
        }

        .q-vote-no {
          background: var(--orange-100);
          color: var(--orange-700);
        }

        .qp-footer {
          font-size: 0.8rem;
          color: var(--ink-60);
          margin-top: 12px;
        }

        /* ── Form ── */
        .signup-form {
          background: white;
          border: var(--border-t);
          border-radius: 28px;
          padding: 40px;
          box-shadow: 8px 8px 0 var(--ink);
        }

        .form-title {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 28px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .form-label {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .form-input,
        .form-select {
          background: white;
          border: var(--border);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: var(--font-b);
          font-size: 1rem;
          color: var(--ink);
          outline: none;
          transition: box-shadow 0.15s, border-color 0.15s;
          appearance: none;
          width: 100%;
        }

        .form-input:focus,
        .form-select:focus {
          box-shadow: 4px 4px 0 var(--orange-500);
          border-color: var(--orange-500);
        }

        .btn-submit {
          font-family: var(--font-d);
          font-weight: 700;
          border: var(--border-t);
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.12s, box-shadow 0.12s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--orange-500);
          color: white;
          padding: 18px 40px;
          font-size: 1.1rem;
          box-shadow: 6px 6px 0 var(--ink);
          width: 100%;
          margin-top: 8px;
        }

        .btn-submit:hover {
          transform: translate(-2px, -2px);
          box-shadow: 10px 12px 0 var(--ink);
        }

        .form-footnote {
          font-size: 0.8rem;
          color: var(--ink-60);
          text-align: center;
          margin-top: 16px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .signup-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="signup" id="prijava">
        <div className="signup-inner">
          {/* ── Left: Info + questions preview ── */}
          <div>
            <div className="section-tag">Prijavljivanje</div>
            <h2 className="signup-heading">
              Rezerviši
              <br />
              svoje mesto.
            </h2>
            <p className="signup-lead">
              Besplatno. Bez obaveze. Samo dođi i razgovaraj.
            </p>

            <div className="questions-preview">
              <div className="qp-title">
                🎯 Primeri pitanja koja ćeš popuniti:
              </div>
              {PREVIEW_QUESTIONS.map((q, i) => (
                <div className="question-item" key={i}>
                  <div className="q-num">{i + 1}</div>
                  <div>
                    <div className="q-text">{q}</div>
                    <div className="q-votes">
                      <button className="q-vote q-vote-yes" type="button">
                        Da ✓
                      </button>
                      <button className="q-vote q-vote-no" type="button">
                        Ne ✗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p className="qp-footer">+ još 7 pitanja · ~3 minute</p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Prijava</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="ime">
                  Ime
                </label>
                <input
                  className="form-input"
                  id="ime"
                  name="ime"
                  type="text"
                  placeholder="Stefan"
                  value={form.ime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="prezime">
                  Prezime
                </label>
                <input
                  className="form-input"
                  id="prezime"
                  name="prezime"
                  type="text"
                  placeholder="Kovačević"
                  value={form.prezime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="stefan@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="godine">
                Godine
              </label>
              <input
                className="form-input"
                id="godine"
                name="godine"
                type="number"
                placeholder="22"
                min={18}
                max={26}
                value={form.godine}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="grad">
                Grad
              </label>
              <select
                className="form-select"
                id="grad"
                name="grad"
                value={form.grad}
                onChange={handleChange}
                required
              >
                <option value="">Izaberi grad...</option>
                <option value="bg">Beograd ✓ (dostupno)</option>
                <option value="ns" disabled>
                  Novi Sad (uskoro)
                </option>
                <option value="nis" disabled>
                  Niš (uskoro)
                </option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="datum">
                Datum
              </label>
              <select
                className="form-select"
                id="datum"
                name="datum"
                value={form.datum}
                onChange={handleChange}
                required
              >
                <option value="">Izaberi subotu...</option>
                {DATES.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-submit" type="submit">
              Nastavi na pitanja →
            </button>

            <p className="form-footnote">
              Besplatno · Tvoji podaci se koriste samo za organizaciju · Uz
              saglasnost
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
