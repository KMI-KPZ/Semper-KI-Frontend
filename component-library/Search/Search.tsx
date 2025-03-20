import React from "react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  handleSearchInputChange: (search: string) => void;
  style?: React.CSSProperties;
}

export const Search: React.FC<SearchProps> = (props) => {
  const { handleSearchInputChange, style } = props;
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
    <div className="flex w-full flex-col gap-5 md:flex-row">
      <input
        style={style}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        defaultValue=""
        className="flex w-full rounded-md border-2 p-3"
        type="search"
        placeholder={t("component-library.Search.placeholder")}
      />
    </div>
  );
};
