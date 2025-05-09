import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import usePermissionGate from "./hooks/usePermissionGate";
import { Text } from "@component-library/index";
import { Outlet } from "react-router-dom";

interface PermissionProps {
  element: string;
  showMessage?: boolean;
}

const RoutePermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { element, showMessage = false, children } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const inDebugMode = process.env.NODE_ENV === "development";

  return hasPermission(element) ? (
    <>
      {children}
      <Outlet />
    </>
  ) : inDebugMode ? (
    <div className="overflow-clip rounded-md border-2 border-red-500 ">
      <Text className="text-red-500">{element}</Text>
      {children}
      <Outlet />
    </div>
  ) : showMessage === undefined || showMessage === false ? null : (
    <Text variant="body" children={t("components.PermissionGate.message")} />
  );
};

export default RoutePermissionGate;
