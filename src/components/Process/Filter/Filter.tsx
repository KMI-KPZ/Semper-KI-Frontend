import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItem } from "./Interface";
import "./Filter.scss";
import { Button } from "@mui/material";

import FilterCard from "./FilterCard";
import { IProgress } from "../../../interface/Interface";

interface Props {
  progress: IProgress;
  filters: IFilterItem[];
  guideAnswers: IFilterItem[];
  applyFilters(filterItemList: IFilterItem[]): void;
}

interface State {
  filterList: IFilterItem[];
  categoryList: ICategory[];
}

export interface ICategory {
  title: string;
  open: boolean;
}

const generateCategoryList = (filterItemList: IFilterItem[]): ICategory[] => {
  let stringList: string[] = [];
  filterItemList.forEach((filterItem: IFilterItem) => {
    if (!stringList.includes(filterItem.question.category))
      stringList.push(filterItem.question.category);
  });
  let categoryList: ICategory[] = [];
  stringList.forEach((category: string) => {
    categoryList.push({ title: category, open: false });
  });
  return categoryList;
};

const hydrateFilter = (
  filter: IFilterItem[],
  guideAnswers: IFilterItem[]
): IFilterItem[] => {
  let filteritems: IFilterItem[] = filter;
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

const Filter: React.FC<Props> = (props) => {
  const { applyFilters, filters, guideAnswers, progress } = props;
  const hydratedFilterList: IFilterItem[] = hydrateFilter(
    filters,
    guideAnswers
  );
  const [state, setState] = useState<State>({
    filterList: hydratedFilterList,
    categoryList: generateCategoryList(hydratedFilterList),
  });
  const { categoryList, filterList } = state;
  const { t } = useTranslation();

  const callApplyFilters = () => {
    applyFilters(
      filterList.map((filterItem: IFilterItem) => {
        let newFilterItem: IFilterItem = filterItem;
        if (newFilterItem.isChecked === false) newFilterItem.answer = null;
        return newFilterItem;
      })
    );
  };

  useEffect(() => {
    callApplyFilters();
  }, [progress]);

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
    callApplyFilters();
  };

  const handleOnClickMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: ICategory,
    index: number
  ) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      categoryList: [
        ...prevState.categoryList.filter(
          (category: ICategory, categoryIndex: number) => categoryIndex < index
        ),
        { title: category.title, open: !category.open },
        ...prevState.categoryList.filter(
          (category: ICategory, categoryIndex: number) => categoryIndex > index
        ),
      ],
    }));
  };

  return (
    <div className="filter">
      <div className="filter-content">
        <h2 className="filter-headline">{t("filter.headline")}</h2>
        {categoryList.map((category: ICategory, categoryIndex: number) => (
          <FilterCard
            category={category}
            categoryIndex={categoryIndex}
            filterItemList={filterList.filter(
              (filterItem: IFilterItem) =>
                filterItem.question.category === category.title
            )}
            handleOnClickMenuOpen={handleOnClickMenuOpen}
            setFilterItem={setFilterItem}
            key={categoryIndex}
          />
        ))}
      </div>
      <div className="filter-buttons">
        <Button variant="contained" onClick={onClickReset}>
          Reset
        </Button>
        <Button variant="contained" onClick={onClickApply}>
          Anwenden
        </Button>
      </div>
    </div>
  );
};

export default Filter;
