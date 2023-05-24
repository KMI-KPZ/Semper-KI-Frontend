import { IconButton } from "@mui/material";
import React from "react";
import { ICategory } from "./Filter";
import { IFilterItem } from "./Interface";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterItem from "./FilterItem";
import { useTranslation } from "react-i18next";

interface Props {
  category: ICategory;
  categoryIndex: number;
  filterItemList: IFilterItem[];
  setFilterItem(filterItem: IFilterItem): void;
  handleOnClickMenuOpen(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: ICategory,
    index: number
  ): void;
}

const FilterCard: React.FC<Props> = (props) => {
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
      (filterItem: IFilterItem) => filterItem.isChecked
    ).length;
    return count > 0 ? `(${count})` : "";
  };

  return (
    <div className="bg-gray-100 p-3">
      <div className="flex flex-row justify-between items-center">
        <h3>
          {t(`Process.Filter.FilterCard.category.${category.title}`)}
          {getCountOfChecktItems()}
        </h3>
        <IconButton
          onClick={(e) => handleOnClickMenuOpen(e, category, categoryIndex)}
        >
          {category.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      {category.open
        ? filterItemList.map((filterItem: IFilterItem, index: number) => (
            <FilterItem
              key={index}
              filterItem={filterItem}
              setFilterItem={setFilterItem}
            />
          ))
        : null}
    </div>
  );
};

export default FilterCard;
