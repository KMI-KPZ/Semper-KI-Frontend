import { useState } from "react";

interface ReturnProps<T> {
  handleSearchInputChange: (search: string) => void;
  filterDataBySearchInput: (data: T, keys: (keyof T)[]) => boolean;
}

const useSearch = <T,>(): ReturnProps<T> => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInputChange = (search: string) => {
    setSearchInput(search);
  };

  const filterDataBySearchInput = (data: T, keys: (keyof T)[]): boolean => {
    const searchInputLowerCase = searchInput.toLocaleLowerCase();
    return keys.some((key) =>
      (data[key] as unknown as string)
        .toLocaleLowerCase()
        .includes(searchInputLowerCase)
    );
  };

  return { handleSearchInputChange, filterDataBySearchInput };
};

export default useSearch;
