import customAxios from "@/hooks/useCustomAxios";
import { IFilterItem } from "@/pages/Process/Filter";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IMaterial } from "../Material";
import { IModel } from "../Model";
import { IPostProcessing } from "../PostProcessing";

export interface IProcessData {
  filters: IFilterItem[];
  models: IModel[];
  materials: IMaterial[];
  postProcessing: IPostProcessing[];
}

const useProcessData = (
  filters: IFilterItem[]
): { processDataQuery: UseQueryResult<IProcessData, Error> } => {
  const processDataQuery = useQuery<IProcessData, Error>({
    queryKey: ["processData", "models", "materials", "postProcessings"],
    queryFn: async () => {
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/getProcessData/`;
      return customAxios
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useProcessData | getProcessData ✅ |", response.data);
          return response.data;
        });
    },
    enabled: false,
  });
  return { processDataQuery };
};

export const useModelData = (
  filters: IFilterItem[]
): { modelsQuery: UseQueryResult<IModel[], Error> } => {
  const modelsQuery = useQuery<IModel[], Error>({
    queryKey: ["models"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/getModels/`;
      return customAxios
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useModelData | getModels ✅ |", response.data);
          return response.data.models;
        });
    },
  });
  return { modelsQuery };
};
export const useMaterialData = (
  filters: IFilterItem[]
): { materialsQuery: UseQueryResult<IMaterial[], Error> } => {
  const materialsQuery = useQuery<IMaterial[], Error>({
    queryKey: ["materials"],
    queryFn: async () => {
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/getMaterials/`;
      return customAxios
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useMaterialData | getMaterials ✅ |", response.data);
          return response.data.materials;
        });
    },
  });
  return { materialsQuery };
};

export const usePostProcessing = (
  filters: IFilterItem[]
): { postProcessingQuery: UseQueryResult<IPostProcessing[], Error> } => {
  const postProcessingQuery = useQuery<IPostProcessing[], Error>({
    queryKey: ["postProcessings"],
    queryFn: async () => {
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/getPostProcessing/`;
      return customAxios
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log(
            "usePostProcessing | getPostProcessing ✅ |",
            response.data
          );
          return response.data.postProcessing;
        });
    },
  });
  return { postProcessingQuery };
};
