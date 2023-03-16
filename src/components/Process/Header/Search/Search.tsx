import React, { useContext, useState } from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import { ProcessContext } from "../../ProcessView";

const Search: React.FC = () => {
  const { processState, setGridState, searchModels } =
    useContext(ProcessContext);
  const [search, setSearch] = useState<string>("");

  const handleClickButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    grid: boolean
  ) => {
    e.preventDefault();
    setGridState(grid);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  };

  const handleOnClickSearchButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    searchModels(search);
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row w-[70%]">
        <input
          type="text"
          className="border-none pl-5 w-[85%] bg-gray-200"
          placeholder={"Suche ..."}
          autoFocus
          value={search}
          onChange={handleOnChangeInput}
        />
        <div
          className="flex flex-row w-[15%] justify-center items-center bg-gray-300"
          onClick={handleOnClickSearchButton}
        >
          <SearchIcon className="text-white scale-150" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center bg-gray-200 p-2 w-20">
        <SortIcon className="search-icon-sort" />
      </div>
      <div
        className={`flex flex-row items-center justify-center bg-gray-200 p-2 w-20 ${
          processState.grid ? "bg-gray-500" : ""
        }`}
        onClick={(e) => handleClickButton(e, true)}
      >
        <div className="grid grid-cols-2 gap-0">
          <RectangleIcon className="" />
          <RectangleIcon className="" />
          <RectangleIcon className="" />
          <RectangleIcon className="" />
        </div>
      </div>
      <div
        className={`flex flex-row items-center justify-center bg-gray-200 p-2 w-20 ${
          processState.grid ? "" : "bg-gray-500"
        }`}
        onClick={(e) => handleClickButton(e, false)}
      >
        <div className="flex flex-col justify-between scale-x-[300%]">
          <RectangleIcon />
          <RectangleIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
