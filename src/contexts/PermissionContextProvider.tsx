import React, { PropsWithChildren, createContext, useContext } from "react";
import { AppLoadingSuspense } from "@component-library/index";
import useUser, { UserType } from "@/hooks/useUser";
import useGetPermissions, {
  Permission,
} from "@/api/Permissions/Querys/useGetPermissions";
import useGetPermissionGates, {
  PermissionGateType,
} from "@/api/Permissions/Querys/useGetPermissionGates";

interface PermissionContextProviderProps {}

export type PermissionContext = {
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
};

export const PermissionContext = createContext<PermissionContext>({
  permissions: [],
  permissionGates: [],
});

const PermissionContextProvider: React.FC<
  PropsWithChildren<PermissionContextProviderProps>
> = (props) => {
  const { children } = props;
  const { user } = useUser();
  const permissions = useGetPermissions();
  const permissionGates = useGetPermissionGates();

  const permissionGatesAreLoaded = (): boolean => permissionGates.isFetched;
  const permissionsAreLoaded = (): boolean => permissions.isFetched;

  return (user.usertype !== UserType.ANONYM &&
    permissionGatesAreLoaded() &&
    permissionGates.data !== undefined &&
    permissionsAreLoaded() &&
    permissions.data !== undefined) ||
    user.usertype === UserType.ANONYM ? (
    <PermissionContext.Provider
      value={{
        permissions: permissions.data,
        permissionGates: permissionGates.data,
      }}
    >
      {children}
    </PermissionContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default PermissionContextProvider;
