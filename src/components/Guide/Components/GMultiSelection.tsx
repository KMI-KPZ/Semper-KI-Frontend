import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getIconByName } from "../../../config/Icons";
import { EGuideQuestionState } from "../../../interface/enums";
import { IGuideOption } from "../Interface";
import GButtons from "./GButtons";
import { IGuideOptionProps } from "./GOptions";

interface Props extends IGuideOptionProps {}

interface State {
  options: IGuideOption[];
}

const GMultiSelection: React.FC<Props> = (props) => {
  const {
    filterId,
    options,
    confirmOptions,
    skipQuestion,
    questionState,
    setOptions,
    goBackQuestion,
  } = props;

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggelOption(index);
  };

  const handleOnChangeCkeckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    toggelOption(index);
  };

  const toggelOption = (index: number) => {
    if (setOptions !== undefined)
      setOptions(filterId, [
        ...options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex < index
        ),
        {
          ...options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0],
          checked: !options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0].checked,
        },
        ...options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex > index
        ),
      ]);
  };

  const handleOnClickNext = () => {
    if (confirmOptions !== undefined) confirmOptions(filterId);
  };

  const handleOnClickSkip = () => {
    if (skipQuestion !== undefined) skipQuestion();
  };

  return (
    <div
      className={`guide-question-cards ${EGuideQuestionState[questionState]}`}
    >
      {options.map((option: IGuideOption, index: number) => (
        <div
          key={index}
          className={`guide-question-card ${EGuideQuestionState[questionState]}`}
          onClick={(e) => handleOnClickCard(e, index)}
        >
          <input
            type="checkbox"
            checked={option.checked}
            onChange={(e) => handleOnChangeCkeckbox(e, index)}
            onClick={(e) => e.stopPropagation()}
          />
          {option.title}
          {option.icon === undefined ? null : (
            <img src={getIconByName(option.icon)} />
          )}
        </div>
      ))}
      {questionState === EGuideQuestionState.question ? (
        <GButtons
          handleOnClickNext={handleOnClickNext}
          handleOnClickSkip={handleOnClickSkip}
          handleOnClickBack={goBackQuestion}
        />
      ) : null}
    </div>
  );
};

export default GMultiSelection;
