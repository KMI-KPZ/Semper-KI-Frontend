import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOption, IFilterItem, IFilterAnswer } from "./Interface";

interface Props {
  filterAnswer: IFilterAnswer;
  option: IFilterItemOption;
  filter: IFilterItem;
  setFilterAnswers(filterAnswers: IFilterAnswer): void;
}

const FilterItemOption = ({
  option,
  filter,
  filterAnswer,
  setFilterAnswers,
}: Props) => {
  const { t } = useTranslation();

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newfilterAnswer: IFilterAnswer = filterAnswer;
    newfilterAnswer.value.checked = !newfilterAnswer.value.checked;

    setFilterAnswers(newfilterAnswer);
  };

  return (
    <div className="filter-item-option">
      <input
        type="checkbox"
        onChange={onChangeCheckBox}
        checked={
          filterAnswer !== undefined &&
          filterAnswer.value !== undefined &&
          filterAnswer.value !== null &&
          filterAnswer.value.checked !== undefined &&
          filterAnswer.value.checked
            ? true
            : false
        }
      />
      <h4>
        {t(
          `filter.${filter.title}.${option.title}${
            option.selection ? ".headline" : ""
          }`
        )}
      </h4>
      {option.range &&
      filterAnswer !== undefined &&
      filterAnswer.value !== null &&
      filterAnswer.value.checked !== undefined &&
      filterAnswer.value.checked ? (
        <>
          {/* <input
            type="range"
            value={
              filterAnswer !== undefined &&
              filterAnswer.value !== null &&
              filterAnswer.value.range !== undefined
                ? filterAnswer.value.range.min
                : 0
            }
          /> */}
          {filterAnswer !== undefined &&
          filterAnswer.value !== null &&
          filterAnswer.value.range !== undefined
            ? filterAnswer.value.range.min
            : 0}
        </>
      ) : null}
      {option.selection &&
      filterAnswer !== undefined &&
      filterAnswer.value !== null &&
      filterAnswer.value.checked !== undefined &&
      filterAnswer.value.checked ? (
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
