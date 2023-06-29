import { AppContext } from "@/pages/App";
import { useContext } from "react";
import { UserType } from "@/hooks/useUser/types";

interface ReturnProps {
  hasPermission(element: string): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const {
    user,
    appState: { permissions, permissionsGates },
  } = useContext(AppContext);

  const hasPermission = (element: string): boolean => {
    const permissionGate = permissionsGates?.find((permissionGate) =>
      permissionGate.elements.includes(element)
    );

    const allowAccess =
      user?.type !== UserType.manufacturer ||
      (user?.type === UserType.manufacturer &&
        permissionGate !== undefined &&
        permissions.find(
          (permission) =>
            permission.context === permissionGate.permission.context &&
            permission.permission === permissionGate.permission.permission
        ) !== undefined);
    return allowAccess;
  };

  return { hasPermission };
};

export default usePermissionGate;
