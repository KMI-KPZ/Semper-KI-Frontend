import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/system";
import { IFilterItem, IRangeMinMax } from "../Interface";

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

function instanceOfIRangeMinMax(object: any): object is IRangeMinMax {
  return ("min" || "max") in object;
}

const FSliderSelection: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const rangeMin: number =
    filterItem.question.range !== null &&
    Array.isArray(filterItem.question.range)
      ? filterItem.question.range[0]
      : 0;
  const rangeMax: number =
    filterItem.question.range !== null &&
    Array.isArray(filterItem.question.range)
      ? filterItem.question.range[1]
      : 100;
  const answer: IRangeMinMax =
    filterItem.answer !== null &&
    instanceOfIRangeMinMax(filterItem.answer.value)
      ? {
          min: filterItem.answer.value.min,
          max:
            filterItem.answer.value.max === 999999999
              ? rangeMax
              : filterItem.answer.value.max,
        }
      : { min: rangeMin, max: rangeMax };

  const [value, setValue] = React.useState<number[]>([answer.min, answer.max]);
  const [unit, setUnit] = React.useState<string>(
    filterItem.answer !== null && filterItem.answer.unit !== null
      ? filterItem.answer.unit
      : filterItem.question.units !== null &&
        Array.isArray(filterItem.question.units) &&
        filterItem.question.units.length > 0
      ? filterItem.question.units[0]
      : "default"
  );

  React.useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer: { unit, value: { min: value[0], max: value[1] } },
    });
  }, [value, unit]);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueIndex: number
  ) => {
    let input = Number(e.target.value);
    if (input < rangeMin) {
      input = rangeMin;
    } else if (input > rangeMax) {
      input = rangeMax;
    }
    const v0: number = valueIndex === 0 ? input : value[0];
    const v1: number = valueIndex === 1 ? input : value[1];
    setValue([v0 < v1 ? v0 : v1, v0 < v1 ? v1 : v0]);
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setUnit(e.target.value);
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
    >
      <Slider
        sx={{ width: "80%" }}
        min={rangeMin}
        max={rangeMax}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChangeSlider}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <Stack
        width="80%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <input
          className="f-slider-input-number"
          type="number"
          value={value[0]}
          style={{
            width: `${(value[0].toString().length + 3) * 8}px`,
          }}
          onChange={(e) => handleChangeInput(e, 0)}
        />
        -
        <input
          className="f-slider-input-number"
          type="number"
          value={value[1]}
          style={{ width: `${(value[1].toString().length + 3) * 8}px` }}
          onChange={(e) => handleChangeInput(e, 1)}
        />
        <select
          onChange={handleSelectOption}
          value={unit}
          className="f-slider-input-select"
        >
          <option
            value="default"
            className="post-processing-option-select-option"
            disabled
          >
            ---
          </option>
          {filterItem.question.units !== null &&
          Array.isArray(filterItem.question.units)
            ? filterItem.question.units.map((title: string, index: number) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))
            : ""}
        </select>
      </Stack>
    </Stack>
  );
};

export default FSliderSelection;
