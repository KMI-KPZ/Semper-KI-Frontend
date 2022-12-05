import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import getFilterData, {
  FilterItemOptionType,
  FilterItemType,
} from "./FilterData";
import "./Filter.scss";
import FilterItem from "./FilterItem";

interface Props {}

const Filter = (props: Props) => {
  const [filterData, setFilterData] = useState<FilterItemType[]>(
    getFilterData()
  );
  const { t } = useTranslation();

  const setFilter = (id: number, name: string, value: any): void => {
    console.log("setFilter: ", id, name, value);

    setFilterData((prevState) => [
      ...prevState.filter((filter: FilterItemType) => filter.id < id),
      {
        ...prevState.filter((filter: FilterItemType) => filter.id === id)[0],
        [name]: value,
      },
      ...prevState.filter((filter: FilterItemType) => filter.id > id),
    ]);
  };

  const setFilterOption = (
    filterId: number,
    id: number,
    name: string,
    value: any
  ): void => {
    console.log("setFilterOption: ", filterId, id, name, value);

    setFilterData((prevState) => [
      ...prevState.filter((filter: FilterItemType) => filter.id < filterId),
      {
        ...prevState.filter(
          (filter: FilterItemType) => filter.id === filterId
        )[0],
        options: [
          ...prevState
            .filter((filter: FilterItemType) => filter.id === filterId)[0]
            .options.filter((option: FilterItemOptionType) => option.id < id),
          {
            ...prevState
              .filter((filter: FilterItemType) => filter.id === filterId)[0]
              .options.filter(
                (option: FilterItemOptionType) => option.id === id
              )[0],
            [name]: value,
          },
          ...prevState
            .filter((filter: FilterItemType) => filter.id === filterId)[0]
            .options.filter((option: FilterItemOptionType) => option.id > id),
        ],
      },
      ...prevState.filter((filter: FilterItemType) => filter.id > filterId),
    ]);

    console.log(filterData);
  };

  return (
    <div className="filter">
      <h2 className="filter-headline">{t("filter.headline")}</h2>
      <hr className="filter-hr large" />
      {filterData.map((filter: FilterItemType, index: number) => (
        <FilterItem
          key={index}
          setFilter={setFilter}
          filter={filter}
          setFilterOption={setFilterOption}
        />
      ))}
    </div>
  );
};

export default Filter;
