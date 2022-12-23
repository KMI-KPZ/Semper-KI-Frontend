import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOption, IFilterItem, IFilterAnswer } from "./Interface";
import "./Filter.scss";
import FilterItem from "./FilterItem";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import _filter from "./FilterQuestions.json";
const filter = _filter as IFilterItem[];

interface Props {
  filter: IFilterItem[];
  setFilterItems(filterItems: IFilterItem[]): void;
  filterAnswers: IFilterAnswer[];
  setFilterAnswers(filterAnswers: IFilterAnswer): void;
}

interface State {
  open: boolean;
}

const Filter = ({
  filter,
  filterAnswers,
  setFilterItems,
  setFilterAnswers,
}: Props) => {
  const [state, setState] = useState<State>({
    open: true,
  });
  const { t } = useTranslation();

  const calcFilterAnswers = (filterItemId: number): IFilterAnswer[] => {
    return filterAnswers.filter(
      (filterAnswer: IFilterAnswer) => filterAnswer.categoryId === filterItemId
    );
  };

  const setFilterOpen = (filterItemId: number, open: boolean): void => {
    const newFilter: IFilterItem[] = [
      ...filter.filter((filter: IFilterItem) => filter.id < filterItemId),
      {
        ...filter.filter(
          (filter: IFilterItem) => filter.id === filterItemId
        )[0],
        open,
      },
      ...filter.filter((filter: IFilterItem) => filter.id > filterItemId),
    ];

    setFilterItems(newFilter);
  };

  const handleClickIconButtonHeader = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  return (
    <div className={`filter ${state.open ? "open" : "closed"}`}>
      <h2 className="filter-headline">
        {state.open ? <>{t("filter.headline")}</> : ""}
        <IconButton
          sx={{ transform: "rotate(-90deg)" }}
          onClick={handleClickIconButtonHeader}
        >
          {state.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </h2>
      {state.open ? <hr className="filter-hr large" /> : ""}
      {state.open
        ? filter.map((filter: IFilterItem, index: number) => (
            <FilterItem
              key={index}
              filter={filter}
              filterAnswers={calcFilterAnswers(filter.id)}
              setFilterOpen={setFilterOpen}
              setFilterAnswers={setFilterAnswers}
            />
          ))
        : ""}
    </div>
  );
};

export default Filter;
