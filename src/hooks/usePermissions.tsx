import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

interface ReturnProps {
  permissionQuery: UseQueryResult<Permission[], Error>;
  permissionGateQuery: UseQueryResult<PermissionGateType[], Error>;
  reloadPermissions: () => void;
}

export interface Permission {
  context: string;
  permission: string;
}

export type PermissionGateType = {
  elements: string[];
  permission: Permission;
};

const usePermissions = (): ReturnProps => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const permissionQuery = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissions/`;
      return getCustomAxios()
        .get(url)
        .then((res) => {
          logger("usePermissions | getPermissions ✅ |", res.data);
          return res.data;
        });
    },
    enabled: user !== undefined,
  });

  const permissionGateQuery = useQuery<PermissionGateType[], Error>({
    queryKey: ["permissionMask"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissionMask/`;
      return getCustomAxios()
        .get(url)
        .then((res) => {
          logger("usePermissions | getPermissionMask ✅ |", res.data);
          return res.data.Rights;
        });
    },
    enabled: user !== undefined,
  });

  const reloadPermissionMutation = useMutation<Permission[], Error, void>({
    mutationFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getNewPermissions/`)
        .then((res) => {
          logger("usePermissions | relodePermissions ✅"); // |", res.data);
          return res.data;
        }),
    onSuccess(data, variables, context) {
      // setPermissions(data);
      queryClient.invalidateQueries(["permissions"]);
    },
  });

  const reloadPermissions = () => {
    reloadPermissionMutation.mutate();
  };

  return {
    permissionQuery,
    permissionGateQuery,
    reloadPermissions,
  };
};

export default usePermissions;
