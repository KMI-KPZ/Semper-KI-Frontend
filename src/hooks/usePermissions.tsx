import { useContext } from "react";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import usePermissionMutations from "@/api/Permissions/usePermissionsMutations";

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

const usePermissions = (): ReturnProps => {
  const { permissionGates, permissions } = useContext(PermissionContext);
  const { reloadPermissionsMutation } = usePermissionMutations();

  const reloadPermissions = () => {
    reloadPermissionsMutation.mutate();
  };

  return {
    permissionGates,
    permissions,
    reloadPermissions,
  };
};

export default usePermissions;
