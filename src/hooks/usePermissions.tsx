import { useContext } from "react";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { Permission } from "@/api/Permissions/Querys/useGetPermissions";
import { PermissionGateType } from "@/api/Permissions/Querys/useGetPermissionGates";

interface ReturnProps {
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
}

const usePermissions = (): ReturnProps => {
  const { permissionGates, permissions } = useContext(PermissionContext);

  return {
    permissionGates,
    permissions,
  };
};

export default usePermissions;
