import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RangeSlider from "./components/RangeSlider";
import RangeSliderUnit from "./components/RangeSliderUnit";
import Selection from "./components/Selection";
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
        return (
          <RangeSlider filterItem={filterItem} setFilterItem={setFilterItem} />
        );
        break;
      case "sliderselection":
        return (
          <RangeSliderUnit
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
        break;
      case "selection":
        return (
          <Selection filterItem={filterItem} setFilterItem={setFilterItem} />
        );
        break;
      default:
        return <></>;
        break;
    }
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterItem({
      ...filterItem,
      isChecked: !filterItem.isChecked,
    });
  };

  return (
    <div className="filter-item">
      <div className="filter-item-header">
        <input
          type="checkbox"
          checked={filterItem.isChecked}
          onChange={handleChangeCheckbox}
        />
        <h3>{filterItem.question.title}</h3>
      </div>
      <div>{filterItem.isChecked ? displayInput() : ""}</div>
    </div>
  );
};

export default FilterItem;
