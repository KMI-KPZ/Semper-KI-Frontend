import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/MaufacturingFilter/Filter";
const FilterItems = _FilterItems as FilterItemProps[];

export enum FilterType {
  "TEXT",
  "TEXTAREA",
  "NUMBER",
  "DATE",
  "COLOR",
  "SLIDER",
  "SLIDERSELECTION",
  "SELECTION",
  "MUILTISELECT",
}

export enum FilterCategoryType {
  "GENERAL",
  "MODEL",
  "MATERIAL",
  "PROCEEDING",
  "MANUFACTURER",
  "POSTPROCESSING",
  "ADDITIVE",
  "TEST",
}

const useGetFilters = () => {
  const getFilters = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getFilters/`)
      .then((response) => {
        const responseData = response.data;
        const filters: FilterItemProps[] = responseData;

        logger("useGetFilters | getFilters ✅ |", response);
        return filters;
      });

  return useQuery<FilterItemProps[], Error>({
    queryKey: ["filters"],
    queryFn: getFilters,
    initialData: FilterItems,
    // enabled: false,
  });
};

export default useGetFilters;
