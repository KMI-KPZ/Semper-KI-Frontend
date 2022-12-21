import React from "react";
import { IGuideQuestion, IGuideQuestionOption } from "./Interface";

interface Props {
  question: IGuideQuestion;
  activeQuestion: number;
  selected: number | undefined;
  selectOption(questionId: number, optionId: number): void;
}

const GuideQuestion = ({
  question,
  activeQuestion,
  selected,
  selectOption,
}: Props) => {
  return (
    <div
      className={`guide-question ${
        activeQuestion < question.id ? "passiv" : ""
      }`}
    >
      <h2 className="guide-question-headline">{question.title}</h2>
      <div className="guide-question-options">
        {question.options.map((option: IGuideQuestionOption, index: number) => (
          <div
            onClick={() => selectOption(question.id, option.id)}
            className={`guide-question-option ${
              activeQuestion === question.id ||
              (selected !== undefined && selected === option.id)
                ? "selected"
                : ""
            }`}
            key={index}
          >
            {option.text}
            {option.value !== null ? question.unit : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideQuestion;
