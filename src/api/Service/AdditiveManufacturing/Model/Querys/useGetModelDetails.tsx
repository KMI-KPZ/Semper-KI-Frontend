import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ModelDetailsProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import { useProject } from "@/hooks/Project/useProject";

const useGetModelDetails = (processID: string) => {
  const queryClient = useQueryClient();
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
