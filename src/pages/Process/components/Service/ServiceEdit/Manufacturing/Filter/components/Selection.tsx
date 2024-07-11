import React, { useEffect, useState } from "react";
import { FilterItemProps } from "../Filter";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

const ProcessFilterSelection: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
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

export default ProcessFilterSelection;
