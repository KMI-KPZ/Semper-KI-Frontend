import React from "react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  handleSearchInputChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = (props) => {
  const { handleSearchInputChange } = props;
  const { t } = useTranslation();
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchInputChange(event.target.value);
  };
  return (
    <form className="flex w-full flex-col gap-5 md:flex-row">
      <input
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        defaultValue=""
        className="flex w-full bg-slate-100 p-3"
        type="search"
        placeholder={t("Admin.User.search")}
      />
    </form>
  );
};

export default Search;
