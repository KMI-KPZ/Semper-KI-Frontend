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
import FMultiSelection from "./components/FMultiSelection";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const FilterItem: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const { t } = useTranslation();

  const displayInput = () => {
    switch (filterItem.question.type) {
      case "slider":
        return (
          <FSlider filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "sliderselection":
        return (
          <FSliderSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "selection":
        return (
          <FSelection filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "multiselection":
        return (
          <FMultiSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "date":
        return <FDate filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "text":
        return <FText filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "textarea":
        return (
          <FTextArea filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "color":
        return <FColor filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "number":
        return (
          <FNumber filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      default:
        return <></>;
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
