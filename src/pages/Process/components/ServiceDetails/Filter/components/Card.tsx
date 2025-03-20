import React from "react";
import { useTranslation } from "react-i18next";
import ProcessFilterItem from "./Item";
import { Container, Text } from "@component-library/index";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";
import { CategoryProps } from "./FilterEdit";

interface Props {
  category: CategoryProps;
  filterItemList: FilterItemProps[];
  setFilterItem(filterItem: FilterItemProps): void;
}

const ProcessFilterCard: React.FC<Props> = (props) => {
  const { category, filterItemList, setFilterItem } = props;
  const { t } = useTranslation();
  // const getCountOfChecktItems = (): string => {
  //   const count = filterItemList.filter(
  //     (filterItem: FilterItemProps) => filterItem.isChecked
  //   ).length;
  //   return count > 0 ? `(${count})` : "";
  // };

  return (
    <Container width="full" direction="col" items="start" className="gap-0 p-0">
      {/* <Container width="full" justify="start" className="px-3 pb-2">
        <Heading variant="h3">
          {`${t(
            `enum.FilterCategoryType.${category.title}`
          )} ${getCountOfChecktItems()}`}
        </Heading>
      </Container> */}
      {filterItemList.length > 0 ? (
        filterItemList.map((filterItem: FilterItemProps, index: number) => (
          <ProcessFilterItem
            key={index}
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        ))
      ) : (
        <Container
          width="full"
          className="pb-3"
          direction="col"
          items="center"
          justify="center"
        >
          <Text>
            {category.title === "SELECTED"
              ? t(
                  "Process.components.Service.Filter.components.Card.noSelectedFitlers"
                )
              : t(
                  "Process.components.Service.Filter.components.Card.noFilters"
                )}
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default ProcessFilterCard;
