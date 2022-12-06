import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FilterItemOptionType, FilterItemType } from "./FilterData";

interface Props {
  setFilterOption(id: number, name: string, value: any): void;
  option: FilterItemOptionType;
  filter: FilterItemType;
}

const FilterItemOption = ({ setFilterOption, option, filter }: Props) => {
  const { t } = useTranslation();

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption(option.id, "checked", !option.checked);
  };

  return (
    <div className="filter-item-option">
      <input
        type="checkbox"
        onChange={onChangeCheckBox}
        checked={option.checked}
      />
      <h4>
        {t(
          `filter.${filter.title}.${option.title}${
            option.selection ? ".headline" : ""
          }`
        )}
      </h4>
      {option.range && option.checked ? (
        <>
          <input type="range" />
        </>
      ) : null}
      {option.selection && option.checked ? (
        <>
          <select>
            {option.selection.map((value: string, index: number) => (
              <option key={index} value={value}>{`${value}`}</option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
};

export default FilterItemOption;
