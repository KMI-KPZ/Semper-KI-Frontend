import { IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import ProcessFilterItem from "./Item";
import { CategoryProps, FilterItemProps } from "../Filter";
import { Heading } from "@component-library/Typography";

interface Props {
  category: CategoryProps;
  categoryIndex: number;
  filterItemList: FilterItemProps[];
  setFilterItem(filterItem: FilterItemProps): void;
  handleOnClickMenuOpen(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
    <div className="bg-gray-100 p-3">
      <div className="flex flex-row items-center justify-between">
        <Heading variant="h3">
          {`${t(
            `enum.FilterCategoryType.${category.title}`
          )} ${getCountOfChecktItems()}`}
        </Heading>
        <IconButton
          onClick={(e) => handleOnClickMenuOpen(e, category, categoryIndex)}
        >
          {category.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      {category.open
        ? filterItemList.map((filterItem: FilterItemProps, index: number) => (
            <ProcessFilterItem
              key={index}
              filterItem={filterItem}
              setFilterItem={setFilterItem}
            />
          ))
        : null}
    </div>
  );
};

export default ProcessFilterCard;
