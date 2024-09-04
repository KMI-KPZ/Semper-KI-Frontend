import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { objectToArray } from "@/services/utils";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";

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
        const parseModels = models.map(
          (model: RepositoryModel): ModelProps => ({
            id: "",
            fileName: model.name,
            tags: [],
            date: new Date().toISOString(),
            licenses: [model.license],
            certificates: [],
            URI: model.preview,
            createdBy: "",
          })
        );

        logger("useGetModels | getModels ✅ |", models);
        return parseModels;
      });

  return useQuery<ModelProps[], Error>({
    queryKey: ["models"],
    queryFn: getModels,
  });
};

export default useGetModels;
