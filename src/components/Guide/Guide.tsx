import React, { useState } from "react";

import "./Guide.scss";
import { IGuideOption, IGuideQuestion } from "./Interface";
import { useNavigate, useParams } from "react-router-dom";
import GuideQuestion from "./GuideQuestion";
import {
  IFilterAnswer,
  IFilterItem,
  IFilterQuestion,
} from "../Process/Filter/Interface";

import _filter from "../Process/Filter/FilterQuestions.json";
import _questions from "./GuideQuestions.json";
import GuideAnswers from "./GuideAnswers";
import GuideOverview from "./GuideOverview";
import { IOption } from "../../interface/Interface";
import { log } from "console";

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
  overview: boolean;
}

const convertToGuideAnswer = (questions: IGuideQuestion[]): IFilterItem[] => {
  let filterItemList: IFilterItem[] = [];

  questions.forEach((questions: IGuideQuestion, index: number) => {
    let guideAnswers: IFilterAnswer[] = [];
    questions.options.forEach((option: IGuideOption) => {
      if (option.checked === true && option.answer !== null)
        guideAnswers.push(option.answer);
    });
    const filterItem: IFilterItem = {
      id: questions.filterId,
      isChecked: guideAnswers[0] === undefined ? false : true,
      isOpen: guideAnswers[0] === undefined ? false : true,
      question: getQuestionByFilterId(questions.filterId),
      answer: guideAnswers[0] === undefined ? null : guideAnswers[0],
    };
    filterItemList.push(filterItem);
  });
  return filterItemList;
};

const Guide = ({ setFilter }: Props) => {
  const path = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    activeQuestionId: questions[0].filterId,
    questions,
    overview: false,
  });

  const getNextQuestionId = () => {
    return state.activeQuestionId + 1;
  };

  const toggelOption = (filterId: number, optionIndex: number) => {
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

  const setOptions = (filterId: number, options: IGuideOption[]) => {
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
          options,
        },
        ...prevState.questions.filter(
          (question: IGuideQuestion) => question.filterId > filterId
        ),
      ],
    }));
  };

  const selectQuestion = (questionId?: number) => {
    console.log("selectQuestion", questionId);
    if (
      questionId === undefined &&
      getNextQuestionId() >= state.questions.length
    ) {
      setState((prevState) => ({ ...prevState, overview: true }));
    } else {
      setState((prevState) => ({
        ...prevState,
        overview: false,
        activeQuestionId:
          questionId === undefined ? getNextQuestionId() : questionId,
      }));
    }
  };

  const applyFilter = () => {
    console.log("applyFilter");
    setFilter(convertToGuideAnswer(state.questions));
    navigate("/process/model");
  };

  return (
    <div className="guide">
      {state.overview === true ? (
        <GuideOverview
          questions={state.questions}
          selectQuestion={selectQuestion}
          applyFilter={applyFilter}
        />
      ) : (
        <>
          <GuideAnswers
            questions={state.questions}
            activeQuestionId={state.activeQuestionId}
            toggelOption={toggelOption}
            selectQuestion={selectQuestion}
          />
          <GuideQuestion
            question={state.questions[state.activeQuestionId]}
            setOptions={setOptions}
            selectQuestion={selectQuestion}
          />
        </>
      )}
    </div>
  );
};

export default Guide;
