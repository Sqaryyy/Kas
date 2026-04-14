"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FormData, DATES, PREVIEW_QUESTIONS } from "./signupTypes";

interface Props {
  form: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onStart: () => void;
}

type Errors = Partial<Record<keyof FormData, string>>;

function validate(form: FormData): Errors {
  const errors: Errors = {};
  const nameRx = /^[A-Za-zÀ-žČčĆćDždžŠšŽž\s'-]{2,}$/;

  if (!form.ime) errors.ime = "Ime je obavezno";
  else if (!nameRx.test(form.ime))
    errors.ime = "Unesite ispravno ime (min. 2 slova)";

  if (!form.prezime) errors.prezime = "Prezime je obavezno";
  else if (!nameRx.test(form.prezime))
    errors.prezime = "Unesite ispravno prezime (min. 2 slova)";

  if (!form.email) errors.email = "Email je obavezan";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Unesite ispravnu email adresu";

  if (form.telefon) {
    const tel = form.telefon.replace(/\s+/g, "");
    if (!/^(\+3816[0-9]{7,8}|06[0-9]{7,8})$/.test(tel))
      errors.telefon = "Format: +381 6x xxx xxxx ili 06x xxxxxxx";
  }

  const age = Number(form.godine);
  if (!form.godine) errors.godine = "Godine su obavezne";
  else if (!Number.isInteger(age) || age < 18 || age > 25)
    errors.godine = "Starost mora biti između 18 i 25";

  if (!form.grad) errors.grad = "Izaberite grad";

  if (!form.datum) errors.datum = "Izaberite datum";

  return errors;
}

export default function SignupIntro({ form, onChange, onStart }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setTouched((prev) => new Set(prev).add(e.target.name));
  }

  function showError(field: keyof FormData): string | undefined {
    if (submitAttempted || touched.has(field)) return errors[field];
  }

  function handleSubmit() {
    setSubmitAttempted(true);
    if (hasErrors) return;
    onStart();
  }

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <style>{`
        .intro-outer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        .intro-heading {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .intro-lead-text {
          font-size: 1.1rem;
          color: var(--ink-60);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 40px;
        }

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
          cursor: default;
          pointer-events: none;
          font-family: var(--font-b);
        }

        .q-vote-yes { background: var(--mint-100); color: var(--mint-700); }
        .q-vote-no  { background: var(--orange-100); color: var(--orange-700); }

        .qp-footer {
          font-size: 0.8rem;
          color: var(--ink-60);
          margin-top: 12px;
        }

        .intro-form-card {
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

        .field-error {
          font-size: 0.78rem;
          color: #c0392b;
          font-family: var(--font-d);
          font-weight: 600;
          margin-top: 4px;
        }

        .form-input.has-error,
        .form-select.has-error {
          border-color: #c0392b;
          box-shadow: 4px 4px 0 #f5c6c6;
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

        @media (max-width: 900px) {
          .intro-outer {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .questions-preview {
            display: none;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="intro-outer">
        {/* ── Left: explanation + preview ── */}
        <div>
          <h2 className="intro-heading">
            Rezerviši
            <br />
            svoje mesto.
          </h2>
          <p className="intro-lead-text">
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
            <p className="qp-footer">+ još pitanja · ~3–5 minuta</p>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="intro-form-card">
          <h3 className="form-title">Prijava</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="ime">
                Ime
              </label>
              <input
                className={`form-input${showError("ime") ? " has-error" : ""}`}
                id="ime"
                name="ime"
                type="text"
                placeholder="Stefan"
                value={form.ime}
                onChange={onChange}
                onBlur={handleBlur}
              />
              {showError("ime") && (
                <p className="field-error">{showError("ime")}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="prezime">
                Prezime
              </label>
              <input
                className={`form-input${showError("prezime") ? " has-error" : ""}`}
                id="prezime"
                name="prezime"
                type="text"
                placeholder="Kovačević"
                value={form.prezime}
                onChange={onChange}
                onBlur={handleBlur}
              />
              {showError("prezime") && (
                <p className="field-error">{showError("prezime")}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className={`form-input${showError("email") ? " has-error" : ""}`}
              id="email"
              name="email"
              type="email"
              placeholder="stefan@example.com"
              value={form.email}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {showError("email") && (
              <p className="field-error">{showError("email")}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="telefon">
              Kontakt telefon
            </label>
            <input
              className={`form-input${showError("telefon") ? " has-error" : ""}`}
              id="telefon"
              name="telefon"
              type="tel"
              placeholder="+381 60 123 4567"
              value={form.telefon}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {showError("telefon") && (
              <p className="field-error">{showError("telefon")}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="godine">
                Godine
              </label>
              <input
                className={`form-input${showError("godine") ? " has-error" : ""}`}
                id="godine"
                name="godine"
                type="number"
                placeholder="22"
                min={18}
                max={25}
                value={form.godine}
                onChange={onChange}
                onBlur={handleBlur}
              />
              {showError("godine") && (
                <p className="field-error">{showError("godine")}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="grad">
                Grad
              </label>
              <select
                className={`form-select${showError("grad") ? " has-error" : ""}`}
                id="grad"
                name="grad"
                value={form.grad}
                onChange={onChange}
                onBlur={handleBlur}
              >
                <option value="">Izaberi grad...</option>
                <option value="Beograd">Beograd ✓ (dostupno)</option>
                <option value="Novi Sad" disabled>
                  Novi Sad (uskoro)
                </option>
                <option value="Niš" disabled>
                  Niš (uskoro)
                </option>
              </select>
              {showError("grad") && (
                <p className="field-error">{showError("grad")}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="datum">
              Datum
            </label>
            <select
              className={`form-select${showError("datum") ? " has-error" : ""}`}
              id="datum"
              name="datum"
              value={form.datum}
              onChange={onChange}
              onBlur={handleBlur}
            >
              <option value="">Izaberi subotu...</option>
              {DATES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {showError("datum") && (
              <p className="field-error">{showError("datum")}</p>
            )}
          </div>

          <button className="btn-submit" type="button" onClick={handleSubmit}>
            Nastavi na pitanja →
          </button>

          <p className="form-footnote">
            Svi podaci prikupljeni tokom prijave koriste se samo za potrebe
            projekta, ne dele se sa trećim licima i ne koriste se u marketinške
            svrhe van projekta.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
