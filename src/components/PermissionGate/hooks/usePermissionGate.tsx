import { AppContext } from "@/pages/App/App";
import { useContext } from "react";
import { UserType } from "@/hooks/useUser/types";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  hasPermission(element: string): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const { user, permissions, permissionGates } = useContext(AppContext);

  const hasPermission = (element: string): boolean => {
    const permissionGate = permissionGates?.find((permissionGate) =>
      permissionGate.elements.includes(element)
    );

    const allowAccess =
      user === undefined ||
      (user !== undefined &&
        (user.usertype === UserType.ADMIN ||
          user.usertype === UserType.USER ||
          (user.usertype === UserType.ORGANIZATION &&
            permissions !== undefined &&
            permissionGate !== undefined &&
            permissions.find(
              (permission) =>
                permission.context === permissionGate.permission.context &&
                permission.permission === permissionGate.permission.permission
            ) !== undefined)));

    return allowAccess;
  };

  return { hasPermission };
};

export default usePermissionGate;
