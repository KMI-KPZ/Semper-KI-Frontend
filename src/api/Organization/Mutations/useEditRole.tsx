import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditRole = () => {
  const queryClient = useQueryClient();
  const editRole = async (props: Interface) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/editRole/`, {
        props,
      })
      .then((response) => {
        logger("useEditRole | editRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useEditRole | editRole ❌ |", error);
      });

  return useMutation<void, Error, Interface>({
    mutationFn: editRole,
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
};

export default useEditRole;
