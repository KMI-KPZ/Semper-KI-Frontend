import React from "react";
import {
  EGuideQuestionState,
  EGuideQuestionType,
} from "../../../interface/enums";
import { IGuideOption } from "../Interface";
import GMultiSelection from "./GMultiSelection";
import GRangeSlider from "./GRangeSlider";
import GSelection from "./GSelection";

interface Props extends IGuideOptionProps {
  type: EGuideQuestionType;
}

export interface IGuideOptionProps {
  options: IGuideOption[];
  filterId: number;
  questionState: EGuideQuestionState;
  setOptions?(filterId: number, options: IGuideOption[]): void;
  confirmOptions?(filterId: number): void;
  skipQuestion?(): void;
  goBackQuestion?(): void;
}

const GOptions: React.FC<Props> = (props) => {
  const {
    filterId,
    options,
    type,
    questionState,
    confirmOptions,
    skipQuestion,
    setOptions,
    goBackQuestion,
  } = props;

  const getGuideQuestionCards = (): JSX.Element => {
    switch (type) {
      case EGuideQuestionType.multiSelection:
        return (
          <GMultiSelection
            filterId={filterId}
            options={options}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
            skipQuestion={skipQuestion}
            questionState={questionState}
            goBackQuestion={goBackQuestion}
          />
        );
      case EGuideQuestionType.selection:
        return (
          <GSelection
            filterId={filterId}
            options={options}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
            skipQuestion={skipQuestion}
            questionState={questionState}
            goBackQuestion={goBackQuestion}
          />
        );
      case EGuideQuestionType.range:
        return (
          <GRangeSlider
            filterId={filterId}
            options={options}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
            skipQuestion={skipQuestion}
            questionState={questionState}
            goBackQuestion={goBackQuestion}
          />
        );

      default:
        return <>Error missing Question Type</>;
    }
  };

  return getGuideQuestionCards();
};

export default GOptions;
