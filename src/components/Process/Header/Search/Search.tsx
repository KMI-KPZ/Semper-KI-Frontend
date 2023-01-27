import React, { useContext, useState } from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import "./Search.scss";
import { ProcessContext } from "../../ProcessView";

const Search = () => {
  const { processState } = useContext(ProcessContext);
  const handleClickButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    grid: boolean
  ) => {
    e.preventDefault();
    // handleClickGrid(processState.grid);
  };

  return (
    <div className="search-box">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder={"Suche ..."}
          autoFocus
        />
        <div className="search-input-icon-box">
          <SearchIcon className="search-input-icon" />
        </div>
      </div>
      <div className="search-button">
        <SortIcon className="search-icon-sort" />
      </div>
      <div
        className={`search-button ${processState.grid ? "active" : ""}`}
        onClick={(e) => handleClickButton(e, true)}
      >
        <div className="search-icon-cards">
          <RectangleIcon className="search-icon-card" />
          <RectangleIcon className="search-icon-card" />
          <RectangleIcon className="search-icon-card" />
          <RectangleIcon className="search-icon-card" />
        </div>
      </div>
      <div
        className={`search-button ${processState.grid ? "" : "active"}`}
        onClick={(e) => handleClickButton(e, false)}
      >
        <div className="search-icon-lists">
          <RectangleIcon className="search-icon-list" />
          <RectangleIcon className="search-icon-list" />
        </div>
      </div>
    </div>
  );
};

export default Search;
