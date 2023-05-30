import { EGuideQuestionState, IGuideOption } from "@/pages/Guide";
import { Slider } from "@mui/material";
import React from "react";
import GuideButtons from "./buttons";
import { IGuideOptionProps } from "./options";

interface Props extends IGuideOptionProps {}

const calcValue = (options: IGuideOption[]): number[] => {
  let values: number[] = [0, options.length - 1];

  const answers: number[] = options
    .map((option, index) =>
      option.checked === true && option.answer !== null ? index : -1
    )
    .filter((index) => index !== -1);

  if (answers.length > 0) {
    values[0] = answers[0];
    values[1] = answers[answers.length - 1];
  }

  return values;
};

const GuideRangeSlider: React.FC<Props> = (props) => {
  const {
    filterId,
    setOptions,
    options,
    confirmOptions,
    skipQuestion,
    questionState,
    goBackQuestion,
  } = props;

  const min = 0;
  const max = options.length - 1;

  const marks = options.map((option: IGuideOption, index: number) => ({
    value: index,
    label: option.title,
  }));

  const handleChangeSlider = (event: Event, _newValue: number | number[]) => {
    const newValue = _newValue as number[];
    if (
      newValue[0] !== calcValue(options)[0] ||
      newValue[1] !== calcValue(options)[1]
    )
      applyValues(newValue as number[]);
  };

  const handleOnClickNext = () => {
    if (confirmOptions !== undefined) confirmOptions(filterId);
  };

  const applyValues = (value: number[]) => {
    if (setOptions !== undefined)
      setOptions(filterId, [
        ...options
          .filter(
            (option: IGuideOption, optionIndex: number) =>
              optionIndex < value[0]
          )
          .map((MOption: IGuideOption, index: number) => ({
            ...MOption,
            checked: false,
          })),
        ...options
          .filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex >= value[0] && FOptionIndex <= value[1]
          )
          .map((MOption: IGuideOption, index: number) => ({
            ...MOption,
            checked: true,
          })),
        ...options
          .filter(
            (option: IGuideOption, optionIndex: number) =>
              optionIndex > value[1]
          )
          .map((MOption: IGuideOption, index: number) => ({
            ...MOption,
            checked: false,
          })),
      ]);
  };

  const handleOnClickSkip = () => {
    if (skipQuestion !== undefined) skipQuestion();
  };

  return (
    <div
      className={`guide-question-cards ${EGuideQuestionState[questionState]}`}
    >
      <Slider
        sx={
          questionState === EGuideQuestionState.question ||
          questionState === EGuideQuestionState.overview
            ? { width: 500 }
            : {}
        }
        min={min}
        max={max}
        getAriaLabel={() => "Temperature range"}
        value={calcValue(options)}
        onChange={handleChangeSlider}
        valueLabelDisplay="off"
        getAriaValueText={() => "text"}
        step={null}
        marks={marks}
      />
      {questionState === EGuideQuestionState.question ? (
        <GuideButtons
          handleOnClickNext={handleOnClickNext}
          handleOnClickSkip={handleOnClickSkip}
          handleOnClickBack={goBackQuestion}
        />
      ) : null}
    </div>
  );
};

export default GuideRangeSlider;
