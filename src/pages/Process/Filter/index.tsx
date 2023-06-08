import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

import { Button } from "@component-library/Button";
import FilterCard from "./components/card";
import { IProgress } from "..";
import { AppContext } from "@/pages/App";
import { Heading } from "@component-library/Typography";

interface Props {
  filterOpen: boolean;
  setFilterOpen(open: boolean): void;
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

export interface IFilterItem {
  id: number;
  isChecked: boolean;
  isOpen: boolean;
  question: IFilterQuestion;
  answer: IFilterAnswer | null;
}

export interface IFilterQuestion {
  isSelectable: boolean;
  title: string;
  category: string;
  type: string;
  values: string[] | null;
  range: number[] | null;
  units: string[] | string | null;
}

export interface IFilterAnswer {
  unit: string | null;
  value: string | string[] | number | IRangeMinMax;
}

export interface IRangeMinMax {
  min: number;
  max: number;
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
  const { setAppState } = useContext(AppContext);
  const {
    applyFilters,
    filters,
    guideAnswers,
    progress,
    filterOpen,
    setFilterOpen,
  } = props;
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
  const handleOnClickResetButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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
    setFilterOpen(false);
  };
  const handleOnClickApplyButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    callApplyFilters();
    setFilterOpen(false);
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
  const handleOnClickCloseButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setFilterOpen(false);
  };

  useEffect(() => {
    setAppState((prevState) => ({ ...prevState, stopScroll: filterOpen }));
  }, [filterOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1536) setFilterOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`h-fit flex-col justify-between gap-10 bg-white p-5 2xl:flex ${
        filterOpen === true
          ? "absolute left-0 right-0 top-0 flex h-fit w-screen flex-col justify-between gap-10 overflow-x-hidden overflow-y-scroll bg-white p-5"
          : "hidden"
      }`}
    >
      <div className="flex flex-col justify-start gap-2 overflow-x-hidden">
        <div className="flex w-full flex-row-reverse xl:hidden">
          <div
            className="p-3 hover:cursor-pointer hover:bg-gray-300"
            onClick={handleOnClickCloseButton}
          >
            <CloseIcon fontSize="large" />
          </div>
        </div>
        <Heading variant="h2">{t("Process.Filter.Filter.header")}</Heading>
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
      <div className="flex flex-col justify-center gap-2 text-white xl:flex-row">
        <Button
          onClick={handleOnClickResetButton}
          title={t("Process.Filter.Filter.button.reset")}
        />
        <Button
          onClick={handleOnClickApplyButton}
          title={t("Process.Filter.Filter.button.apply")}
        />
      </div>
    </div>
  );
};

export default Filter;
