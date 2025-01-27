import { useState } from "react";

interface ReturnProps<T> {
  searchInput: string;
  handleSearchInputChange: (search: string) => void;
  filterDataBySearchInput: (
    data: T,
    _keys?: (keyof T)[] | undefined
  ) => boolean;
}

const isDate = (value: any): boolean => {
  return value instanceof Date;
};

const valueIncludesSearchInput = (value: any, searchInput: string): boolean => {
  if (value === undefined || value === null) return false;
  if (isDate(value))
    return value.toLocaleString().toLocaleLowerCase().includes(searchInput);
  else if (typeof value === "boolean") {
    return value.toString().toLocaleLowerCase().includes(searchInput);
  } else if (typeof value === "number") {
    return value.toString().toLocaleLowerCase().includes(searchInput);
  } else if (typeof value === "string") {
    return value.toLocaleLowerCase().includes(searchInput);
  } else if (typeof value === "object") {
    return filterDataWithSearchInput(value, searchInput);
  } else return false;
};

const filterDataWithSearchInput = <T,>(
  _data: T,
  searchInput: string,
  _keys?: (keyof T)[]
): boolean => {
  if (typeof _data === "object" && _data !== null && _data !== undefined) {
    const keys =
      _keys === undefined ? (Object.keys(_data) as (keyof T)[]) : _keys;
    return keys.some((key) =>
      valueIncludesSearchInput(_data[key], searchInput)
    );
  } else return valueIncludesSearchInput(_data, searchInput);
};

const useSearch = <T extends any>(): ReturnProps<T> => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInputChange = (search: string) => {
    setSearchInput(search);
  };

  const filterDataBySearchInput = (
    data: T,
    _keys?: (keyof T)[] | undefined
  ): boolean => {
    return filterDataWithSearchInput(
      data,
      searchInput.toLocaleLowerCase(),
      _keys
    );
  };

  return { handleSearchInputChange, filterDataBySearchInput, searchInput };
};

export default useSearch;
