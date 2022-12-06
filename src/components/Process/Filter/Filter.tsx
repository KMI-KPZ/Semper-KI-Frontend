import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import getFilterData, {
  FilterItemOptionType,
  FilterItemType,
} from "./FilterData";
import "./Filter.scss";
import FilterItem from "./FilterItem";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {}

interface State {
  filter: FilterItemType[];
  open: boolean;
}

const Filter = (props: Props) => {
  const [state, setState] = useState<State>({
    filter: getFilterData(),
    open: true,
  });
  const { t } = useTranslation();

  const setFilter = (id: number, name: string, value: any): void => {
    console.log("setFilter: ", id, name, value);

    setState((prevState) => ({
      ...prevState,
      filter: [
        ...prevState.filter.filter((filter: FilterItemType) => filter.id < id),
        {
          ...prevState.filter.filter(
            (filter: FilterItemType) => filter.id === id
          )[0],
          [name]: value,
        },
        ...prevState.filter.filter((filter: FilterItemType) => filter.id > id),
      ],
    }));
  };

  const setFilterOption = (
    filterId: number,
    id: number,
    name: string,
    value: any
  ): void => {
    console.log("setFilterOption: ", filterId, id, name, value);

    setState((prevState) => ({
      ...prevState,
      filter: [
        ...prevState.filter.filter(
          (filter: FilterItemType) => filter.id < filterId
        ),
        {
          ...prevState.filter.filter(
            (filter: FilterItemType) => filter.id === filterId
          )[0],
          options: [
            ...prevState.filter
              .filter((filter: FilterItemType) => filter.id === filterId)[0]
              .options.filter((option: FilterItemOptionType) => option.id < id),
            {
              ...prevState.filter
                .filter((filter: FilterItemType) => filter.id === filterId)[0]
                .options.filter(
                  (option: FilterItemOptionType) => option.id === id
                )[0],
              [name]: value,
            },
            ...prevState.filter
              .filter((filter: FilterItemType) => filter.id === filterId)[0]
              .options.filter((option: FilterItemOptionType) => option.id > id),
          ],
        },
        ...prevState.filter.filter(
          (filter: FilterItemType) => filter.id > filterId
        ),
      ],
    }));
  };

  const handleClickIconButtonHeader = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  return (
    <div className={`filter ${state.open ? "open" : "closed"}`}>
      <h2 className="filter-headline">
        {state.open ? <>{t("filter.headline")}</> : ""}
        <IconButton
          sx={{ transform: "rotate(-90deg)" }}
          onClick={handleClickIconButtonHeader}
        >
          {state.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </h2>
      {state.open ? <hr className="filter-hr large" /> : ""}
      {state.open
        ? state.filter.map((filter: FilterItemType, index: number) => (
            <FilterItem
              key={index}
              setFilter={setFilter}
              filter={filter}
              setFilterOption={setFilterOption}
            />
          ))
        : ""}
    </div>
  );
};

export default Filter;
