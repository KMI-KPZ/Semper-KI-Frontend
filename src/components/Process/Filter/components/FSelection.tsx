import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const FSelection: React.FC<Props> = ({ filterItem, setFilterItem }) => {
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
    <select
      onChange={handleSelectOption}
      value={value}
      className="f-input-select"
    >
      <option value="default" className="f-input-select-option" disabled>
        ---
      </option>
      {filterItem.question.values !== null
        ? filterItem.question.values.map((title: string, index: number) => (
            <option key={index} value={title} className="f-input-select-option">
              {title}
            </option>
          ))
        : ""}
    </select>
  );
};

export default FSelection;
