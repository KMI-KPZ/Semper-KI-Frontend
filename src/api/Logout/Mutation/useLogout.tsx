import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/logout/`)
      .then((response) => {
        logger("useLogout | logout ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useLogout | logout ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data !== undefined) window.location.href = data;
    },
  });
};

export default useLogout;
