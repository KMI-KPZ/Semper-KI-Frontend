import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { MaterialProps } from "../../../pages/Service/Manufacturing/Material/Material";
import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { FilterItemProps } from "../../../pages/Service/Manufacturing/Filter/Filter";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import {
  ModelDetailsProps,
  ModelProps,
} from "@/pages/Service/Manufacturing/Model/types";
import { useProject } from "@/pages/Projects/hooks/useProject";

export const useManufacturingMaterialQuerys = (
  filters: FilterItemProps[]
): { materialsQuery: UseQueryResult<MaterialProps[], Error> } => {
  const materialsQuery = useQuery<MaterialProps[], Error>({
    queryKey: ["materials"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getMaterials/`;
      return authorizedCustomAxios
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
      return authorizedCustomAxios
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
      return authorizedCustomAxios
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

export const useManufacturingModelDetailsQuerys = (
  processID: string
): { modelDetailsQuery: UseQueryResult<ModelDetailsProps, Error> } => {
  const { project } = useProject();
  const modelDetailsQuery = useQuery<ModelDetailsProps, Error>({
    queryKey: ["project", project.projectID, processID, "modelDetails"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/checkModel/${processID}/`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        logger(
          "useManufacturingModelDetailsQuerys | modelDetailsQuery ✅ |",
          response.data
        );
        return response.data;
      });
    },
    enabled: processID !== "",
  });
  return { modelDetailsQuery };
};
