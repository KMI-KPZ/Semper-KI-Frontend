import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const Selection: React.FC<Props> = ({ filterItem, setFilterItem }) => {
  const [value, setValue] = useState<string>(
    filterItem.answer !== null &&
      typeof filterItem.answer.value === "string" &&
      filterItem.question.values?.includes(filterItem.answer.value)
      ? filterItem.answer.value
      : filterItem.question.values !== null &&
        filterItem.question.values.length > 0
      ? filterItem.question.values[0]
      : "default"
  );

  useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer: {
        unit: null,
        value,
      },
    });
  }, [value]);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <select onChange={handleSelectOption} value={value}>
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
