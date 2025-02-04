import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import useFilter from "@/hooks/useFilter";
import {
  CategoryProps,
  generateFilterCategoryList,
} from "../../../../Filter/components/FilterEdit";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";
import ProcessFilterCard from "../../../../Filter/components/Card";

interface Props {}

const ProcessMaterialFilter: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { editFilters, applyFilters, resetFilters, setEditFilters } =
    useFilter();

  const [categoryList, setCategoryList] = useState<CategoryProps[]>(
    generateFilterCategoryList(editFilters)
  );

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

  const getAllCheckFilterItems = (): FilterItemProps[] => {
    return editFilters.filter((item) => item.isChecked === true);
  };

  return (
    <Container
      width="full"
      justify="start"
      direction="col"
      align="start"
      wrap="wrap"
      className="gap-3 rounded-md border-2 p-3 px-5"
    >
      <Heading variant="h3">
        {t(
          "Process.components.Service.ServiceEdit.Manufacturing.Material.components.Filter.heading"
        )}
      </Heading>
      {categoryList.length > 0 ? (
        categoryList
          .filter((category) => category.title === "MATERIAL")
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
                          filterItem.question.category === category.title
                      )
                }
                setFilterItem={setFilterItem}
                key={categoryIndex}
              />
            </Fragment>
          ))
      ) : (
        <Container width="full">
          <Text>{t("Process.components.Service.Filter.noCategory")}</Text>
        </Container>
      )}
      <Container width="full">
        <Button
          size="xs"
          onClick={handleOnClickResetButton}
          title={t("general.button.reset")}
        />
        <Button
          size="xs"
          variant="primary"
          onClick={handleOnClickApplyButton}
          title={t("general.button.apply")}
        />
      </Container>
    </Container>
  );
};

export default ProcessMaterialFilter;
