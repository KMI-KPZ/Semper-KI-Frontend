import React, { PropsWithChildren, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "./UserContextProvider";
import usePermissions, {
  Permission,
  PermissionGateType,
} from "@/hooks/usePermissions";
import { Outlet } from "react-router-dom";
import { AppLoadingSuspense } from "@component-library/Loading";

interface PermissionContextProviderProps {}

export type PermissionContext = {
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
  reloadPermissions: () => void;
};

export const PermissionContext = createContext<PermissionContext>({
  permissions: [],
  permissionGates: [],
  reloadPermissions: () => {},
});

const PermissionContextProvider: React.FC<
  PropsWithChildren<PermissionContextProviderProps>
> = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);
  const { permissionGateQuery, permissionQuery, reloadPermissions } =
    usePermissions();

  const permissionGatesAreLoaded = (): boolean => permissionGateQuery.isFetched;
  const permissionsAreLoaded = (): boolean => permissionQuery.isFetched;

  return user === undefined ||
    (user !== undefined &&
      permissionGatesAreLoaded() &&
      permissionGateQuery.data !== undefined &&
      permissionsAreLoaded() &&
      permissionQuery.data !== undefined) ? (
    <PermissionContext.Provider
      value={{
        permissions: permissionQuery.data,
        permissionGates: permissionGateQuery.data,
        reloadPermissions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default PermissionContextProvider;
