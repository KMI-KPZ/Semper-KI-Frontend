import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { MaterialProps } from "../../../pages/Service/Manufacturing/Material/Material";
import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "../../../pages/Service/Manufacturing/Filter/Filter";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";

export const useManufacturingMaterialQuerys = (
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

export const useManufacturingPostProcessingQuerys = (
  filters: FilterItemProps[]
): { postProcessingQuery: UseQueryResult<PostProcessingProps[], Error> } => {
  const postProcessingQuery = useQuery<PostProcessingProps[], Error>({
    queryKey: ["postProcessings"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getPostProcessing/`;
      return customAxios
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

export const useManufacturingModelQuerys = (
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
    enabled: false,
    initialData: [],
  });
  return { modelsQuery };
};
