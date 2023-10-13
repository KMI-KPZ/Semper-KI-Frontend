import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

import { Button } from "@component-library/Button";
import ProcessFilterCard from "./components/Card";
import { AppContext } from "@/pages/App/App";
import { Heading } from "@component-library/Typography";
import useBodyScroll from "@/pages/App/hooks/useBodyScroll";

interface Props {
  filterOpen: boolean;
  setFilterOpen(open: boolean): void;
  filters: FilterItemProps[];
  applyFilters(filterItemList: FilterItemProps[]): void;
}

interface State {
  filterList: FilterItemProps[];
  categoryList: ICategory[];
}

export interface ICategory {
  title: string;
  open: boolean;
}

export interface FilterItemProps {
  id: number;
  isChecked: boolean;
  isOpen: boolean;
  question: FilterQuestionProps;
  answer: FilterAnswerProps | null;
}

export interface FilterQuestionProps {
  isSelectable: boolean;
  title: string;
  category: string;
  type: string;
  values: string[] | null;
  range: number[] | null;
  units: string[] | string | null;
}

export interface FilterAnswerProps {
  unit: string | null;
  value: string | string[] | number | RangeMinMaxProps;
}

export interface RangeMinMaxProps {
  min: number;
  max: number;
}

const generateCategoryList = (
  filterItemList: FilterItemProps[]
): ICategory[] => {
  let stringList: string[] = [];
  filterItemList.forEach((filterItem: FilterItemProps) => {
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
  filter: FilterItemProps[],
  guideAnswers: FilterItemProps[]
): FilterItemProps[] => {
  let filteritems: FilterItemProps[] = filter;
  filteritems.forEach((filterItem: FilterItemProps, index: number) => {
    guideAnswers.forEach((guideItem: FilterItemProps) => {
      if (filterItem.id === guideItem.id) {
        filteritems[index].answer = guideItem.answer;
        filteritems[index].isChecked = guideItem.isChecked;
        filteritems[index].isOpen = guideItem.isOpen;
      }
    });
  });
  return filteritems;
};

const ProcessFilter: React.FC<Props> = (props) => {
  const { setAppState } = useContext(AppContext);
  const {
    applyFilters,
    filters,
    filterOpen,
    setFilterOpen: parentSetFilterOpen,
  } = props;
  const guideAnswers: FilterItemProps[] = [];
  const hydratedFilterList: FilterItemProps[] = hydrateFilter(
    filters,
    guideAnswers
  );
  const [state, setState] = useState<State>({
    filterList: hydratedFilterList,
    categoryList: generateCategoryList(hydratedFilterList),
  });
  const { categoryList, filterList } = state;
  const { t } = useTranslation();
  const { setScroll } = useBodyScroll();
  const callApplyFilters = () => {
    applyFilters(
      filterList.map((filterItem: FilterItemProps) => {
        let newFilterItem: FilterItemProps = filterItem;
        if (newFilterItem.isChecked === false) newFilterItem.answer = null;
        return newFilterItem;
      })
    );
  };
  const setFilterOpen = (open: boolean) => {
    parentSetFilterOpen(open);
    setScroll(open);
  };

  const setFilterItem = (newFilterItem: FilterItemProps) => {
    setState((prevState) => ({
      ...prevState,
      filterList: [
        ...prevState.filterList.filter(
          (filterItem: FilterItemProps) => filterItem.id < newFilterItem.id
        ),
        newFilterItem,
        ...prevState.filterList.filter(
          (filterItem: FilterItemProps) => filterItem.id > newFilterItem.id
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
      filterList: prevState.filterList.map((filterItem: FilterItemProps) => {
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
        <Heading variant="h2">
          {t("Service.Manufacturing.Filter.Filter.header")}
        </Heading>
        {categoryList.map((category: ICategory, categoryIndex: number) => (
          <ProcessFilterCard
            category={category}
            categoryIndex={categoryIndex}
            filterItemList={filterList.filter(
              (filterItem: FilterItemProps) =>
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
          title={t("Service.Manufacturing.Filter.Filter.button.reset")}
        />
        <Button
          onClick={handleOnClickApplyButton}
          title={t("Service.Manufacturing.Filter.Filter.button.apply")}
        />
      </div>
    </div>
  );
};

export default ProcessFilter;
