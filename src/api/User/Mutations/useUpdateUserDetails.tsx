import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UpdateUserProps } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();
  const updateUserDetails = async (details: UpdateUserProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/updateUserDetails/`, {
        details,
      })
      .then((response) => {
        logger("useUser | updateUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUser | updateUser ❌ |", error);
      });

  return useMutation<void, Error, UpdateUserProps>({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUpdateUserDetails;
