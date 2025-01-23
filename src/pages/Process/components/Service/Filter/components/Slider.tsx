import * as React from "react";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/system";
import { Container } from "@component-library/index";
import {
  FilterItemProps,
  RangeMinMaxProps,
} from "@/api/Filter/Querys/useGetFilters";

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

function instanceOfIRangeMinMax(object: any): object is RangeMinMaxProps {
  return ("min" || "max") in object;
}

const ProcessFilterSlider: React.FC<Props> = (props) => {
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
  const answer: RangeMinMaxProps =
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

  React.useEffect(() => {
    // if (value[0] !== rangeMin || value[1] !== rangeMax) {
    setFilterItem({
      ...filterItem,
      answer: {
        unit: filterItem.answer !== null ? filterItem.answer.unit : null,
        value: { min: value[0], max: value[1] },
      },
    });
    // }
  }, [value]);

  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
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
      <Container direction="row">
        <input
          className="w-40 rounded-md border-2 px-5 py-3"
          type="number"
          value={value[0]}
          onChange={(e) => handleChangeInput(e, 0)}
        />
        -
        <input
          className="w-40 rounded-md border-2 px-5 py-3"
          type="number"
          value={value[1]}
          onChange={(e) => handleChangeInput(e, 1)}
        />
        {filterItem.answer !== null && filterItem.answer.unit !== null
          ? filterItem.answer.unit
          : filterItem.question.units !== null &&
            typeof filterItem.question.units === "string"
          ? filterItem.question.units
          : null}
      </Container>
    </Stack>
  );
};

export default ProcessFilterSlider;
