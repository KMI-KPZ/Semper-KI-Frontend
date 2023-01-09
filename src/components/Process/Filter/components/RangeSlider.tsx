import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/system";
import { IFilterItem } from "../Interface";

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const RangeSlider: React.FC<Props> = ({ filterItem, setFilterItem }) => {
  const [value, setValue] = React.useState<number[]>(
    filterItem.answer !== null && Array.isArray(filterItem.answer.value)
      ? [filterItem.answer.value[0], filterItem.answer.value[1]]
      : filterItem.question.range !== null &&
        Array.isArray(filterItem.question.range)
      ? [filterItem.question.range[0], filterItem.question.range[1]]
      : [0, 100]
  );

  React.useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer: { unit: null, value: { min: value[0], max: value[1] } },
    });
  }, [value]);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueIndex: number
  ) => {
    let input = Number(e.target.value);
    if (
      input <
      (filterItem.question.range !== null ? filterItem.question.range[0] : 0)
    ) {
      input = 0;
    } else if (
      input >
      (filterItem.question.range !== null ? filterItem.question.range[1] : 100)
    ) {
      input = 100;
    }
    const v0: number = valueIndex === 0 ? input : value[0];
    const v1: number = valueIndex === 1 ? input : value[1];
    setValue([v0, v1]);
  };

  return (
    <Stack sx={{ width: "100%" }} direction="row" spacing={2}>
      <input
        type="number"
        value={value[0]}
        style={{ width: `50px` }}
        onChange={(e) => handleChangeInput(e, 0)}
      />
      <Slider
        min={
          filterItem.question.range !== null ? filterItem.question.range[0] : 0
        }
        max={
          filterItem.question.range !== null
            ? filterItem.question.range[1]
            : 100
        }
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChangeSlider}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <input
        type="number"
        value={value[1]}
        style={{ width: `50px` }}
        onChange={(e) => handleChangeInput(e, 1)}
      />
    </Stack>
  );
};

export default RangeSlider;
