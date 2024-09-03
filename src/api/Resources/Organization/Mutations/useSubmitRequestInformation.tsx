import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NodeRequestInformation } from "@/pages/Resources/RequestInformation/RequestInformationForm";

const useSubmitRequestInformation = () => {
  const queryClient = useQueryClient();
  const submitNodeRequest = async (props: NodeRequestInformation) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/request/`,
        props
      )
      .then((response) => {
        logger("useSubmitNodeRequest | submitNodeRequest ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSubmitNodeRequest | submitNodeRequest ❌ |", error);
      });

  return useMutation<string, Error, NodeRequestInformation>({
    mutationFn: submitNodeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "orga", "request"]);
    },
  });
};

export default useSubmitRequestInformation;
