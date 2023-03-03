import { useState } from "react";
import { IFilterItem } from "../components/Process/Filter/Interface";
import useCustomAxios from "./useCustomAxios";
import _FilterItems from "./Data/FilterQuestions.json";
const FilterItems = _FilterItems as IFilterItem[];

interface ReturnProps {
  filters: IFilterItem[];
  loadFilters(): void;
}

const useFilter = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [filters, setFilters] = useState<IFilterItem[]>(FilterItems);

  const loadFilters = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/getFilters/`)
      .then((res) => {
        console.log("useFilter| loadFilters Successful", res.data);
        setFilters(res.data);
      })
      .catch((error) => {
        console.log("useFilter| loadFilters error", error);
      });
  };

  return { loadFilters, filters };
};

export default useFilter;
