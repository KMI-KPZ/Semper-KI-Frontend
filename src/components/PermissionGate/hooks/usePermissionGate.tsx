import { PermissionGateType } from "@/api/Permissions/Querys/useGetPermissionGates";
import usePermissions from "@/hooks/usePermissions";
import useUser, { UserType } from "@/hooks/useUser";
interface ReturnProps {
  hasPermission(element: string): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const { user } = useUser();
  const { permissions, permissionGates } = usePermissions();

  const hasPermission = (element: string): boolean => {
    if (
      user.usertype === UserType.ANONYM ||
      user.usertype === UserType.ADMIN ||
      user.usertype === UserType.USER
    )
      return true;

    const permissionGate: PermissionGateType | undefined =
      permissionGates?.find((permissionGate) =>
        permissionGate.elements.includes(element)
      );

    const allowAccessToOrgaUser =
      user.usertype === UserType.ORGANIZATION &&
      permissions !== undefined &&
      permissionGate !== undefined &&
      permissions.find(
        (permission) =>
          permission.context === permissionGate.permission.context &&
          permission.permission === permissionGate.permission.permission
      ) !== undefined;

    return allowAccessToOrgaUser;
  };

  return { hasPermission };
};

export default usePermissionGate;
