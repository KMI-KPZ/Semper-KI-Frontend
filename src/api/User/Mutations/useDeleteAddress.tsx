import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const deleteAddress = async (addressID: string) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/deleteAddress/${addressID}/`
      )
      .then((response) => {
        logger("useDeleteAddress | deleteAddress ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteAddress | deleteAddress ❌ |", error);
      });

  return useMutation<void, Error, string>({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useDeleteAddress;
