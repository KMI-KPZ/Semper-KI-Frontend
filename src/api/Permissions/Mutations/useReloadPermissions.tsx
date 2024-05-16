import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReloadPermissions = () => {
  const queryClient = useQueryClient();
  const reloadPermissions = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getNewPermissions/`)
      .then((response) => {
        logger("useReloadPermissions | reloadPermissions ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useReloadPermissions | reloadPermissions ❌ |", error);
      });

  return useMutation<void, Error, void>({
    mutationFn: reloadPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries(["permissions"]);
    },
  });
};

export default useReloadPermissions;
