import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/hooks/Project/useProject";

const useCreateProcess = () => {
  const queryClient = useQueryClient();
  const { project } = useProject();

  const navigate = useNavigate();
  const createProcess = async (customProjectID?: string | void) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/create/${
          customProjectID ? customProjectID : project.projectID
        }/`
      )
      .then((response) => {
        logger("useCreateProcess | createProcess ✅ |", response);
        return response.data.processID;
      })
      .catch((error) => {
        logger("useCreateProcess | createProcess ❌ |", error);
      });

  return useMutation<string, Error, void | string>({
    mutationFn: createProcess,
    onSuccess(data: string, variables: void | string) {
      queryClient.invalidateQueries(["dashboardProject"]);
      queryClient.invalidateQueries([
        "project",
        variables ? variables : project.projectID,
      ]);
      navigate(
        `/projects/${variables ? variables : project.projectID}/${data}`
      );
    },
  });
};

export default useCreateProcess;
