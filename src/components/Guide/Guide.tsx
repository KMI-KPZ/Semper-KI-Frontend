import React, { useState } from "react";

import "./Guide.scss";
import _questions from "./GuideQuestions.json";
import { IGuideQuestion, IGuideQuestionOption } from "./Interface";
import { useParams } from "react-router-dom";
import GuideQuestion from "./GuideQuestion";
import { Fab } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const questions = _questions as IGuideQuestion[];

interface State {
  activeQuestion: number;
  answers: number[];
}

const Guide = () => {
  const path = useParams();
  const [state, setState] = useState<State>({
    activeQuestion: 0,
    answers: Array<number>(questions.length),
  });

  const selectOption = (questionId: number, optionId: number) => {
    console.log("select Option", questionId, optionId);
    setState((prevState) => {
      let newAnswers = prevState.answers;
      newAnswers[questionId] = optionId;
      return {
        ...prevState,
        answer: newAnswers,
        activeQuestion:
          newAnswers[questionId + 1] === undefined
            ? questionId + 1
            : prevState.activeQuestion,
      };
    });
  };

  return (
    <div className="guide">
      {questions.map((question: IGuideQuestion) => (
        <GuideQuestion
          key={question.id}
          selected={state.answers[question.id]}
          selectOption={selectOption}
          question={question}
          activeQuestion={state.activeQuestion}
        />
      ))}
      <Fab
        className="guide-fab"
        sx={{
          position: "absolute",
          bottom: 50,
          right: 50,
          color: "white",
          backgroundColor:
            state.answers.length === state.activeQuestion ? "green" : "blue",
          "&:hover": {
            color: "white",
            backgroundColor:
              state.answers.length === state.activeQuestion ? "green" : "blue",
            filter: "opacity(0.5)",
          },
        }}
      >
        {state.answers.length === state.activeQuestion ? (
          <NavigateNextIcon />
        ) : (
          `${state.activeQuestion}/${state.answers.length}`
        )}
      </Fab>
    </div>
  );
};

export default Guide;
