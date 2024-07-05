import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useCreateProcess = () => {
  const queryClient = useQueryClient();
  const { projectID, processID } = useParams();
  const navigate = useNavigate();
  const createProcess = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/create/${projectID}/`
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
      queryClient.invalidateQueries(["project", projectID]);
      // navigate(`${processID === undefined ? "" : "../"}${data}`);
    },
  });
};

export default useCreateProcess;
