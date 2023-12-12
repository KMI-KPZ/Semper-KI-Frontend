import { customAxios } from "@/api/customAxios";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
import {
  DefinedUseQueryResult,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "../../pages/Service/Manufacturing/Filter/Filter";
const FilterItems = _FilterItems as FilterItemProps[];

interface ReturnProps {
  filtersQuery: DefinedUseQueryResult<FilterItemProps[], Error>;
}

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

const useFilterQuerys = (): ReturnProps => {
  const queryClient = useQueryClient();

  const filtersQuery = useQuery<FilterItemProps[], Error>({
    queryKey: ["filters"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getFilters/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useFilter | getFilters ✅ |", response.data);
        return response.data;
      });
    },
    initialData: FilterItems,
    enabled: false,
  });

  return { filtersQuery };
};

export default useFilterQuerys;
