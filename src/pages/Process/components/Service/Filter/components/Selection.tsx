import React, { useEffect, useState } from "react";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

export const parseFilterSelectionValue = (value: any): string => {
  if (
    value !== null &&
    value !== undefined &&
    typeof value === "object" &&
    value.id !== undefined &&
    value.name !== undefined
  ) {
    return value.id;
  } else return "default";
};

const ProcessFilterSelection: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;

  const [value, setValue] = useState<string>(
    parseFilterSelectionValue(filterItem.answer)
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
      className="rounded-xl border-2 px-5 py-3"
    >
      <option value="default" className="f-input-select-option" disabled>
        ---
      </option>
      {filterItem.question.values !== null
        ? filterItem.question.values.map((value, index: number) => (
            <option
              key={index}
              value={value.id}
              className="f-input-select-option"
            >
              {value.name}
            </option>
          ))
        : ""}
    </select>
  );
};

export default ProcessFilterSelection;
