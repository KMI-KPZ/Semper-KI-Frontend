import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { MaterialProps } from "../Material";
import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "../../Filter/Filter";

export const useManufacturingMaterial = (
  filters: FilterItemProps[]
): { materialsQuery: UseQueryResult<MaterialProps[], Error> } => {
  const materialsQuery = useQuery<MaterialProps[], Error>({
    queryKey: ["materials"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getMaterials/`;
      return customAxios
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
