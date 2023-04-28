import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IFilterItem } from "../components/Process/Filter/Interface";
import { IMaterial, IModel, IPostProcessing } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

export interface IProcessData {
  filters: IFilterItem[];
  models: IModel[];
  materials: IMaterial[];
  postProcessing: IPostProcessing[];
}

const useProcessData = (
  filters: IFilterItem[]
): { processDataQuery: UseQueryResult<IProcessData, Error> } => {
  const { axiosCustom } = useCustomAxios();

  const processDataQuery = useQuery<IProcessData, Error>({
    queryKey: ["processData", "models", "materials", "postProcessings"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getProcessData/`;
      return axiosCustom
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useProcessData | allQuery ✅ |", response.data);
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
  const { axiosCustom } = useCustomAxios();
  const modelsQuery = useQuery<IModel[], Error>({
    queryKey: ["models"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getModels/`;
      return axiosCustom
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useProcessData | modelQuery ✅ |", response.data);
          return response.data;
        });
    },
    enabled: false,
  });
  return { modelsQuery };
};
export const useMaterialData = (
  filters: IFilterItem[]
): { materialsQuery: UseQueryResult<IMaterial[], Error> } => {
  const { axiosCustom } = useCustomAxios();
  const materialsQuery = useQuery<IMaterial[], Error>({
    queryKey: ["materials"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getMaterials/`;
      return axiosCustom
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log("useProcessData | materialQuery ✅ |", response.data);
          return response.data;
        });
    },
    enabled: false,
  });
  return { materialsQuery };
};

export const usePostProcessing = (
  filters: IFilterItem[]
): { postProcessingQuery: UseQueryResult<IPostProcessing[], Error> } => {
  const { axiosCustom } = useCustomAxios();
  const postProcessingQuery = useQuery<IPostProcessing[], Error>({
    queryKey: ["postProcessings"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getPostProcessing/`;
      return axiosCustom
        .post(apiUrl, {
          filters,
        })
        .then((response) => {
          console.log(
            "useProcessData | postProcessingQuery ✅ |",
            response.data
          );
          return response.data;
        });
    },
    enabled: false,
  });
  return { postProcessingQuery };
};
