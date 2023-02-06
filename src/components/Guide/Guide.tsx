import React, { useState } from "react";

import "./Guide.scss";
import { IGuideOption, IGuideQuestion } from "./Interface";
import { useNavigate, useParams } from "react-router-dom";
import GuideQuestion from "./GuideQuestion";
import { IFilterItem, IFilterQuestion } from "../Process/Filter/Interface";

import _filter from "../Process/Filter/FilterQuestions.json";
import _questions from "./GuideQuestions.json";
import GuideAnswers from "./GuideAnswers";

const questions = _questions.sort(
  (q1, q2) => q1.filterId - q2.filterId
) as IGuideQuestion[];

const testFilter = _filter as IFilterItem[];
const getQuestionByFilterId = (filterId: number): IFilterQuestion =>
  testFilter.filter((filterItem: IFilterItem) => filterItem.id === filterId)[0]
    .question;

interface Props {
  setFilter(filter: IFilterItem[]): void;
}

interface State {
  activeQuestionId: number;
  questions: IGuideQuestion[];
}

const convertToGuideAnswer = (answers: IGuideOption[]): IFilterItem[] => {
  let filterItemList: IFilterItem[] = [];

  // answers.forEach((answer: IGuideOption, index: number) => {
  //   const guideAnswer: IFilterAnswer =
  //     questions[index].options[answer.answers[0]].answer;
  //   const filterItem: IFilterItem = {
  //     id: filterId,
  //     isChecked: guideAnswer === null ? false : true,
  //     isOpen: guideAnswer === null ? false : true,
  //     question: getQuestionByFilterId(filterId),
  //     answer: guideAnswer,
  //   };
  //   filterItemList.push(filterItem);
  // });
  return filterItemList;
};

const Guide = ({ setFilter }: Props) => {
  const path = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    activeQuestionId: questions[0].filterId,
    questions,
  });

  const getNextQuestionId = () => {
    return state.activeQuestionId + 1;
  };

  const toggelOption = (filterId: number, optionIndex: number) => {
    console.log("toggelOption", filterId, optionIndex);

    setState((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions.filter(
          (question: IGuideQuestion) => question.filterId < filterId
        ),
        {
          ...prevState.questions.filter(
            (question: IGuideQuestion) => question.filterId === filterId
          )[0],
          options: [
            ...prevState.questions
              .filter(
                (question: IGuideQuestion) => question.filterId === filterId
              )[0]
              .options.filter(
                (option: IGuideOption, index_: number) => index_ < optionIndex
              ),
            {
              ...prevState.questions
                .filter(
                  (question: IGuideQuestion) => question.filterId === filterId
                )[0]
                .options.filter(
                  (option: IGuideOption, index_: number) =>
                    index_ === optionIndex
                )[0],
              checked: !prevState.questions
                .filter(
                  (question: IGuideQuestion) => question.filterId === filterId
                )[0]
                .options.filter(
                  (option: IGuideOption, index_: number) =>
                    index_ === optionIndex
                )[0].checked,
            },
            ...prevState.questions
              .filter(
                (question: IGuideQuestion) => question.filterId === filterId
              )[0]
              .options.filter(
                (option: IGuideOption, index_: number) => index_ > optionIndex
              ),
          ],
        },
        ...prevState.questions.filter(
          (question: IGuideQuestion) => question.filterId > filterId
        ),
      ],
    }));
  };

  const selectQuestion = (questionId?: number) => {
    setState((prevState) => ({
      ...prevState,
      activeQuestionId:
        questionId === undefined ? getNextQuestionId() : questionId,
    }));
  };

  return (
    <div className="guide">
      <GuideAnswers
        questions={state.questions}
        activeQuestionId={state.activeQuestionId}
        toggelOption={toggelOption}
        selectQuestion={selectQuestion}
      />
      <GuideQuestion
        question={state.questions[state.activeQuestionId]}
        toggelOption={toggelOption}
        selectQuestion={selectQuestion}
      />
    </div>
  );
};

export default Guide;
