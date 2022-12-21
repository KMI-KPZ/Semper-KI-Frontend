import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Guide.scss";
import Question from "./Question";
import getQuestions, { AnswerType, QuestionType } from "./Questions";

interface Props {}

export interface UserAnswerType {
  answered: boolean;
  skiped: boolean;
  questionId: number;
  answer: AnswerType;
}

interface State {
  questions: QuestionType[];
  answers: UserAnswerType[];
}

const Guide = (props: Props) => {
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    questions: getQuestions(),
    answers: [],
  });

  const getUserAnswerType = (question: QuestionType): UserAnswerType => {
    const userAnswer: UserAnswerType = state.answers.filter(
      (userAnswer: UserAnswerType) => userAnswer.questionId === question.id
    )[0];
    return userAnswer
      ? userAnswer
      : {
          answer: question.answers,
          questionId: question.id,
          answered: false,
          skiped: false,
        };
  };

  const setUserAnswer = (userAnswer: UserAnswerType) => {
    setState((prevState) => ({
      ...prevState,
      answers: [
        ...prevState.answers.filter(
          (userAnswer_2: UserAnswerType) =>
            userAnswer_2.questionId < userAnswer.questionId
        ),
        userAnswer,
        ...prevState.answers.filter(
          (userAnswer_2: UserAnswerType) =>
            userAnswer_2.questionId > userAnswer.questionId
        ),
      ],
    }));
  };

  return (
    <div className="guide">
      <h1 className="guide-headline">{t("guide.headline")}</h1>
      {state.questions.map((question: QuestionType, index: number) => (
        <Question
          setUserAnswer={setUserAnswer}
          question={question}
          userAnswer={getUserAnswerType(question)}
          key={index}
        />
      ))}
    </div>
  );
};

export default Guide;
