import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CharacterisationStatus } from "../Querys/useGetVerification";

interface useCreateVerificationProps {
  printerID: string;
  materialID: string;
  status: CharacterisationStatus;
}

const useCreateVerification = () => {
  const queryClient = useQueryClient();
  const createVerification = async (props: useCreateVerificationProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/verification/create/`,
        props
      )
      .then((response) => {
        logger("useCreateVerification | createVerification ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateVerification | createVerification ❌ |", error);
      });

  return useMutation<string, Error, useCreateVerificationProps>({
    mutationFn: createVerification,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "verification"]);
    },
  });
};

export default useCreateVerification;
