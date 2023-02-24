import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const FMultiSelection: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const [value, setValue] = useState<string[]>([
    filterItem.answer !== null &&
    typeof filterItem.answer.value === "string" &&
    filterItem.question.values?.includes(filterItem.answer.value)
      ? filterItem.answer.value
      : filterItem.question.values !== null &&
        filterItem.question.values.length > 0
      ? filterItem.question.values[0]
      : "default",
  ]);

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
    setValue((prevState) => [...prevState, e.target.value]);
  };

  return (
    <div className="f-input-multiselection">
      <input type="search" />
    </div>
  );
};

export default FMultiSelection;
