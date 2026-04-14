"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FormData, EMPTY_FORM, STEPS, PROGRESS_STEPS } from "./signupTypes";

import SignupProgress from "./SignupProgress";
import SignupIntro from "./SignupIntro";
import StepQuestions from "./StepQuestions";
import StepDemografija from "./StepDemografija";
import StepDone from "./StepDone";

// ── Slide animation variants ───────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.38,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// ── Main component ─────────────────────────────────────────────────────────
export default function SignupSection() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const currentStep = STEPS[stepIndex];
  const isIntro = currentStep.type === "intro";
  const isDone = currentStep.type === "done";

  // Progress: only count non-intro, non-done steps
  const progressIndex = PROGRESS_STEPS.findIndex(
    (s) => JSON.stringify(s) === JSON.stringify(currentStep),
  );
  const percent =
    progressIndex >= 0
      ? Math.round(((progressIndex + 1) / PROGRESS_STEPS.length) * 100)
      : isDone
        ? 100
        : 0;

  const progressLabel = (() => {
    if (currentStep.type === "demografija") return "Demografija";
    if (currentStep.type === "section") return currentStep.title;
    return "";
  })();

  // ── Field handlers ───────────────────────────────────────────────────────
  function setField(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setField(e.target.name, e.target.value);
  }

  // ── Validation ───────────────────────────────────────────────────────────
  function canProceed(): boolean {
    if (currentStep.type === "section") {
      return currentStep.questions.every(
        (q) => form[q.field as keyof FormData] !== "",
      );
    }
    if (currentStep.type === "demografija") {
      return !!(form.pol && form.godine_grupa && form.obrazovanje);
    }
    return true;
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  function goNext() {
    setDirection(1);
    setStepIndex((i) => i + 1);
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  async function handleNext() {
    if (!canProceed()) return;
    if (STEPS[stepIndex + 1]?.type === "done") {
      await handleSubmit();
    } else {
      goNext();
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Greška");
      setDirection(1);
      setStepIndex(STEPS.findIndex((s) => s.type === "done"));
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Greška pri slanju. Pokušaj ponovo.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .signup {
          background: var(--warm-white);
          border-top: var(--border);
          padding: 100px 5vw;
        }

        .signup-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .signup-inner.is-step {
          max-width: 680px;
        }

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

        /* ── Progress ── */
        .progress-wrap {
          margin-bottom: 40px;
        }
        .progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-family: var(--font-d);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--ink-60);
        }
        .progress-bar-bg {
          background: var(--ink-10);
          border-radius: 999px;
          height: 6px;
          overflow: hidden;
          border: 1px solid var(--ink);
        }
        .progress-bar-fill {
          background: var(--orange-500);
          height: 100%;
          border-radius: 999px;
        }

        /* ── Card ── */
        .step-card {
          background: white;
          border: var(--border-t);
          border-radius: 28px;
          padding: 32px;
          box-shadow: 8px 8px 0 var(--ink);
          overflow: hidden;
        }

        .step-eyebrow {
          font-family: var(--font-d);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--orange-500);
          margin-bottom: 8px;
        }

        .step-title {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        /* ── Intro ── */
        .intro-lead {
          font-size: 1rem;
          color: var(--ink-60);
          line-height: 1.75;
          margin-bottom: 16px;
        }

        .intro-steps {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 28px 0 32px;
          padding: 24px;
          background: var(--warm-white);
          border: var(--border);
          border-radius: 18px;
        }

        .intro-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .intro-step-num {
          min-width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--orange-500);
          color: white;
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--border);
          flex-shrink: 0;
        }

        .intro-step-text {
          font-size: 0.95rem;
          color: var(--ink);
          line-height: 1.5;
          padding-top: 3px;
        }

        /* ── Questions preview (intro card) ── */
        .questions-preview {
          background: white;
          border: var(--border);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 4px 4px 0 var(--ink);
          margin-bottom: 8px;
        }

        .qp-title {
          font-family: var(--font-d);
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }

        .question-item {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          padding-bottom: 14px;
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
          font-size: 1rem;
          color: var(--orange-500);
          min-width: 24px;
        }

        .q-text {
          font-size: 0.88rem;
          color: var(--ink);
          line-height: 1.5;
        }

        .q-votes {
          margin-top: 8px;
          display: flex;
          gap: 8px;
        }

        .q-vote {
          font-size: 0.7rem;
          padding: 3px 12px;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          font-weight: 700;
          cursor: default;
          font-family: var(--font-d);
          pointer-events: none;
        }

        .q-vote-yes { background: var(--mint-100); color: var(--mint-700); }
        .q-vote-no  { background: var(--orange-100); color: var(--orange-700); }

        .qp-footer {
          font-size: 0.78rem;
          color: var(--ink-60);
          margin-top: 14px;
        }

        /* ── Form elements ── */
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

        /* ── Question blocks ── */
        .question-block {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--ink-10);
        }

        .question-block:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .question-label {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 10px;
          color: var(--ink);
        }

        /* ── Scale ── */
        .scale-wrap { display: flex; flex-direction: column; gap: 8px; }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--ink-60);
          font-family: var(--font-d);
          font-weight: 600;
        }

        .scale-buttons { display: flex; gap: 8px; }

        .scale-btn {
          flex: 1;
          aspect-ratio: 1;
          border: var(--border);
          border-radius: 12px;
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 1rem;
          background: white;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.12s, box-shadow 0.12s, transform 0.12s;
        }

        .scale-btn:hover { background: var(--orange-100); }

        .scale-btn.active {
          background: var(--orange-500);
          color: white;
          box-shadow: 3px 3px 0 var(--ink);
          transform: translate(-1px, -1px);
        }

        /* ── Choice ── */
        .choice-wrap { display: flex; flex-direction: column; gap: 6px; }

        .choice-btn {
          width: 100%;
          text-align: left;
          padding: 10px 16px;
          border: var(--border);
          border-radius: 14px;
          font-family: var(--font-b);
          font-size: 0.95rem;
          background: white;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.12s, box-shadow 0.12s, transform 0.12s;
          line-height: 1.4;
        }

        .choice-btn:hover { background: var(--orange-100); }

        .choice-btn.active {
          background: var(--orange-500);
          color: white;
          box-shadow: 3px 3px 0 var(--ink);
          transform: translate(-1px, -1px);
        }

        /* ── Nav ── */
        .step-nav {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          align-items: center;
        }

        .btn-back {
          font-family: var(--font-d);
          font-weight: 700;
          border: var(--border);
          border-radius: 999px;
          cursor: pointer;
          background: white;
          color: var(--ink);
          padding: 16px 28px;
          font-size: 0.95rem;
          transition: box-shadow 0.12s, transform 0.12s;
          white-space: nowrap;
        }

        .btn-back:hover {
          box-shadow: 3px 3px 0 var(--ink);
          transform: translate(-1px, -1px);
        }

        .btn-next {
          font-family: var(--font-d);
          font-weight: 700;
          border: var(--border-t);
          border-radius: 999px;
          cursor: pointer;
          background: var(--orange-500);
          color: white;
          padding: 16px 36px;
          font-size: 1rem;
          flex: 1;
          box-shadow: 5px 5px 0 var(--ink);
          transition: box-shadow 0.12s, transform 0.12s, opacity 0.12s;
        }

        .btn-next:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--ink);
        }

        .btn-next:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .error-msg {
          margin-top: 12px;
          color: #c0392b;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: var(--font-d);
        }

        .form-footnote {
          font-size: 0.8rem;
          color: var(--ink-60);
          text-align: center;
          margin-top: 16px;
          line-height: 1.6;
        }

        /* ── Done ── */
        .done-screen {
          text-align: center;
          padding: 20px 0;
        }

        .done-emoji {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .done-title {
          font-family: var(--font-d);
          font-weight: 800;
          font-size: 2rem;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .done-lead {
          font-size: 1.05rem;
          color: var(--ink-60);
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .step-card { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
          .scale-btn { font-size: 0.85rem; }
        }
      `}</style>

      <section className="signup" id="prijava">
        <div className={`signup-inner${!isIntro ? " is-step" : ""}`}>
          <div className="section-tag">Prijavljivanje</div>

          {/* Progress bar — only during the actual steps */}
          {!isIntro && !isDone && (
            <SignupProgress label={progressLabel} percent={percent} />
          )}

          {/* Intro card */}
          {isIntro && (
            <SignupIntro
              form={form}
              onChange={handleTextChange}
              onStart={goNext}
            />
          )}

          {/* Step card with sliding animation */}
          {!isIntro && !isDone && (
            <div className="step-card">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={stepIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                >
                  {currentStep.type === "section" && (
                    <StepQuestions
                      sectionId={currentStep.id}
                      title={currentStep.title}
                      questions={currentStep.questions}
                      form={form}
                      onField={setField}
                    />
                  )}

                  {currentStep.type === "demografija" && (
                    <StepDemografija
                      form={form}
                      onField={setField}
                      onChange={handleTextChange}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="step-nav">
                {stepIndex > 1 && (
                  <button className="btn-back" type="button" onClick={goBack}>
                    ← Nazad
                  </button>
                )}
                <button
                  className="btn-next"
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                >
                  {submitting
                    ? "Šaljemo..."
                    : currentStep.type === "demografija"
                      ? "Završi prijavu →"
                      : "Nastavi →"}
                </button>
              </div>

              {error && <p className="error-msg">⚠️ {error}</p>}
            </div>
          )}

          {/* Done screen */}
          {isDone && (
            <div className="step-card">
              <StepDone />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
