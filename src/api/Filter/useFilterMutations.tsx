import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "@/pages/Service/Manufacturing/Filter/Filter";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface useFilterMutationsReturnProps {
  updateFilterMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FilterItemProps[],
    unknown
  >;
}

const useFilterMutations = (): useFilterMutationsReturnProps => {
  const queryClient = useQueryClient();
  const updateFilterMutation = useMutation<
    AxiosResponse,
    Error,
    FilterItemProps[]
  >({
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

  return { updateFilterMutation };
};

export default useFilterMutations;
