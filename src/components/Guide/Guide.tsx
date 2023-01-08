import React, { useState } from "react";

import "./Guide.scss";
import { IGuideOption, IGuideQuestion } from "./Interface";
import { useNavigate, useParams } from "react-router-dom";
import GuideQuestion from "./GuideQuestion";
import { Fab } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  IFilterAnswer,
  IFilterItem,
  IFilterQuestion,
} from "../Process/Filter/Interface";

import _filter from "../Process/Filter/FilterQuestions.json";
import _questions from "./GuideQuestions.json";

const questions = _questions as IGuideQuestion[];

const testFilter = _filter as IFilterItem[];
const getQuestionByFilterId = (filterId: number): IFilterQuestion =>
  testFilter.filter((filterItem: IFilterItem) => filterItem.id === filterId)[0]
    .question;

interface Props {
  setFilter(filter: IFilterItem[]): void;
}

interface State {
  activeQuestion: number;
  answers: number[];
}

const Guide = ({ setFilter }: Props) => {
  const path = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    activeQuestion: 0,
    answers: Array<number>(questions.length),
  });

  const selectOption = (questionId: number, optionId: number) => {
    // console.log("select Option", questionId, optionId);
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

  const handleOnClickFab = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (state.answers.length === state.activeQuestion) {
      setFilter(convertToGuideAnswer(state.answers));
      navigate("/process/models");
    }
  };

  const convertToGuideAnswer = (answers: number[]): IFilterItem[] => {
    let filterItemList: IFilterItem[] = [];

    answers.forEach((answer: number, index: number) => {
      const filterId: number = questions[index].filterId;
      const guideAnswer: IFilterAnswer =
        questions[index].options[answer].answer;
      const filterItem: IFilterItem = {
        id: filterId,
        isChecked: guideAnswer === null ? false : true,
        isOpen: guideAnswer === null ? false : true,
        question: getQuestionByFilterId(filterId),
        answer: guideAnswer,
      };
      filterItemList.push(filterItem);
    });
    return filterItemList;
  };

  return (
    <div className="guide">
      {questions.sort().map((question: IGuideQuestion) => (
        <GuideQuestion
          key={question.id}
          selected={state.answers[question.id]}
          selectOption={selectOption}
          question={question}
          activeQuestion={state.activeQuestion}
        />
      ))}
      <Fab
        onClick={handleOnClickFab}
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
