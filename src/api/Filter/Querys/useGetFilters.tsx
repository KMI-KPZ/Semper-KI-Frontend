import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/Filter";

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
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/filters/get/`
      )
      .then((response) => {
        const responseData = response.data;
        const filters: FilterItemProps[] = responseData.filters;

        logger("useGetFilters | getFilters ✅ |", response);
        return filters;
      });

  return useQuery<FilterItemProps[], Error>({
    queryKey: ["filters"],
    queryFn: getFilters,
  });
};

export default useGetFilters;
