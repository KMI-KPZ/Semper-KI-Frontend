import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOptionType, IFilterItemType } from "./Interface";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterItemOption from "./FilterItemOption";

interface Props {
  setFilter(id: number, name: string, value: any): void;
  setFilterOption(filterId: number, id: number, name: string, value: any): void;
  filter: IFilterItemType;
}

const FilterItem = ({ setFilterOption, setFilter, filter }: Props) => {
  const { t } = useTranslation();

  const handleClickIconButtonHeader = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFilter(filter.id, "open", !filter.open);
  };

  const setFilterOptionWarpped = (
    id: number,
    name: string,
    value: any
  ): void => {
    setFilterOption(filter.id, id, name, value);
  };

  return (
    <div className="filter-item">
      <div className="filter-item-header">
        <h3>{t(`filter.${filter.title}.headline`)}</h3>
        <IconButton onClick={handleClickIconButtonHeader}>
          {filter.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      <hr className="filter-hr small" />
      {filter.open ? (
        <>
          {filter.options.map(
            (option: IFilterItemOptionType, index: number) => (
              <FilterItemOption
                setFilterOption={setFilterOptionWarpped}
                filter={filter}
                option={option}
                key={index}
              />
            )
          )}
        </>
      ) : null}
    </div>
  );
};

export default FilterItem;
