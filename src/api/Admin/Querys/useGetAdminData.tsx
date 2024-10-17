import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { AdminProps } from "@/pages/Admin/hooks/useAdmin";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { parseAuthorizedUser } from "@/api/User/Querys/useGetUser";
import {
  Organization,
  parseOrganization,
} from "@/api/Organization/Querys/useGetOrganization";

const useGetAdminData = () => {
  const { user } = useUser();
  const getAdminData = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/admin/all/get/`)
      .then((response) => {
        const data: AdminProps = {
          organizations: response.data.organizations.map(
            (organization: any): Organization => parseOrganization(organization)
          ),
          user: response.data.user.map(
            (user: any): AuthorizedUserProps =>
              parseAuthorizedUser(user, "Admin")
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
