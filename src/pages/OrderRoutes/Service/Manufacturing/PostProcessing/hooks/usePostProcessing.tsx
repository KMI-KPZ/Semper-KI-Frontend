import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FilterItemProps } from "../../Filter/Filter";
import { PostProcessingProps } from "../PostProcessing";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";

export const usePostProcessing = (
  filters: FilterItemProps[]
): { postProcessingQuery: UseQueryResult<PostProcessingProps[], Error> } => {
  const postProcessingQuery = useQuery<PostProcessingProps[], Error>({
    queryKey: ["postProcessings"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getPostProcessing/`;
      return getCustomAxios()
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          logger("usePostProcessing | getPostProcessing ✅ |", response.data);
          return response.data.postProcessing;
        });
    },
  });
  return { postProcessingQuery };
};
