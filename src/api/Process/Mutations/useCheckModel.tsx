import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";

const useCheckModel = () => {
  const queryClient = useQueryClient();
  const { process: _process } = useProcess();
  const { project } = useProject();
  const checkModel = async (fileID: string) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/check/${project.projectID}/${_process.processID}/${fileID}/`
      )
      .then((response) => {
        logger("useCheckModel | checkModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCheckModel | checkModel ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: checkModel,
    onSuccess: (data, fileID, context) => {},
  });
};

export default useCheckModel;
