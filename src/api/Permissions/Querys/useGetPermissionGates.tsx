import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import { Permission } from "./useGetPermissions";

export type PermissionGateType = {
  elements: string[];
  permission: Permission;
};

const useGetPermissionGates = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const getPermissionGates = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getPermissionMask/`)
      .then((response) => {
        const responseData = response.data;
        const permissionGates: PermissionGateType[] = responseData.Rights;

        logger(
          "useGetPermissionGates | getPermissionGates ✅ |",
          response,
          permissionGates
        );
        return permissionGates;
      });

  return useQuery<PermissionGateType[], Error>({
    queryKey: ["permissionMask"],
    queryFn: getPermissionGates,
    enabled: user.usertype !== UserType.ANONYM,
  });
};

export default useGetPermissionGates;
