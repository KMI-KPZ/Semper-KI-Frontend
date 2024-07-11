import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSetLocalOfUser = () => {
  const queryClient = useQueryClient();
  const setLocalOfUser = async (props: string) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/auth/localeOfUser/set/`, {
        props,
      })
      .then((response) => {
        logger("useSetLocalOfUser | setLocalOfUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSetLocalOfUser | setLocalOfUser ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: setLocalOfUser,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useSetLocalOfUser;
