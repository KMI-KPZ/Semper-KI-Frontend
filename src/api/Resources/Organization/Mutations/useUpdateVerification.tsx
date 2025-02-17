import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CharacterisationStatus } from "../Querys/useGetVerification";

interface useUpdateVerificationProps {
  printerID: string;
  materialID: string;
  status: CharacterisationStatus;
}

const useUpdateVerification = () => {
  const queryClient = useQueryClient();
  const updateVerification = async (props: useUpdateVerificationProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/verification/update/`,
        props
      )
      .then((response) => {
        logger("useUpdateVerification | updateVerification ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateVerification | updateVerification ❌ |", error);
      });

  return useMutation<string, Error, useUpdateVerificationProps>({
    mutationFn: updateVerification,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "verification"]);
    },
  });
};

export default useUpdateVerification;
