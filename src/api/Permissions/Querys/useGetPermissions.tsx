import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";

export interface Permission {
  context: string;
  permission: string;
}

const useGetPermissions = () => {
  const { user } = useUser();

  const getPermissions = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/auth/permissions/get/`)
      .then((response) => {
        const responseData = response.data;
        const permissions: Permission[] = responseData;

        logger("useGetPermissions | getPermissions ✅ |", response);
        return permissions;
      });

  return useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: getPermissions,
    enabled: user.usertype !== UserType.ANONYM,
  });
};

export default useGetPermissions;
