import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction, useContext } from "react";
import { AppContext, AppState } from "@/pages/App";
import customAxios from "./useCustomAxios";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  permissionQuery: UseQueryResult<Permission[], Error>;
  reloadPermissions: () => void;
}

export interface Permission {
  context: string;
  permission: string;
}

export const OrdersEditPermission: Permission = {
  context: "orders",
  permission: "edit",
};
export const OrdersChatPermission: Permission = {
  context: "orders",
  permission: "chat",
};
export const OrdersFilePermission: Permission = {
  context: "orders",
  permission: "files",
};
export const OrdersReadPermission: Permission = {
  context: "orders",
  permission: "read",
};
export const OrgaEditPermission: Permission = {
  context: "orga",
  permission: "edit",
};
export const OrgaReadPermission: Permission = {
  context: "orga",
  permission: "read",
};

const usePermissions = (loadPermissions?: boolean): ReturnProps => {
  const queryClient = useQueryClient();
  const { setAppState } = useContext(AppContext);

  const permissionQuery = useQuery<Permission[], Error>({
    queryKey: ["permission"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_HTTP_API_URL}/public/getPermissions/`;
      return customAxios.get(url).then((res) => {
        logger("usePermissions | getPermissions ✅ |", res.data);
        return res.data;
      });
    },
    onSuccess: (data) => {
      setAppState((prevState) => ({ ...prevState, permissions: data }));
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
      setAppState((prevState) => ({ ...prevState, permissions: data }));
    },
  });

  const reloadPermissions = () => {
    logger("usePermissions | reloadPermissions |");
    reloadPermissionMutation.mutate(null);
  };

  return { permissionQuery, reloadPermissions };
};

export default usePermissions;
