import React, { useEffect, useState } from "react";

import "./Guide.scss";
import { IGuideOption, IGuideQuestion } from "./Interface";
import { useNavigate, useParams } from "react-router-dom";
import GuideQuestion from "./Question/GuideQuestion";
import {
  IFilterAnswer,
  IFilterItem,
  IFilterQuestion,
  IRangeMinMax,
} from "../Process/Filter/Interface";

import _filter from "../Process/Filter/FilterQuestions.json";
import _questions from "./GuideQuestions.json";
import GuideAnswers from "./Answer/GuideAnswers";
import GuideOverview from "./Overview/GuideOverview";
import useGuide from "../../hooks/useGuide";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { EGuideQuestionType } from "../../interface/enums";

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

function isIRangeMinMax(value: any): value is IRangeMinMax {
  return !(
    (value as any).min === undefined && (value as any).max === undefined
  );
}

const createFilterItem = (
  questionType: EGuideQuestionType,
  filterId: number,
  answers: IFilterAnswer[]
): IFilterItem => {
  console.log(answers);

  const guideAnswer = (): IFilterAnswer => {
    switch (questionType) {
      case 0:
        return {
          unit: answers[0].unit === undefined ? null : answers[0].unit,
          value: answers.map((answer) => `${answer}`),
        };
      case 1:
        const vMin = answers[0].value;
        const vMax = answers[answers.length - 1].value;
        const min: number = isIRangeMinMax(vMin) ? vMin.min : 0;
        const max: number = isIRangeMinMax(vMax) ? vMax.max : 999999999;

        return {
          unit: answers[0].unit === undefined ? null : answers[0].unit,
          value: { min, max },
        };

      default:
        return { unit: null, value: "" };
    }
  };

  return {
    id: filterId,
    isChecked: true,
    isOpen: true,
    question: getQuestionByFilterId(filterId),
    answer: guideAnswer(),
  };
};

const convertToGuideAnswer = (questions: IGuideQuestion[]): IFilterItem[] => {
  return questions
    .filter(
      (question) =>
        question.options.filter(
          (option) => option.checked === true && option.answer !== null
        ).length > 0
    )
    .map((question) => {
      const options = question.options
        // .filter((option) => option.checked === true && option.answer !== null)
        .map((option) => option.answer);
      return createFilterItem(question.type, question.filterId, options);
    });
};

const initialState: State = {
  activeQuestionId: 0,
  questions: [],
  overview: false,
};

const Guide: React.FC<Props> = (props) => {
  const { setFilter } = props;

  const navigate = useNavigate();
  const { path } = useParams();
  const { guideQuestions, loadGuideQuestions } = useGuide();

  const [state, setState] = useState<State>(initialState);
  const { activeQuestionId, overview, questions } = state;

  useEffect(() => {
    if (path !== undefined) loadGuideQuestions(path);
  }, [path]);

  useEffect(() => {
    if (guideQuestions.length > 0)
      setState((prevState) => ({
        ...prevState,
        questions: guideQuestions.sort((q1, q2) => q1.filterId - q2.filterId),
        activeQuestionId: guideQuestions[0].filterId,
      }));
  }, [guideQuestions]);

  const getNextQuestionId = () => {
    return state.activeQuestionId + 1;
  };

  const toggelOption = (filterId: number, optionIndex: number) => {
    // console.log("Guide | ToggelOption");
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
    // console.log("Guide | setOptions", options);
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
          options: options,
        },
        ...prevState.questions.filter(
          (question: IGuideQuestion) => question.filterId > filterId
        ),
      ],
    }));
  };

  const selectQuestion = (questionId?: number) => {
    // console.log("Guide | selectQuestion", questionId);
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
    const filter = convertToGuideAnswer(state.questions);
    console.log("Guide | applyFilter", filter);
    setFilter(filter);
    navigate("/process/model");
  };

  return (
    <div className="guide">
      {overview === true ? (
        <GuideOverview
          questions={questions}
          selectQuestion={selectQuestion}
          applyFilter={applyFilter}
        />
      ) : questions.length > 0 ? (
        <>
          <GuideAnswers
            questions={questions}
            activeQuestionId={activeQuestionId}
            toggelOption={toggelOption}
            selectQuestion={selectQuestion}
          />
          <GuideQuestion
            question={questions[activeQuestionId]}
            setOptions={setOptions}
            selectQuestion={selectQuestion}
          />
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default Guide;
