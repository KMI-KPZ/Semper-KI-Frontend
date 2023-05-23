import useCustomAxios from "./useCustomAxios";
import _FilterItems from "./Data/FilterQuestions.json";
import { IFilterItem } from "../components/Process/Filter/Interface";
import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();

  const filtersQuery = useQuery<IFilterItem[], Error>({
    queryKey: ["filters"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/getFilters/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useFilter | getFilters ✅ |", response.data);
        return response.data;
      });
    },
    initialData: FilterItems,
    enabled: false,
  });

  const updateFilters = useMutation<AxiosResponse, Error, IFilterItem[]>({
    mutationFn: async (filters: IFilterItem[]) =>
      axiosCustom
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
