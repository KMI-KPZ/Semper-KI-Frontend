import React from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const Selection: React.FC<Props> = ({ filterItem, setFilterItem }) => {
  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setFilterItem({
      ...filterItem,
      answer: {
        unit:
          typeof filterItem.question.units === "string"
            ? filterItem.question.units
            : null,
        value: e.target.value,
      },
    });
  };

  return (
    <select
      onChange={handleSelectOption}
      value={
        filterItem.answer !== null &&
        typeof filterItem.answer.value === "string"
          ? filterItem.answer.value
          : "default"
      }
    >
      <option
        value="default"
        className="post-processing-option-select-option"
        disabled
      >
        ---
      </option>
      {filterItem.question.values !== null
        ? filterItem.question.values.map((title: string, index: number) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))
        : ""}
    </select>
  );
};

export default Selection;
