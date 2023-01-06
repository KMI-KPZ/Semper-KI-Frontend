import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOption, IFilterItem, IFilterAnswer } from "./Interface";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterItemOption from "./FilterItemOption";

interface Props {
  filter: IFilterItem;
  filterAnswers: IFilterAnswer[];
  setFilterOpen(filterItemId: number, open: boolean): void;
  setFilterAnswer(filterAnswers: IFilterAnswer): void;
}

const FilterItem: React.FC<Props> = ({
  filter,
  filterAnswers,
  setFilterOpen,
  setFilterAnswer: setFilterAnswer,
}) => {
  const { t } = useTranslation();

  const handleClickIconButtonHeader = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFilterOpen(filter.id, !filter.open);
  };

  const calcFilterAnswers = (
    filterOptionId: number,
    option: IFilterItemOption
  ): IFilterAnswer => {
    return filterAnswers.filter(
      (filterAnswer: IFilterAnswer) =>
        filterAnswer.categoryId === filter.id &&
        filterAnswer.filterId === option.id
    )[0];
  };

  return (
    <div className="filter-item">
      <div className="filter-item-header">
        <h3>{t(`filter.${filter.title}.headline`)}</h3>
        <IconButton onClick={handleClickIconButtonHeader}>
          {filter.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      <hr className="filter-hr small" />
      {filter.open ? (
        <>
          {filter.options.map((option: IFilterItemOption, index: number) => (
            <FilterItemOption
              filter={filter}
              option={option}
              key={index}
              filterAnswer={calcFilterAnswers(option.id, option)}
              setFilterAnswer={setFilterAnswer}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default FilterItem;
