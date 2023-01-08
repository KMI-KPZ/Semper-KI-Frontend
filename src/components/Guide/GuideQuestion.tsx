import React from "react";
import { IGuideOption, IGuideQuestion } from "./Interface";

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
        {question.options.map((option: IGuideOption, index: number) => (
          <div
            onClick={() => selectOption(question.id, index)}
            className={`guide-question-option ${
              activeQuestion === question.id ||
              (selected !== null && selected === index)
                ? "selected"
                : ""
            }`}
            key={index}
          >
            {`${option.title} ${
              option.answer !== null &&
              option.answer.unit !== null &&
              option.answer.unit !== undefined
                ? option.answer.unit
                : ""
            }`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideQuestion;
