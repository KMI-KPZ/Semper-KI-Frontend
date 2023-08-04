import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IMaterial } from "../Material";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { IFilterItem } from "../../Filter/Filter";

export const useManufacturingMaterial = (
  filters: IFilterItem[]
): { materialsQuery: UseQueryResult<IMaterial[], Error> } => {
  const materialsQuery = useQuery<IMaterial[], Error>({
    queryKey: ["materials"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getMaterials/`;
      return getCustomAxios()
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          logger("useManufacturingMaterial | getMaterials ✅ |", response.data);
          return response.data.materials;
        });
    },
  });
  return { materialsQuery };
};
