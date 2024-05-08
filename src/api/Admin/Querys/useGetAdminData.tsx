import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminProps, OrganizationProps } from "@/pages/Admin/hooks/useAdmin";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";

const useGetAdminData = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const getAdminData = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/admin/getAll/`)
      .then((response) => {
        const responseData = response.data;
        const data: AdminProps = {
          organizations: response.data.organizations.map(
            (organization: any): OrganizationProps => ({
              ...organization,
              accessedWhen: new Date(organization.accessedWhen),
              createdWhen: new Date(organization.createdWhen),
              updatedWhen: new Date(organization.updatedWhen),
            })
          ),
          user: response.data.user.map(
            (user: any): AuthorizedUserProps => ({
              ...user,
              organization: user.organizations,
              accessedWhen: new Date(user.accessedWhen),
              createdWhen: new Date(user.createdWhen),
              updatedWhen: new Date(user.updatedWhen),
            })
          ),
        };

        logger("useGetAdminData | getAdminData ✅ |", response);
        return data;
      });

  return useQuery<AdminProps, Error>({
    queryKey: ["admin", "data"],
    queryFn: getAdminData,
    enabled: user.usertype === UserType.ADMIN,
  });
};

export default useGetAdminData;
