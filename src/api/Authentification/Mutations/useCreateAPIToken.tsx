import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAPIToken = () => {
  const queryClient = useQueryClient();
  const createAPIToken = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/api-key/create/`)
      .then((response) => {
        logger("useCreateAPIToken | createAPIToken ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateAPIToken | createAPIToken ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: createAPIToken,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "api"]);
    },
  });
};

export default useCreateAPIToken;
