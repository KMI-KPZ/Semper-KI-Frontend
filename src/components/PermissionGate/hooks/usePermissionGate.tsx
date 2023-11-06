import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { UserContext } from "@/contexts/UserContextProvider";
import { UserType } from "@/hooks/useUser";
import { useContext } from "react";
interface ReturnProps {
  hasPermission(element: string): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const { user } = useContext(UserContext);
  const { permissions, permissionGates } = useContext(PermissionContext);

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
