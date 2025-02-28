import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteVerificationProps {
  printerID: string;
  materialID: string;
}

const useDeleteVerification = () => {
  const queryClient = useQueryClient();
  const deleteVerification = async (props: useDeleteVerificationProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/verification/delete/${props.printerID}/${props.materialID}/`
      )
      .then((response) => {
        logger("useDeleteVerification | deleteVerification ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteVerification | deleteVerification ❌ |", error);
      });

  return useMutation<string, Error, useDeleteVerificationProps>({
    mutationFn: deleteVerification,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "verification"]);
    },
  });
};

export default useDeleteVerification;
