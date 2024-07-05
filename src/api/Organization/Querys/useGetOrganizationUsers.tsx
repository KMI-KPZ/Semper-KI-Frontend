import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RoleProps } from "../Mutations/useCreateRole";

export type OrganizationsUser = {
  email: string;
  name: string;
  picture: string;
  roles: RoleProps[];
};

const useGetOrganizationUsers = () => {
  const queryClient = useQueryClient();
  const getOrganizationUsers = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/users/get/`)
      .then((response) => {
        const responseData = response.data;
        const users: OrganizationsUser[] = {
          ...responseData,
        };

        logger("useGetOrganizationUsers | getOrganizationUsers ✅ |", response);
        return users;
      });

  return useQuery<OrganizationsUser[], Error>({
    queryKey: ["organization", "users"],
    queryFn: getOrganizationUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useGetOrganizationUsers;
