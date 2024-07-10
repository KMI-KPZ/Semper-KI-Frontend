export type RoleProps = {
  id: string;
} & CreateRoleProps;

export type CreateRoleProps = {
  name: string;
  description: string;
};

import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateRole = () => {
  const queryClient = useQueryClient();
  const createRole = async ({ description, name }: CreateRoleProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/roles/create/`,
        {
          data: {
            content: { roleName: name, roleDescription: description },
          },
        }
      )
      .then((response) => {
        logger("useCreateRole | createRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateRole | createRole ❌ |", error);
      });

  return useMutation<any, Error, CreateRoleProps>({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });
};

export default useCreateRole;
