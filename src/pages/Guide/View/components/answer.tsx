import { Heading } from "@component-library/Typography";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { EGuideQuestionState, IGuideOption, IGuideQuestion } from "../..";
import GuideAnswer from "./answerItem";
import logger from "@/hooks/useLogger";

interface Props {
  activeQuestionIndex: number;
  questions: IGuideQuestion[];
  setOptions(filterId: number, options: IGuideOption[]): void;
  selectQuestion(): void;
}

const GuideAnswers: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { questions, activeQuestionIndex, setOptions } = props;

  const getProcessProgress = () => {
    const countProcesses = questions.length;
    return `${activeQuestionIndex + 1}/${countProcesses}`;
  };

  const confirmOptions = (filterId: number) => {
    // setOptions(filterId, options);
  };

  logger();

  return (
    <div className="flex h-80 w-full flex-col justify-start gap-5 overflow-y-auto overflow-x-hidden bg-white p-10 xl:h-full">
      <Heading variant="h2">
        {t("Guide.Answer.GuideAnswers.header")} {getProcessProgress()}
      </Heading>
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
