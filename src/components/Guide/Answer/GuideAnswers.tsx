import React from "react";
import { EGuideQuestionState } from "../../../interface/enums";
import { IGuideOption, IGuideQuestion } from "../Interface";
import GuideAnswer from "./GuideAnswer";

interface Props {
  activeQuestionIndex: number;
  questions: IGuideQuestion[];
  setOptions(filterId: number, options: IGuideOption[]): void;
  selectQuestion(): void;
}

const GuideAnswers: React.FC<Props> = (props) => {
  const { questions, activeQuestionIndex, selectQuestion, setOptions } = props;

  const getProcessProgress = () => {
    const countProcesses = questions.length;
    return `${activeQuestionIndex + 1}/${countProcesses}`;
  };

  const confirmOptions = (filterId: number) => {
    // setOptions(filterId, options);
  };

  console.log();

  return (
    <div className="guide-answers">
      <h2>Vorgaben {getProcessProgress()}</h2>
      {questions
        .filter(
          (question: IGuideQuestion, index: number) =>
            index <= activeQuestionIndex
        )
        .map((question: IGuideQuestion, questionIndex: number) => (
          <GuideAnswer
            questionState={EGuideQuestionState.answer}
            active={questionIndex === activeQuestionIndex}
            options={question.options}
            title={question.title}
            type={question.type}
            key={questionIndex}
            filterId={question.filterId}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
          />
        ))}
    </div>
  );
};

export default GuideAnswers;
