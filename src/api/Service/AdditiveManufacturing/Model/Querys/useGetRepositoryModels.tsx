import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { objectToArray } from "@/services/utils";
import { ModelLevelOfDetail } from "@/api/Process/Querys/useGetProcess";

export interface RepositoryModel {
  certificates: string[];
  complexity: number;
  file: string;
  levelOfDetail: ModelLevelOfDetail;
  license: string[];
  name: string;
  preview: string;
  size: number;
  tags: string[];
}

const useGetRepositoryModels = () => {
  const getModels = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/repository/get/`
      )
      .then((response) => {
        const models: RepositoryModel[] = objectToArray(
          response.data.repository
        );

        logger("useGetModels | getModels ✅ |", models);
        return models;
      });

  return useQuery<RepositoryModel[], Error>({
    queryKey: ["models"],
    queryFn: getModels,
  });
};

export default useGetRepositoryModels;
