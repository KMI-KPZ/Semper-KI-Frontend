import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

interface ServiceSearchProps {
  setSearchText: Dispatch<SetStateAction<string>>;
  searchText: string;
}

const ServiceSearch: React.FC<ServiceSearchProps> = (
  props: ServiceSearchProps
) => {
  const { searchText: searchInput, setSearchText: setSearchInput } = props;
  const [touched, setTouched] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (touched === false) setTouched(true);
    setSearchInput(e.currentTarget.value);
  };

  const handleOnClickSearchButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSearchInput(searchInput);
  };

  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-3 2xl:flex-nowrap">
      <div className=" flex w-full flex-row ">
        <input
          type="search"
          className="w-full  rounded-md rounded-r-none border-2 p-3"
          placeholder={t(
            "Process.components.Service.ServiceEdit.Manufacturing.Search.placeholder"
          )}
          autoFocus
          value={searchInput}
          onChange={handleOnChangeInput}
        />
        <div
          className=" flex h-full  flex-row items-center justify-center overflow-clip rounded-md rounded-l-none bg-gray-200 p-3  text-white hover:cursor-pointer hover:bg-gray-300"
          onClick={handleOnClickSearchButton}
          tabIndex={0}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;
