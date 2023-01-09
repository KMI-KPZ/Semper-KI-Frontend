import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItem, IFilterAnswer } from "./Interface";
import "./Filter.scss";
import FilterItem from "./FilterItem";
import { Button, IconButton } from "@mui/material";

import _filter from "./FilterQuestions.json";
const testFilter = _filter as IFilterItem[];

interface Props {
  guideAnswers: IFilterItem[];
  applyFilters(filterItemList: IFilterItem[]): void;
}

interface State {
  filterList: IFilterItem[];
}

const hydrateFilter = (guideAnswers: IFilterItem[]): IFilterItem[] => {
  let filteritems: IFilterItem[] = testFilter;
  filteritems.forEach((filterItem: IFilterItem, index: number) => {
    guideAnswers.forEach((guideItem: IFilterItem) => {
      if (filterItem.id === guideItem.id) {
        filteritems[index].answer = guideItem.answer;
        filteritems[index].isChecked = guideItem.isChecked;
        filteritems[index].isOpen = guideItem.isOpen;
      }
    });
  });
  return filteritems;
};

const Filter: React.FC<Props> = ({ applyFilters, guideAnswers }) => {
  const [state, setState] = useState<State>({
    filterList: hydrateFilter(guideAnswers),
  });
  const { t } = useTranslation();

  const setFilterItems = (filter: IFilterItem[]) => {
    setState((prevState) => ({ ...prevState, filter }));
  };

  const setFilterItem = (newFilterItem: IFilterItem) => {
    setState((prevState) => ({
      ...prevState,
      filterList: [
        ...prevState.filterList.filter(
          (filterItem: IFilterItem) => filterItem.id < newFilterItem.id
        ),
        newFilterItem,
        ...prevState.filterList.filter(
          (filterItem: IFilterItem) => filterItem.id > newFilterItem.id
        ),
      ],
    }));
  };

  const onClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      filterList: prevState.filterList.map((filterItem: IFilterItem) => {
        let newFilterItem = filterItem;
        newFilterItem.answer = null;
        newFilterItem.isChecked = false;
        newFilterItem.isOpen = false;
        return newFilterItem;
      }),
    }));
  };

  const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    applyFilters(
      state.filterList.map((filterItem: IFilterItem) => {
        let newFilterItem: IFilterItem = filterItem;
        if (newFilterItem.isChecked === false) newFilterItem.answer = null;
        return newFilterItem;
      })
    );
  };

  return (
    <div className="filter">
      <h2 className="filter-headline">{t("filter.headline")}</h2>
      <hr className="filter-hr large" />

      {state.filterList.map((filterItem: IFilterItem, index: number) => (
        <FilterItem
          key={index}
          filterItem={filterItem}
          setFilterItem={setFilterItem}
        />
      ))}
      {
        <div className="filter-buttons">
          <Button variant="contained" onClick={onClickReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={onClickApply}>
            Anwenden
          </Button>
        </div>
      }
    </div>
  );
};

export default Filter;
