import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilterItemProps } from "../Querys/useGetFilters";

const useUpdateFilters = () => {
  const queryClient = useQueryClient();
  const updateFilters = async (filters: FilterItemProps[]) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/updateFilters/`, {
        filters,
      })
      .then((response) => {
        logger("useUpdateFilters | updateFilters ✅ |", response);
        return response;
      })
      .catch((error) => {
        logger("useUpdateFilters | updateFilters ❌ |", error);
      });

  return useMutation<any, Error, FilterItemProps[]>({
    mutationFn: updateFilters,
    onSuccess: () => {
      queryClient.invalidateQueries(["filters"]);
    },
  });
};

export default useUpdateFilters;
