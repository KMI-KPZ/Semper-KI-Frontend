import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { objectToArray } from "@/services/utils";

export interface RepositoryModel {
  name: string;
  license: string;
  preview: string;
  file: string;
}

const useGetModels = () => {
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

export default useGetModels;
