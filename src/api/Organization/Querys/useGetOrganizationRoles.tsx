import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RoleProps } from "../Mutations/useCreateRole";

const useGetOrganizationRoles = () => {
  const queryClient = useQueryClient();
  const getOrganizationRoles = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/roles/get/`)
      .then((response) => {
        const responseData = response.data;
        const data: RoleProps[] = {
          ...responseData,
        };

        logger("useGetOrganizationRoles | getOrganizationRoles ✅ |", response);
        return data;
      });

  return useQuery<RoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: getOrganizationRoles,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useGetOrganizationRoles;
