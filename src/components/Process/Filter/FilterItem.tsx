import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItem } from "./Interface";
import FSelection from "./components/FSelection";
import FSliderSelection from "./components/FSliderSelection";
import FSlider from "./components/FSlider";
import FDate from "./components/FDate";
import FText from "./components/FText";
import FTextArea from "./components/FTextArea";
import FColor from "./components/FColor";
import FNumber from "./components/FNumber";

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
          <FSlider filterItem={filterItem} setFilterItem={setFilterItem} />
        );
        break;
      case "sliderselection":
        return (
          <FSliderSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
        break;
      case "selection":
        return (
          <FSelection filterItem={filterItem} setFilterItem={setFilterItem} />
        );
        break;
      case "date":
        return <FDate filterItem={filterItem} setFilterItem={setFilterItem} />;
        break;
      case "text":
        return <FText filterItem={filterItem} setFilterItem={setFilterItem} />;
        break;
      case "textarea":
        return (
          <FTextArea filterItem={filterItem} setFilterItem={setFilterItem} />
        );
        break;
      case "color":
        return <FColor filterItem={filterItem} setFilterItem={setFilterItem} />;
        break;
      case "number":
        return (
          <FNumber filterItem={filterItem} setFilterItem={setFilterItem} />
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
      <div className="filter-item-content">
        {filterItem.isChecked ? displayInput() : ""}
      </div>
    </div>
  );
};

export default FilterItem;
