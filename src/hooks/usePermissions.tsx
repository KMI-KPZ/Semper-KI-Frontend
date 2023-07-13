import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import customAxios from "./useCustomAxios";
import logger from "@/hooks/useLogger";
import { useContext, useState } from "react";
import { AppContext } from "@/pages/App/App";
import { User } from "./useUser/types";

interface ReturnProps {
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
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

const usePermissions = (user?: User): ReturnProps => {
  const [permissions, setPermissions] = useState<Permission[]>();
  const queryClient = useQueryClient();

  const permissionQuery = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissions/`;
      return customAxios.get(url).then((res) => {
        logger("usePermissions | getPermissions ✅ |", res.data);
        return res.data;
      });
    },
    onSuccess: (data) => {
      setPermissions(data);
    },
    enabled: user !== undefined,
  });

  const permissionGateQuery = useQuery<PermissionGateType[], Error>({
    queryKey: ["permissionMask"],
    queryFn: async () => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/getPermissionMask/`;
      return customAxios.get(url).then((res) => {
        logger("usePermissions | getPermissionMask ✅ |", res.data);
        return res.data.Rights;
      });
    },
    enabled: user !== undefined,
  });

  const reloadPermissionMutation = useMutation<Permission[], Error, null>({
    mutationFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getNewPermissions/`)
        .then((res) => {
          logger("usePermissions | getNewPermissions ✅ |", res.data);
          return res.data;
        }),
    onSuccess(data, variables, context) {
      setPermissions(data);
      queryClient.invalidateQueries(["permissions"]);
    },
  });

  const reloadPermissions = () => {
    reloadPermissionMutation.mutate(null);
  };

  return {
    permissionGates: permissionGateQuery.data,
    permissions,
    reloadPermissions,
  };
};

export default usePermissions;
