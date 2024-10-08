import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteAPIToken = () => {
  const queryClient = useQueryClient();
  const deleteAPIToken = async () =>
    authorizedCustomAxios
      .delete(`${process.env.VITE_HTTP_API_URL}/public/auth/api-key/delete/`)
      .then((response) => {
        logger("useDeleteAPIToken | deleteAPIToken ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteAPIToken | deleteAPIToken ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: deleteAPIToken,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "api"]);
    },
  });
};

export default useDeleteAPIToken;
