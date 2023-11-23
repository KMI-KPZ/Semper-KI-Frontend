import usePermissions from "@/hooks/usePermissions";
import useUser, { UserType } from "@/hooks/useUser";
interface ReturnProps {
  hasPermission(element: string): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const { user } = useUser();
  const { permissions, permissionGates } = usePermissions();

  const hasPermission = (element: string): boolean => {
    const permissionGate = permissionGates?.find((permissionGate) =>
      permissionGate.elements.includes(element)
    );

    const allowAccess =
      (user.usertype !== UserType.ANONYM &&
        (user.usertype === UserType.ADMIN ||
          user.usertype === UserType.USER ||
          (user.usertype === UserType.ORGANIZATION &&
            permissions !== undefined &&
            permissionGate !== undefined &&
            permissions.find(
              (permission) =>
                permission.context === permissionGate.permission.context &&
                permission.permission === permissionGate.permission.permission
            ) !== undefined))) ||
      user.usertype === UserType.ANONYM;

    return allowAccess;
  };

  return { hasPermission };
};

export default usePermissionGate;
