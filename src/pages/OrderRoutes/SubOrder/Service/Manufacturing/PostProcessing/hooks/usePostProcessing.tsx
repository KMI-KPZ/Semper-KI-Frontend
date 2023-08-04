import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IFilterItem } from "../../Filter/Filter";
import { IPostProcessing } from "../PostProcessing";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";

export const usePostProcessing = (
  filters: IFilterItem[]
): { postProcessingQuery: UseQueryResult<IPostProcessing[], Error> } => {
  const postProcessingQuery = useQuery<IPostProcessing[], Error>({
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
