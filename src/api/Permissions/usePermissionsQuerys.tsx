import useUser, { UserType } from "@/hooks/useUser";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authorizedCustomAxios } from "../customAxios";
import logger from "@/hooks/useLogger";
import { Permission, PermissionGateType } from "@/hooks/usePermissions";

interface usePermissionsQuerysReturnProps {
  permissionsQuery: UseQueryResult<Permission[], Error>;
  permissionGatesQuery: UseQueryResult<PermissionGateType[], Error>;
}

const usePermissionsQuerys = (): usePermissionsQuerysReturnProps => {
  const { user } = useUser();

  const permissionsQuery = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissions/`;
      return authorizedCustomAxios.get(url).then((res) => {
        logger("usePermission | getPermissions ✅ |", res.data);
        return res.data;
      });
    },
    enabled: user.usertype !== UserType.ANONYM,
  });

  const permissionGatesQuery = useQuery<PermissionGateType[], Error>({
    queryKey: ["permissionMask"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissionMask/`;
      return authorizedCustomAxios.get(url).then((res) => {
        logger("usePermission | getPermissionMask ✅ |", res.data);
        return res.data.Rights;
      });
    },
    enabled: user.usertype !== UserType.ANONYM,
  });
  return { permissionGatesQuery, permissionsQuery };
};

export default usePermissionsQuerys;
