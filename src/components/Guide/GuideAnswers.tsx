import { log } from "console";
import React from "react";
import { IGuideOption, IGuideQuestion } from "./Interface";

interface Props {
  activeQuestionId: number;
  questions: IGuideQuestion[];
  toggelOption(filterId: number, optionIndex: number): void;
  selectQuestion(): void;
}

const GuideAnswers: React.FC<Props> = ({
  questions,
  activeQuestionId,
  selectQuestion,
  toggelOption,
}) => {
  const handleOnChangeCkeckbox = (filterId: number, optionIndex: number) => {
    toggelOption(filterId, optionIndex);
  };

  const getProcessProgress = () => {
    const countProcesses = questions.length;
    return `${activeQuestionId + 1}/${countProcesses}`;
  };

  return (
    <div className="guide-answers">
      <h2>Vorgaben {getProcessProgress()}</h2>
      {questions
        .filter(
          (question: IGuideQuestion, index: number) => index <= activeQuestionId
        )
        .map((question: IGuideQuestion, questionIndex: number) => (
          <div className="guide-answer-card" key={questionIndex}>
            <h3>{question.title}</h3>
            {question.filterId === activeQuestionId
              ? "---"
              : question.options.map(
                  (option: IGuideOption, optionIndex: number) => (
                    <div className="guide-answer-card-option" key={optionIndex}>
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={(e) =>
                          handleOnChangeCkeckbox(question.filterId, optionIndex)
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      {option.title}
                    </div>
                  )
                )}
          </div>
        ))}
    </div>
  );
};

export default GuideAnswers;
