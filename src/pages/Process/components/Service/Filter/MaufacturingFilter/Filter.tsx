import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Button, Container, Text } from "@component-library/index";
import ProcessFilterCard from "./components/Card";
interface Props {
  filters: FilterItemProps[];
  applyFilters(filters: FilterItemProps[]): void;
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
  | "MULTISELECTION";

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
    categoryList.push({
      title: category,
      open: category === "GENERAL" ? true : false,
    });
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
  const { applyFilters, filters } = props;
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
          (_, categoryIndex: number) => categoryIndex < index
        ),
        { title: category.title, open: !category.open },
        ...prevState.categoryList.filter(
          (_, categoryIndex: number) => categoryIndex > index
        ),
      ],
    }));
  };

  const getCountOfChecktItems = (title: string): number => {
    // return Math.floor(Math.random() * 10000);
    return filterList
      .filter(
        (filterItem: FilterItemProps) => filterItem.question.category === title
      )
      .filter((filterItem: FilterItemProps) => filterItem.isChecked).length;
  };

  return (
    <Container width="full" direction="col">
      <Container direction="row" wrap="wrap" className="">
        {categoryList.map((category, index) => (
          <Badge count={getCountOfChecktItems(category.title)}>
            <Button
              key={index}
              title={t(`enum.FilterCategoryType.${category.title}`)}
              size="sm"
              variant={category.open ? "primary" : "secondary"}
              onClick={(e) => handleOnClickMenuOpen(e, category, index)}
            />
          </Badge>
        ))}
      </Container>
      <Container
        width="full"
        justify="start"
        direction="col"
        align="center"
        wrap="wrap"
      >
        {categoryList.filter((category) => category.open).length > 0 ? (
          categoryList
            .filter((category) => category.open)
            .map((category: CategoryProps, categoryIndex: number) => (
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
            ))
        ) : (
          <Container width="full" className="rounded-xl border-2 p-5">
            <Text>{t("Service.Manufacturing.Filter.Filter.noCategory")}</Text>
          </Container>
        )}
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
