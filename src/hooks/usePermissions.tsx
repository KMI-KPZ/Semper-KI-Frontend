import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/pages/App";
import customAxios from "./useCustomAxios";

interface ReturnProps {
  permissionQuery: UseQueryResult<Permission[], Error>;
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
  permission: "file",
};
export const OrdersReadPermission: Permission = {
  context: "orders",
  permission: "see",
};
export const OrgaEditPermission: Permission = {
  context: "organization",
  permission: "edit",
};
export const OrgaReadPermission: Permission = {
  context: "organization",
  permission: "read",
};

const usePermissions = (
  setState: Dispatch<SetStateAction<AppState>>,
  loadPermissions: boolean
): ReturnProps => {
  const permissionQuery = useQuery<Permission[], Error>({
    queryKey: ["permission"],
    queryFn: async () =>
      customAxios
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getPermissions/`)
        .then((res) => {
          console.log("usePermissions | loadPermissions ✅ |", res.data);
          return res.data;
        }),
    onSuccess: (data) => {
      setState((prevState) => ({ ...prevState, permissions: data }));
    },
    enabled: loadPermissions === true,
  });

  return { permissionQuery };
};

export default usePermissions;
