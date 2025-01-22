import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCloneProcessProps {
  projectID: string;
  processIDs: string[];
}

const useCloneProcess = () => {
  const queryClient = useQueryClient();
  const cloneProcess = async (props: useCloneProcessProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/process/clone/`, props)
      .then((response) => {
        logger("useCloneProcess | cloneProcess ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCloneProcess | cloneProcess ❌ |", error);
      });

  return useMutation<useCloneProcessProps, Error, useCloneProcessProps>({
    mutationFn: cloneProcess,
    onSuccess: (data, props) => {
      queryClient.invalidateQueries(["project", data.projectID]);
      queryClient.invalidateQueries(["project", props.projectID]);
      queryClient.invalidateQueries(["dashboardProject"]);
    },
  });
};

export default useCloneProcess;
