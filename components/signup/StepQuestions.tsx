"use client";

import { FormData, Question } from "./signupTypes";
import QuestionScale from "./QuestionScale";
import QuestionChoice from "./QuestionChoice";

interface Props {
  sectionId: string;
  title: string;
  questions: Question[];
  form: FormData;
  onField: (field: string, val: string) => void;
}

export default function StepQuestions({
  sectionId,
  title,
  questions,
  form,
  onField,
}: Props) {
  return (
    <>
      {questions.map((q) => (
        <div className="question-block" key={q.field}>
          <div className="question-label">{q.label}</div>
          {q.kind === "scale" ? (
            <QuestionScale
              field={q.field}
              value={form[q.field as keyof FormData]}
              onChange={onField}
              labels={q.scaleLabels}
              allLabels={q.allLabels}
            />
          ) : (
            <QuestionChoice
              field={q.field}
              value={form[q.field as keyof FormData]}
              onChange={onField}
              options={q.options}
            />
          )}
        </div>
      ))}
    </>
  );
}
