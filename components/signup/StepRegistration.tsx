"use client";

import { FormData, DATES } from "./signupTypes";

interface Props {
  form: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function StepRegistration({ form, onChange }: Props) {
  return (
    <>
      <div className="step-eyebrow">Korak 1 od 2</div>
      <h2 className="step-title">
        Rezerviši
        <br />
        svoje mesto.
      </h2>

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
            onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="telefon">
          Kontakt telefon
        </label>
        <input
          className="form-input"
          id="telefon"
          name="telefon"
          type="tel"
          placeholder="+381 60 123 4567"
          value={form.telefon}
          onChange={onChange}
        />
      </div>

      <div className="form-row">
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
            max={25}
            value={form.godine}
            onChange={onChange}
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
            onChange={onChange}
          >
            <option value="">Izaberi grad...</option>
            <option value="Beograd">Beograd</option>
            <option value="Novi Sad" disabled>
              Novi Sad (uskoro)
            </option>
            <option value="Niš" disabled>
              Niš (uskoro)
            </option>
          </select>
        </div>
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
          onChange={onChange}
        >
          <option value="">Izaberi subotu...</option>
          {DATES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <p className="form-footnote">
        Svi podaci koriste se samo za potrebe projekta i ne dele se sa trećim
        licima.
      </p>
    </>
  );
}
