import { Button } from "@mui/material";
import React, { useState } from "react";
import { getIconByName } from "../../../../config/Icons";
import { IGuideOption } from "../../Interface";
import { IGuideQuestionItem } from "../GuideQuestion";

interface Props extends IGuideQuestionItem {}

interface State {
  options: IGuideOption[];
}

const GSelection: React.FC<Props> = (props) => {
  const { options: inputOptions, confirmOptions, skipQuestion } = props;
  const [state, setState] = useState<State>({ options: inputOptions });
  const { options } = state;

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
    setState((prevState) => ({
      ...prevState,
      options: [
        ...prevState.options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex < index
        ),
        {
          ...prevState.options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0],
          checked: !prevState.options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0].checked,
        },
        ...prevState.options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex > index
        ),
      ],
    }));
  };

  const handleOnClickNext = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    confirmOptions(options);
  };
  const handleOnClickSkip = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    skipQuestion();
  };

  return (
    <div className="guide-question-cards">
      {options.map((option: IGuideOption, index: number) => (
        <div
          key={index}
          className="guide-question-card"
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
      <div className="guide-question-buttons">
        <Button
          variant="contained"
          sx={{ background: "grey", "&:hover": { background: "grey" } }}
          onClick={handleOnClickSkip}
        >
          Überspringen
        </Button>
        <Button variant="contained" onClick={handleOnClickNext}>
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default GSelection;
