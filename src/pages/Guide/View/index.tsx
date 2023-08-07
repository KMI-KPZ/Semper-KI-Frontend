import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGuide from "../hooks/useGuide";
import { LoadingAnimation } from "@component-library/Loading";
import {
  GuideQuestionType,
  GuideOptionProps,
  GuideQuestionProps,
} from "../Guide";
import GuideOverview from "./components/overview";
import GuideAnswers from "./components/answer";
import GuideQuestion from "./components/question";
import logger from "@/hooks/useLogger";
import {
  FilterItemProps,
  FilterQuestionProps,
  FilterAnswerProps,
  RangeMinMaxProps,
} from "@/pages/OrderRoutes/Service/Manufacturing/Filter/Filter";
import useFilter from "@/pages/OrderRoutes/Service/Manufacturing/Filter/hooks/useFilter";

const getQuestionByFilterId = (
  filterId: number,
  filters: FilterItemProps[]
): FilterQuestionProps =>
  filters.filter((filterItem: FilterItemProps) => filterItem.id === filterId)[0]
    .question;

interface Props {
  setFilter(filter: FilterItemProps[]): void;
}

interface State {
  activeQuestionIndex: number;
  questions: GuideQuestionProps[];
  overview: boolean;
}

export const isIRangeMinMax = (value: any): value is RangeMinMaxProps => {
  return !(
    (value as any).min === undefined && (value as any).max === undefined
  );
};

const initialState: State = {
  activeQuestionIndex: 0,
  questions: [],
  overview: false,
};

const Guide: React.FC<Props> = (props) => {
  const { setFilter } = props;
  const navigate = useNavigate();
  const { path } = useParams();
  const { guideQuestions, loadGuideQuestions } = useGuide();
  const { filtersQuery } = useFilter();
  const [state, setState] = useState<State>(initialState);
  const { activeQuestionIndex, overview, questions } = state;

  useEffect(() => {
    if (path !== undefined) loadGuideQuestions(path);
  }, [path]);

  useEffect(() => {
    if (guideQuestions.length > 0)
      setState((prevState) => ({
        ...prevState,
        questions: guideQuestions.sort((q1, q2) => q1.filterId - q2.filterId),
        activeQuestionIndex: guideQuestions[0].filterId,
      }));
  }, [guideQuestions]);

  const createFilterItem = (
    questionType: GuideQuestionType,
    filterId: number,
    answers: FilterAnswerProps[]
  ): FilterItemProps => {
    const guideAnswer = (): FilterAnswerProps => {
      switch (questionType) {
        case 0:
          return {
            unit: answers[0].unit === undefined ? null : answers[0].unit,
            value: answers.map((answer) => `${answer.value}`),
          };
        case 1:
          return {
            unit: answers[0].unit === undefined ? null : answers[0].unit,
            value: answers.map((answer) => `${answer.value}`),
          };
        case 2:
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
      isOpen: false,
      question: getQuestionByFilterId(filterId, filtersQuery.data),
      answer: guideAnswer(),
    };
  };

  const convertToGuideAnswer = (
    questions: GuideQuestionProps[]
  ): FilterItemProps[] => {
    return questions
      .filter(
        (question: GuideQuestionProps) =>
          question.options.filter(
            (option: GuideOptionProps) =>
              option.checked === true && option.answer !== null
          ).length > 0
      )
      .map((question: GuideQuestionProps) => {
        const options = question.options.map((option) => option.answer);
        return createFilterItem(question.type, question.filterId, options);
      });
  };

  const getNextQuestionId = () => {
    return state.activeQuestionIndex + 1;
  };

  const setOptions = (filterId: number, options: GuideOptionProps[]) => {
    // logger("Guide | setOptions", options);
    setState((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions.filter(
          (question: GuideQuestionProps) => question.filterId < filterId
        ),
        {
          ...prevState.questions.filter(
            (question: GuideQuestionProps) => question.filterId === filterId
          )[0],
          options: options,
        },
        ...prevState.questions.filter(
          (question: GuideQuestionProps) => question.filterId > filterId
        ),
      ],
    }));
  };

  const selectQuestion = (questionId?: number) => {
    // logger("Guide | selectQuestion", questionId, getNextQuestionId());
    if (questionId === undefined && getNextQuestionId() === questions.length) {
      setState((prevState) => ({ ...prevState, overview: true }));
    } else {
      setState((prevState) => ({
        ...prevState,
        overview: false,
        activeQuestionIndex:
          questionId === undefined ? getNextQuestionId() : questionId,
      }));
    }
  };

  const applyFilter = () => {
    const filter = convertToGuideAnswer(questions);
    logger("Guide | applyFilter", filter);
    setFilter(filter);
    navigate("/process/model");
  };

  return (
    <div className="Guide flex max-h-[80vh] max-w-[80vw] flex-col items-center justify-center gap-5 xl:flex-row">
      {overview === true ? (
        <GuideOverview
          questions={questions}
          selectQuestion={selectQuestion}
          applyFilter={applyFilter}
          setOptions={setOptions}
        />
      ) : questions.length > 0 ? (
        <>
          <GuideAnswers
            questions={questions}
            activeQuestionIndex={activeQuestionIndex}
            setOptions={setOptions}
            selectQuestion={selectQuestion}
          />
          <GuideQuestion
            question={questions[activeQuestionIndex]}
            activeQuestionIndex={activeQuestionIndex}
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
