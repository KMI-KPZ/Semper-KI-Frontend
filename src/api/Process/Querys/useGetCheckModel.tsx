import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export interface CheckModel {
  filename: string;
  measurements: {
    volume: number;
    surfaceArea: number;
    mbbDimensions: {
      _1: number;
      _2: number;
      _3: number;
    };
    mbbVolume: number;
  };
  status_code: number;
}

const useGetCheckModel = (fileID?: string) => {
  const { projectID, processID } = useParams();
  const getCheckModel = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/check/${projectID}/${processID}/${fileID}/`
      )
      .then((response) => {
        const data: CheckModel = {
          ...response.data,
        };

        logger("useGetCheckModel | getCheckModel ✅ |", response);
        return data;
      });

  return useQuery<CheckModel, Error>({
    queryKey: ["project", projectID, processID, "checkModel", fileID],
    queryFn: getCheckModel,
    enabled: fileID !== undefined && fileID !== "",
  });
};

export default useGetCheckModel;
