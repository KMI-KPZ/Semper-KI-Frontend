import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useProject } from "@/hooks/Project/useProject";

export interface ModelDetailsProps {
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
}

const useGetModelDetails = (processID: string) => {
  const { project } = useProject();
  const getModelDetails = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/checkModel/${project.projectID}/${processID}/`
      )
      .then((response) => {
        const modelDetails: ModelDetailsProps = {
          ...response.data,
        };

        logger("useGetModelDetails | getModelDetails ✅ |", response);
        return modelDetails;
      });

  return useQuery<ModelDetailsProps, Error>({
    queryKey: ["project", project.projectID, processID, "modelDetails"],
    queryFn: getModelDetails,
  });
};

export default useGetModelDetails;
