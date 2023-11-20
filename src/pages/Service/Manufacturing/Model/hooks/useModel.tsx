import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FilterItemProps } from "../../Filter/Filter";
import { ModelProps } from "../types";
import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";

export const useManufacturingModelData = (
  filters: FilterItemProps[]
): { modelsQuery: UseQueryResult<ModelProps[], Error> } => {
  const modelsQuery = useQuery<ModelProps[], Error>({
    queryKey: ["models"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getModels/`;
      return customAxios
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          logger("useModelData | getModels ✅ |", response.data);
          return response.data.models;
        });
    },
  });
  return { modelsQuery };
};
