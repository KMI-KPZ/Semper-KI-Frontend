import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItem } from "./Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const FilterItem: React.FC<Props> = ({ filterItem, setFilterItem }) => {
  const { t } = useTranslation();

  const displayInput = () => {
    switch (filterItem.question.type) {
      case "slider":
        return <>Slider</>;
        break;
      case "selection":
        return <>Selection</>;
        break;
      default:
        return <></>;
        break;
    }
  };

  return (
    <div className="filter-item">
      <div className="filter-item-header">
        <input type="checkbox" />
        <h3>{filterItem.question.title}</h3>
      </div>
      <div>{filterItem.isChecked ? displayInput() : ""}</div>
    </div>
  );
};

export default FilterItem;
