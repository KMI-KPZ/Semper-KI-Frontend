import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { DeleteUserProps } from "@/pages/Admin/hooks/useAdmin";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface useAdminMutationsReturnProps {
  deleteUser: UseMutationResult<any, Error, DeleteUserProps, unknown>;
  deleteOrganization: UseMutationResult<any, Error, DeleteUserProps, unknown>;
}

const useAdminMutations = (): useAdminMutationsReturnProps => {
  const queryClient = useQueryClient();

  const deleteUser = useMutation<any, Error, DeleteUserProps>({
    mutationFn: async ({ hashedID, name }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/admin/deleteUser/`;
      return customAxios
        .delete(url, {
          data: {
            hashedID,
            name,
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["admin"]);
    },
  });

  const deleteOrganization = useMutation<any, Error, DeleteUserProps>({
    mutationFn: async ({ hashedID, name }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/admin/deleteOrganization/`;
      return customAxios
        .delete(url, {
          data: {
            hashedID,
            name,
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteOrganization ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["admin"]);
    },
  });
  return { deleteOrganization, deleteUser };
};

export default useAdminMutations;
