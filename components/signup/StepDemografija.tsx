"use client";

import { FormData } from "./signupTypes";
import QuestionChoice from "./QuestionChoice";

interface Props {
  form: FormData;
  onField: (field: string, val: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StepDemografija({ form, onField, onChange }: Props) {
  return (
    <>
      <div className="step-eyebrow">Poslednji korak</div>
      <h2 className="step-title">
        Još par
        <br />
        informacija.
      </h2>

      <div className="form-group">
        <label className="form-label">Pol</label>
        <QuestionChoice
          field="pol"
          value={form.pol}
          onChange={onField}
          options={["Muški", "Ženski", "Drugo", "Ne želim da odgovorim"]}
        />
      </div>

      <div className="form-group" style={{ marginTop: 24 }}>
        <label className="form-label">Najviši nivo obrazovanja</label>
        <QuestionChoice
          field="obrazovanje"
          value={form.obrazovanje}
          onChange={onField}
          options={[
            "Srednja škola",
            "Student/studentkinja",
            "Završene osnovne studije",
            "Master studije",
            "Drugo",
          ]}
        />
      </div>

      <div className="form-group" style={{ marginTop: 24 }}>
        <label className="form-label" htmlFor="mesto">
          Mesto stanovanja
        </label>
        <input
          className="form-input"
          id="mesto"
          name="mesto"
          type="text"
          placeholder="npr. Beograd, Vračar"
          value={form.mesto}
          onChange={onChange}
        />
      </div>
    </>
  );
}
