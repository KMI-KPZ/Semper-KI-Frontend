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
import {
  FilterCategoryType,
  FilterItemProps,
} from "@/api/Filter/Querys/useGetFilters";
interface Props {}

export interface CategoryProps {
  title: FilterCategoryType;
  open: boolean;
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
  stringList.forEach((category, index) => {
    categoryList.push({
      title: category,
      open: index === 0 ? true : false,
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
    setCategoryList((prev) =>
      prev.map((category) => ({
        ...category,
        open: category.title === "SELECTED" ? true : false,
      }))
    );
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
    <Container
      width="full"
      direction="col"
      className="gap-0 rounded-md border-2 p-5"
    >
      <Container width="full" justify="start">
        <Heading variant="h3">
          {t("Process.components.Filter.Filter.pageTitle")}
        </Heading>
      </Container>

      <Collapsible initialOpen showButton logName="Filter" animation={false}>
        <Container width="full" direction="col" className="my-5">
          <Container width="full" direction="col">
            <Container width="full" direction="col" className="gap-0 p-0">
              <Container
                direction="row"
                width="full"
                wrap="wrap"
                justify="start"
                className="gap-0 "
              >
                {categoryList.map((category, index, allCategorys) => (
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
                      className={`rounded-none border-2 border-b-0 border-gray-400 shadow-none
                        ${
                          index === 0
                            ? "rounded-t-md md:rounded-tl-md md:rounded-tr-none md:border-r-0"
                            : ""
                        } 
                      ${
                        index === allCategorys.length - 1
                          ? "md:rounded-tr-md  md:border-l-0 "
                          : ""
                      }`}
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
                className="gap-3  rounded-md rounded-tl-none border-2 border-gray-400 p-5"
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
                  <Container width="full">
                    <Text>
                      {t("Service.Manufacturing.Filter.Filter.noCategory")}
                    </Text>
                  </Container>
                )}
              </Container>
            </Container>
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
                  title={t("Service.Manufacturing.Filter.Filter.button.apply")}
                />
              </Badge>
            </Container>
          </Container>
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ProcessFilter;
