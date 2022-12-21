import { Button } from "@mui/material";
import React, { useState } from "react";
import { UserAnswerType } from "./Guide";
import { QuestionType } from "./Questions";

interface Props {
  question: QuestionType;
  userAnswer: UserAnswerType;
  setUserAnswer(userAnswer: UserAnswerType): void;
}

interface State {
  userAnswer: UserAnswerType;
}

const Question = ({ setUserAnswer, userAnswer, question }: Props) => {
  const [state, setState] = useState<State>({ userAnswer });

  const handleClickAnswerButton = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      userAnswer: { ...prevState.userAnswer, answered: true },
    }));
    setUserAnswer({ ...state.userAnswer, answered: true });
  };

  const renderOptions = () => {
    return question.answers.options ? (
      <div className="question-options">
        {question.answers.options.map((option: string, index: number) => (
          <div className="question-option" key={index}>
            {option}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="question">
      {state.userAnswer.answered ? (
        <>
          <h1 className="question-headline">{question.question}</h1>
          beantwortet
        </>
      ) : (
        <>
          <h1 className="question-headline">{question.question}</h1>
          {renderOptions()}
        </>
      )}
    </div>
  );
};

export default Question;
