import { on } from "events";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SearchProps {
  handleSearchInputChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = (props) => {
  const { handleSearchInputChange } = props;
  const { t } = useTranslation();
  const { register, watch } = useForm<{
    search: string;
  }>();

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchInputChange(watch("search"));
    }
  };

  return (
    <form className="flex w-full flex-col gap-5 md:flex-row">
      <input
        onKeyDown={handelOnKeyDown}
        className="flex w-full bg-slate-100 p-3"
        type="search"
        {...register("search")}
        placeholder={t("Admin.User.search")}
      />
    </form>
  );
};

export default Search;
