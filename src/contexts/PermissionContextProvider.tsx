import React, { PropsWithChildren, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "./UserContextProvider";
import usePermissions, {
  Permission,
  PermissionGateType,
} from "@/hooks/usePermissions";
import { Outlet } from "react-router-dom";
import { AppLoadingSuspense } from "@component-library/Loading";
import useUser, { UserType } from "@/hooks/useUser";
import usePermissionQuerys from "@/api/Permissions/usePermissionsQuerys";

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
  const { permissionGatesQuery, permissionsQuery } = usePermissionQuerys();

  const permissionGatesAreLoaded = (): boolean =>
    permissionGatesQuery.isFetched;
  const permissionsAreLoaded = (): boolean => permissionsQuery.isFetched;

  return (user.usertype !== UserType.ANONYM &&
    permissionGatesAreLoaded() &&
    permissionGatesQuery.data !== undefined &&
    permissionsAreLoaded() &&
    permissionsQuery.data !== undefined) ||
    user.usertype === UserType.ANONYM ? (
    <PermissionContext.Provider
      value={{
        permissions: permissionsQuery.data,
        permissionGates: permissionGatesQuery.data,
      }}
    >
      {children}
    </PermissionContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default PermissionContextProvider;
