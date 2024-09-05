import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useSendProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectID } = useParams();
  const sendProject = async (processIDs: string[]) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/sendProject/`, {
        projectID,
        processIDs,
      })
      .then((response) => {
        logger("useSendProject | sendProject ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSendProject | sendProject ❌ |", error);
      });

  return useMutation<any, Error, string[]>({
    mutationFn: sendProject,
    onSuccess: (_, processIDs) => {
      queryClient.invalidateQueries(["project", projectID]);
      navigate(`/projects/${projectID}/${processIDs[0]}`);
    },
  });
};

export default useSendProject;
