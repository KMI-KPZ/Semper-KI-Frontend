import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOption, IFilterItem, IFilterAnswer } from "./Interface";
import "./Filter.scss";
import FilterItem from "./FilterItem";
import { Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import _filter from "./FilterQuestions.json";
const filter = _filter as IFilterItem[];

interface Props {
  filter: IFilterItem[];
  filterAnswers: IFilterAnswer[];
  applyFilters(): void;
  setFilterItems(filterItems: IFilterItem[]): void;
  setFilterAnswer(filterAnswers: IFilterAnswer): void;
  setFilterAnswers(filterAnswers: IFilterAnswer[]): void;
}

interface State {
  open: boolean;
}

const Filter: React.FC<Props> = ({
  filter,
  filterAnswers,
  applyFilters,
  setFilterItems,
  setFilterAnswer,
  setFilterAnswers,
}) => {
  const [state, setState] = useState<State>({
    open: true,
  });
  const { t } = useTranslation();

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

  const onClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFilterAnswers([]);
  };

  const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    applyFilters();
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
              filterAnswers={filterAnswers}
              setFilterOpen={setFilterOpen}
              setFilterAnswer={setFilterAnswer}
            />
          ))
        : ""}
      {state.open ? (
        <div className="filter-buttons">
          <Button variant="contained" onClick={onClickReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={onClickApply}>
            Anwenden
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Filter;
