import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Container } from "@component-library/index";
import ProcessFilterCard from "./components/Card";
import { AppContext } from "@/pages/App/App";
import { Heading } from "@component-library/index";
import useBodyScroll from "@/hooks/useBodyScroll";
import logger from "@/hooks/useLogger";

interface Props {
  filterOpen: boolean;
  setFilterOpen(open: boolean): void;
  filters: FilterItemProps[];
  applyFilters(filterItemList: FilterItemProps[]): void;
}

interface State {
  filterList: FilterItemProps[];
  categoryList: CategoryProps[];
}

export type FilterCategoryType =
  | "GENERAL"
  | "MODEL"
  | "MATERIAL"
  | "PROCEEDING"
  | "MANUFACTURER"
  | "POSTPROCESSING"
  | "ADDITIVE"
  | "TEST";

export type FilterType =
  | "TEXT"
  | "TEXTAREA"
  | "NUMBER"
  | "DATE"
  | "COLOR"
  | "SLIDER"
  | "SLIDERSELECTION"
  | "SELECTION"
  | "MUILTISELECT";

export interface CategoryProps {
  title: FilterCategoryType;
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
  category: FilterCategoryType;
  type: FilterType;
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
): CategoryProps[] => {
  let stringList: FilterCategoryType[] = [];
  filterItemList.forEach((filterItem: FilterItemProps) => {
    if (!stringList.includes(filterItem.question.category))
      stringList.push(filterItem.question.category);
  });
  let categoryList: CategoryProps[] = [];
  stringList.forEach((category) => {
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

const ManufacturingProcessFilter: React.FC<Props> = (props) => {
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
  const callApplyFilters = () => {
    applyFilters(
      filterList.map((filterItem: FilterItemProps) => {
        let newFilterItem: FilterItemProps = filterItem;
        if (newFilterItem.isChecked === false) newFilterItem.answer = null;
        return newFilterItem;
      })
    );
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
  };
  const handleOnClickApplyButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    callApplyFilters();
  };
  const handleOnClickMenuOpen = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    category: CategoryProps,
    index: number
  ) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      categoryList: [
        ...prevState.categoryList.filter(
          (category: CategoryProps, categoryIndex: number) =>
            categoryIndex < index
        ),
        { title: category.title, open: !category.open },
        ...prevState.categoryList.filter(
          (category: CategoryProps, categoryIndex: number) =>
            categoryIndex > index
        ),
      ],
    }));
  };

  return (
    <Container width="full" direction="col">
      <Container
        width="full"
        justify="start"
        direction="col"
        align="center"
        wrap="wrap"
      >
        {categoryList.map((category: CategoryProps, categoryIndex: number) => (
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
      </Container>
      <Container width="full">
        <Button
          size="sm"
          onClick={handleOnClickResetButton}
          title={t("Service.Manufacturing.Filter.Filter.button.reset")}
        />
        <Button
          size="sm"
          onClick={handleOnClickApplyButton}
          title={t("Service.Manufacturing.Filter.Filter.button.apply")}
        />
      </Container>
    </Container>
    // </div>
  );
};

export default ManufacturingProcessFilter;
