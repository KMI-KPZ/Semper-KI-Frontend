import React, { useContext, useEffect, useState } from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import { ProcessContext } from "../../ProcessView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTranslation } from "react-i18next";

const Search: React.FC = () => {
  const { processState, setGridState, searchModels, setFilterOpen } =
    useContext(ProcessContext);
  const [search, setSearch] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOnClickGridButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    grid: boolean
  ) => {
    e.preventDefault();
    setGridState(grid);
  };
  const handleOnClickFilterButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFilterOpen(true);
  };

  useEffect(() => {
    if (touched === true) searchModels(search.toLocaleLowerCase());
  }, [search]);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (touched === false) setTouched(true);
    setSearch(e.currentTarget.value);
  };

  const handleOnClickSearchButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    searchModels(search);
  };

  return (
    <div className="flex flex-row flex-wrap gap-3 2xl:flex-nowrap w-full justify-between">
      <div className="flex flex-row w-full 2xl:w-[70%]">
        <input
          type="text"
          className="border-none pl-5 w-[85%] bg-gray-200"
          placeholder={t("Process.Header.Search.placeholder")}
          autoFocus
          value={search}
          onChange={handleOnChangeInput}
        />
        <div
          className="flex flex-row w-[15%] justify-center items-center bg-gray-300 text-white"
          onClick={handleOnClickSearchButton}
        >
          <SearchIcon fontSize="large" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center bg-gray-200 p-2 w-20 hover:cursor-pointer hover:bg-gray-300">
        <SortIcon fontSize="large" />
      </div>
      <div
        onClick={handleOnClickFilterButton}
        className="2xl:hidden flex flex-row items-center justify-center bg-gray-200 p-2 w-20 hover:cursor-pointer hover:bg-gray-300"
      >
        <FilterAltIcon fontSize="large" />
      </div>
      <div
        className={`flex flex-row items-center justify-center bg-gray-200 p-2 w-20 hover:cursor-pointer hover:bg-gray-300 ${
          processState.grid ? "bg-gray-400" : ""
        }`}
        onClick={(e) => handleOnClickGridButton(e, true)}
      >
        <div className="flex flex-row justify-between">
          <RectangleIcon />
          <RectangleIcon />
        </div>
      </div>
      <div
        className={`flex flex-row items-center justify-center bg-gray-200 p-2 w-20 hover:cursor-pointer hover:bg-gray-300 ${
          processState.grid ? "" : "bg-gray-400"
        }`}
        onClick={(e) => handleOnClickGridButton(e, false)}
      >
        <div className="flex flex-col justify-between">
          <RectangleIcon />
          <RectangleIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
