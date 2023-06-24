import customAxios from "@/hooks/useCustomAxios";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IFilterItem } from "@/pages/Process/Filter";
const FilterItems = _FilterItems as IFilterItem[];

interface ReturnProps {
  filtersQuery: DefinedUseQueryResult<IFilterItem[], Error>;
  updateFilters: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IFilterItem[],
    unknown
  >;
}

const useFilter = (): ReturnProps => {
  const queryClient = useQueryClient();

  const filtersQuery = useQuery<IFilterItem[], Error>({
    queryKey: ["filters"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/getFilters/`;
      return customAxios.get(apiUrl).then((response) => {
        console.log("useFilter | getFilters ✅ |", response.data);
        return response.data;
      });
    },
    initialData: FilterItems,
    enabled: false,
  });

  const updateFilters = useMutation<AxiosResponse, Error, IFilterItem[]>({
    mutationFn: async (filters: IFilterItem[]) =>
      customAxios
        .post(`${import.meta.env.VITE_HTTP_API_URL}/public/updateFilters/`, {
          filters,
        })
        .then((res) => {
          console.log("useFilter | updateFilters ✅ |", res.data, filters);
          return res;
        }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["filters"]);
    },
  });

  return { filtersQuery, updateFilters };
};

export default useFilter;
