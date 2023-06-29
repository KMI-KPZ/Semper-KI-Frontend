import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import customAxios from "./useCustomAxios";
import logger from "@/hooks/useLogger";
import { Dispatch, SetStateAction, useContext } from "react";
import { AppContext, AppState } from "@/pages/App";

interface ReturnProps {
  permissionQuery: UseQueryResult<Permission[], Error>;
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

const usePermissions = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  loadPermissions?: boolean
): ReturnProps => {
  const setPermissions = (permissions: Permission[]) => {
    setAppState((prevState) => ({ ...prevState, permissions }));
  };

  const permissionQuery = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_HTTP_API_URL}/public/getPermissions/`;
      return customAxios.get(url).then((res) => {
        logger("usePermissions | getPermissions ✅ |", res.data);
        return res.data;
      });
    },
    onSuccess: (data) => {
      setPermissions(data);
    },
    enabled: loadPermissions !== undefined && loadPermissions === true,
  });

  const permissionGateQuery = useQuery<PermissionGateType[], Error>({
    queryKey: ["permissionMask"],
    queryFn: async () => {
      const url = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/getPermissionMask/`;
      return customAxios.get(url).then((res) => {
        logger("usePermissions | getPermissionMask ✅ |", res.data);
        return res.data.Rights;
      });
    },
    onSuccess: (data) => {
      setAppState((prevState) => ({ ...prevState, permissionGates: data }));
    },
    enabled: loadPermissions !== undefined && loadPermissions === true,
  });

  const reloadPermissionMutation = useMutation<Permission[], Error, null>({
    mutationFn: async () =>
      customAxios
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getNewPermissions/`)
        .then((res) => {
          logger("usePermissions | getNewPermissions ✅ |", res.data);
          return res.data;
        }),
    onSuccess(data, variables, context) {
      setPermissions(data);
    },
  });

  const reloadPermissions = () => {
    reloadPermissionMutation.mutate(null);
  };

  return { permissionQuery, reloadPermissions };
};

export default usePermissions;
