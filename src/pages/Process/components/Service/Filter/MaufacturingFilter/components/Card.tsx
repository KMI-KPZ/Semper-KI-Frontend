import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import ProcessFilterItem from "./Item";
import { CategoryProps, FilterItemProps } from "../Filter";
import { Container, Heading } from "@component-library/index";
import { Button } from "@component-library/index";
import Collapsible from "@/components/Collapsible/Collapsible";

interface Props {
  category: CategoryProps;
  categoryIndex: number;
  filterItemList: FilterItemProps[];
  setFilterItem(filterItem: FilterItemProps): void;
  handleOnClickMenuOpen(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    category: CategoryProps,
    index: number
  ): void;
}

const ProcessFilterCard: React.FC<Props> = (props) => {
  const {
    category,
    categoryIndex,
    filterItemList,
    setFilterItem,
    handleOnClickMenuOpen,
  } = props;
  const { t } = useTranslation();
  const getCountOfChecktItems = (): string => {
    const count = filterItemList.filter(
      (filterItem: FilterItemProps) => filterItem.isChecked
    ).length;
    return count > 0 ? `(${count})` : "";
  };

  return (
    <Container width="full" direction="col" className="rounded-xl border-2 p-2">
      <Container width="full" justify="start" className="px-5">
        <Heading variant="h3">
          {`${t(
            `enum.FilterCategoryType.${category.title}`
          )} ${getCountOfChecktItems()}`}
        </Heading>
      </Container>
      <Collapsible expand={category.open}>
        {filterItemList.map((filterItem: FilterItemProps, index: number) => (
          <ProcessFilterItem
            key={index}
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        ))}
      </Collapsible>
    </Container>
  );
};

export default ProcessFilterCard;
