import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RepositoryModel } from "../Querys/useGetRepositoryModels";
import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";

interface usePostRepositoryModelProps {
  projectID: string;
  processID: string;
  groupID: number;
  model: RepositoryModel;
  origin: ProcessOrigin;
}

const usePostRepositoryModel = () => {
  const queryClient = useQueryClient();
  const postRepositoryModel = async (props: usePostRepositoryModelProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/repository/post/`,
        props
      )
      .then((response) => {
        logger("usePostRepositoryModel | postRepositoryModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("usePostRepositoryModel | postRepositoryModel ❌ |", error);
      });

  return useMutation<string, Error, usePostRepositoryModelProps>({
    mutationFn: postRepositoryModel,
    onSuccess: (_, props) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default usePostRepositoryModel;
