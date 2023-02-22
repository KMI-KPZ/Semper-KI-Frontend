import { Button, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IGuideOption } from "../../Interface";
import { IGuideQuestionItem } from "../GuideQuestion";

interface Props extends IGuideQuestionItem {}

const GRangeSlider: React.FC<Props> = (props) => {
  const { options, confirmOptions, skipQuestion } = props;

  const min = 0;
  const max = options.length - 1;
  const [value, setValue] = useState<number[]>([min, max]);

  useEffect(() => {
    setValue([0, options.length - 1]);
  }, [options]);

  const marks = options.map((option: IGuideOption, index: number) => ({
    value: index,
    label: option.title,
  }));

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleOnClickNext = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    confirmOptions([
      ...options
        .filter(
          (option: IGuideOption, optionIndex: number) => optionIndex < value[0]
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
          (option: IGuideOption, optionIndex: number) => optionIndex > value[1]
        )
        .map((MOption: IGuideOption, index: number) => ({
          ...MOption,
          checked: false,
        })),
    ]);
  };
  const handleOnClickSkip = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    skipQuestion();
  };

  return (
    <div>
      <Slider
        sx={{ width: "500px" }}
        min={min}
        max={max}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChangeSlider}
        valueLabelDisplay="off"
        getAriaValueText={() => "text"}
        step={null}
        marks={marks}
      />
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

export default GRangeSlider;
