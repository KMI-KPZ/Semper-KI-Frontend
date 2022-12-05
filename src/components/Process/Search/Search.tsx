import React from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import "./Search.scss";

interface Props {
  headline: string;
  placeholder: string;
}

const Search = ({ headline, placeholder }: Props) => {
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
        <div className="search-button">
          <div className="search-icon-cards">
            <RectangleIcon className="search-icon-card" />
            <RectangleIcon className="search-icon-card" />
            <RectangleIcon className="search-icon-card" />
            <RectangleIcon className="search-icon-card" />
          </div>
        </div>
        <div className="search-button">
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
