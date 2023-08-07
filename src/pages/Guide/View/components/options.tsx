import {
  EGuideQuestionState,
  GuideQuestionType,
  GuideOptionProps,
} from "@/pages/Guide/Guide";
import React from "react";
import GuideMultiSelection from "./multiSelection";
import GuideRangeSlider from "./rangeSlider";
import GuideSelection from "./selection";

interface Props extends IGuideOptionProps {
  type: GuideQuestionType;
}

export interface IGuideOptionProps {
  options: GuideOptionProps[];
  filterId: number;
  questionState: EGuideQuestionState;
  setOptions?(filterId: number, options: GuideOptionProps[]): void;
  confirmOptions?(filterId: number): void;
  skipQuestion?(): void;
  goBackQuestion?(): void;
}

const GuideOptions: React.FC<Props> = (props) => {
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
      case GuideQuestionType.multiSelection:
        return (
          <GuideMultiSelection
            filterId={filterId}
            options={options}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
            skipQuestion={skipQuestion}
            questionState={questionState}
            goBackQuestion={goBackQuestion}
          />
        );
      case GuideQuestionType.selection:
        return (
          <GuideSelection
            filterId={filterId}
            options={options}
            confirmOptions={confirmOptions}
            setOptions={setOptions}
            skipQuestion={skipQuestion}
            questionState={questionState}
            goBackQuestion={goBackQuestion}
          />
        );
      case GuideQuestionType.range:
        return (
          <GuideRangeSlider
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

export default GuideOptions;
