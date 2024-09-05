import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface AdminDeleteUserProps {
  hashedID: string;
  name: string;
}

const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUser = async (data: AdminDeleteUserProps) =>
    authorizedCustomAxios
      .delete(`${process.env.VITE_HTTP_API_URL}/public/admin/user/delete/`, {
        data,
      })
      .then((response) => {
        logger("useAdminDeleteUser | deleteUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useAdminDeleteUser | deleteUser ❌ |", error);
      });

  return useMutation<void, Error, AdminDeleteUserProps>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin"]);
    },
  });
};

export default useAdminDeleteUser;
