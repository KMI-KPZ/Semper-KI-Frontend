import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserAddressProps } from "@/hooks/useUser";

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const createAddress = async (address: NewUserAddressProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/createAddress/`, {
        address,
      })
      .then((response) => {
        logger("useCreateAddress | createAddress ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateAddress | createAddress ❌ |", error);
      });

  return useMutation<void, Error, NewUserAddressProps>({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useCreateAddress;
