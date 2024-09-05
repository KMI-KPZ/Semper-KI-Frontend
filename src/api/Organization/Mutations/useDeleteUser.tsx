import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUser = async (email: string) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/users/delete/${email}/`
      )
      .then((response) => {
        logger("useDeleteUser | deleteUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteUser | deleteUser ❌ |", error);
      });

  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "users"]);
    },
  });
};

export default useDeleteUser;
