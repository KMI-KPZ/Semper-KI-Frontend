import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  headline: string;
  placeholder: string;
}

const Search = ({ headline, placeholder }: Props) => {
  return (
    <div className="process-box vertical headline-search">
      <div className="process-container">
        <h1>{headline}</h1>
      </div>
      <div className="process-container horizontal">
        <input
          type="text"
          className="input-field"
          placeholder={placeholder}
          autoFocus
        />
        <div className="settings button light">
          <SettingsIcon />
        </div>
        <div className="search button dark">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
