import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export interface VerifyProjectMutationProps {
  processIDs: string[];
  send: boolean;
}

const useVerifyProject = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const verifyProject = async ({
    processIDs,
    send,
  }: VerifyProjectMutationProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/verifyProject/`, {
        projectID,
        processIDs,
        send,
      })
      .then((response) => {
        logger("useVerifyProject | verifyProject ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useVerifyProject | verifyProject ❌ |", error);
      });

  return useMutation<any, Error, VerifyProjectMutationProps>({
    mutationFn: verifyProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useVerifyProject;
