import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAddressProps } from "@/hooks/useUser";

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const updateAddress = async (address: UserAddressProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/updateAddress/`, {
        address,
      })
      .then((response) => {
        logger("useUpdateAddress | updateAddress ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateAddress | updateAddress ❌ |", error);
      });

  return useMutation<void, Error, UserAddressProps>({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUpdateAddress;
