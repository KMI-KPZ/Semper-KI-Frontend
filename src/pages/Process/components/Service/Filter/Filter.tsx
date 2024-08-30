import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Badge,
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import ProcessFilterCard from "./components/Card";
import useFilter from "@/hooks/useFilter";
import Collapsible from "@/components/Collapsible/Collapsible";
interface Props {}

export type FilterCategoryType =
  | "SELECTED"
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
  let categoryList: CategoryProps[] = [{ open: false, title: "SELECTED" }];
  stringList.forEach((category) => {
    categoryList.push({
      title: category,
      open: category === "GENERAL" ? true : false,
    });
  });
  return categoryList;
};

const ProcessFilter: React.FC<Props> = (props) => {
  const {} = props;

  const {
    editFilters,
    differenzCount,
    applyFilters,
    cancelFilters,
    resetFilters,
    setEditFilters,
  } = useFilter();
  const [categoryList, setCategoryList] = useState<CategoryProps[]>(
    generateCategoryList(editFilters)
  );
  const { t } = useTranslation();

  const setFilterItem = (newFilterItem: FilterItemProps) => {
    setEditFilters((prevState) => [
      ...prevState.filter(
        (filterItem: FilterItemProps) => filterItem.id < newFilterItem.id
      ),
      newFilterItem,
      ...prevState.filter(
        (filterItem: FilterItemProps) => filterItem.id > newFilterItem.id
      ),
    ]);
  };

  const handleOnClickResetButton = () => {
    resetFilters();
  };

  const handleOnClickApplyButton = () => {
    applyFilters();
  };

  const handleOnClickCancelButton = () => {
    cancelFilters();
  };

  const handleOnClickMenuOpen = (category: CategoryProps, index: number) => {
    setCategoryList((prevState) => [
      ...prevState
        .filter((_, categoryIndex: number) => categoryIndex < index)
        .map((filter) => ({ ...filter, open: false })),
      { title: category.title, open: true },
      ...prevState
        .filter((_, categoryIndex: number) => categoryIndex > index)
        .map((filter) => ({ ...filter, open: false })),
    ]);
  };

  const getCountOfChecktItems = (title: FilterCategoryType): number => {
    // return Math.floor(Math.random() * 10000);
    if (title === "SELECTED")
      return editFilters.filter(
        (filterItem: FilterItemProps) => filterItem.isChecked
      ).length;

    return editFilters
      .filter(
        (filterItem: FilterItemProps) => filterItem.question.category === title
      )
      .filter((filterItem: FilterItemProps) => filterItem.isChecked).length;
  };

  const getAllCheckFilterItems = (): FilterItemProps[] => {
    return editFilters.filter((item) => item.isChecked === true);
  };

  return (
    <Container width="full" direction="col" className="gap-0 p-5">
      <Container width="full" justify="start">
        <Heading variant="h3">
          {t("Process.components.Filter.Filter.pageTitle")}
        </Heading>
      </Container>

      <Collapsible initialOpen showButton logName="Filter" animation={false}>
        <Container width="full" direction="col" className="my-5">
          <Container width="full" direction="col">
            <Container direction="row" wrap="wrap" className="">
              {categoryList.map((category, index) => (
                <Badge
                  count={getCountOfChecktItems(category.title)}
                  key={index}
                >
                  <Button
                    key={index}
                    title={t(`enum.FilterCategoryType.${category.title}`)}
                    size="sm"
                    variant={category.open ? "primary" : "secondary"}
                    onClick={() => handleOnClickMenuOpen(category, index)}
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
              className="gap-3 rounded-xl border-2 p-5"
            >
              {categoryList.filter((category) => category.open).length > 0 ? (
                categoryList
                  .filter((category) => category.open)
                  .map((category: CategoryProps, categoryIndex: number) => (
                    <Fragment key={categoryIndex}>
                      {categoryIndex !== 0 ? <Divider /> : null}
                      <ProcessFilterCard
                        category={category}
                        filterItemList={
                          category.title === "SELECTED"
                            ? getAllCheckFilterItems()
                            : editFilters.filter(
                                (filterItem: FilterItemProps) =>
                                  filterItem.question.category ===
                                  category.title
                              )
                        }
                        setFilterItem={setFilterItem}
                        key={categoryIndex}
                      />
                    </Fragment>
                  ))
              ) : (
                <Container
                  width="full"
                  // className="rounded-xl border-2 p-5"
                >
                  <Text>
                    {t("Service.Manufacturing.Filter.Filter.noCategory")}
                  </Text>
                </Container>
              )}
              <Container width="full">
                <Button
                  size="sm"
                  onClick={handleOnClickResetButton}
                  title={t("Service.Manufacturing.Filter.Filter.button.reset")}
                />
                <Button
                  size="sm"
                  active={differenzCount > 0}
                  onClick={handleOnClickCancelButton}
                  title={t("Service.Manufacturing.Filter.Filter.button.cancel")}
                />
                <Badge count={differenzCount}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleOnClickApplyButton}
                    title={t(
                      "Service.Manufacturing.Filter.Filter.button.apply"
                    )}
                  />
                </Badge>
              </Container>
            </Container>
          </Container>
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ProcessFilter;
