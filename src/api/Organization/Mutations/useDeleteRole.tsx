import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteRole = () => {
  const queryClient = useQueryClient();
  const deleteRole = async (roleID: string) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/roles/delete/`,
        {
          data: {
            content: { roleID },
          },
        }
      )
      .then((response) => {
        logger("useDeleteRole | deleteRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteRole | deleteRole ❌ |", error);
      });

  return useMutation<void, Error, string>({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "roles"]);
    },
  });
};

export default useDeleteRole;
