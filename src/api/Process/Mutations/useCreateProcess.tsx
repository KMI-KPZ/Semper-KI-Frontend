import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "@/hooks/Project/useProject";

const useCreateProcess = () => {
  const queryClient = useQueryClient();
  const { project } = useProject();
  const navigate = useNavigate();
  const createProcess = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/create/${project.projectID}/`
      )
      .then((response) => {
        logger("useCreateProcess | createProcess ✅ |", response);
        return response.data.processID;
      })
      .catch((error) => {
        logger("useCreateProcess | createProcess ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: createProcess,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", project.projectID]);
      navigate(`/projects/${project.projectID}/${data}`);
    },
  });
};

export default useCreateProcess;
