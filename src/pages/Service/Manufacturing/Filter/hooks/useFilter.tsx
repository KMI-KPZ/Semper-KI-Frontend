import { customAxios } from "@/api/customAxios";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "../Filter";
const FilterItems = _FilterItems as FilterItemProps[];

interface ReturnProps {
  filtersQuery: DefinedUseQueryResult<FilterItemProps[], Error>;
  updateFilters: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FilterItemProps[],
    unknown
  >;
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

const useFilter = (): ReturnProps => {
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

  const updateFilters = useMutation<AxiosResponse, Error, FilterItemProps[]>({
    mutationFn: async (filters: FilterItemProps[]) =>
      customAxios
        .post(`${process.env.VITE_HTTP_API_URL}/public/updateFilters/`, {
          filters,
        })
        .then((res) => {
          logger("useFilter | updateFilters ✅ |", res.data, filters);
          return res;
        }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["filters"]);
    },
  });

  return { filtersQuery, updateFilters };
};

export default useFilter;
