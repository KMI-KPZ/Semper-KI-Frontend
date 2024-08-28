import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteUser = async () =>
    authorizedCustomAxios
      .delete(`${process.env.VITE_HTTP_API_URL}/public/profile/user/delete/`)
      .then(() => {
        logger("useUser | profileDeleteUser ✅ |");
        navigate("/logout");
      })
      .catch((error) => {
        logger("useUser | deleteUser ❌ |", error);
      });

  return useMutation<void, Error, void>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useDeleteUser;
