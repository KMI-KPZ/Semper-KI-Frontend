import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostProcessingProps } from "../Querys/useGetPostProcessigns";

interface SetPostProcessingProps {
  processID: string;
  projectID: string;
  postProcessings: PostProcessingProps[];
}

const useSetPostProcessing = () => {
  const queryClient = useQueryClient();
  const setPostProcessing = async (props: SetPostProcessingProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/post-processing/set/`,
        props
      )
      .then((response) => {
        logger("useSetPostProcessing | setPostProcessing ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSetPostProcessing | setPostProcessing ❌ |", error);
      });

  return useMutation<string, Error, SetPostProcessingProps>({
    mutationFn: setPostProcessing,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useSetPostProcessing;
