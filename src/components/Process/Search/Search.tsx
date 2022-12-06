import React, { useState } from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import "./Search.scss";

interface Props {
  handleClickGrid(grid: boolean): void;
  headline: string;
  placeholder: string;
  grid: boolean;
}

const Search = ({ grid, handleClickGrid, headline, placeholder }: Props) => {
  const handleClickButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    grid: boolean
  ) => {
    e.preventDefault();
    handleClickGrid(grid);
  };

  return (
    <div className="search-box">
      <h1 className="search-headline">{headline}</h1>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
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
          className={`search-button ${grid ? "active" : ""}`}
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
          className={`search-button ${grid ? "" : "active"}`}
          onClick={(e) => handleClickButton(e, false)}
        >
          <div className="search-icon-lists">
            <RectangleIcon className="search-icon-list" />
            <RectangleIcon className="search-icon-list" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
