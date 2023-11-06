import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import usePermissionGate from "./hooks/usePermissionGate";
import { Text } from "@component-library/Typography";

interface PermissionProps {
  element: string;
  showMessage?: boolean;
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, element, showMessage = false } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const inDebugMode = process.env.NODE_ENV === "development";

  return hasPermission(element) ? (
    <>{children}</>
  ) : inDebugMode ? (
    <div className="overflow-clip rounded-xl border-2 border-red-500 ">
      {children}
    </div>
  ) : showMessage === undefined || showMessage === false ? null : (
    <Text variant="body" children={t("components.PermissionGate.message")} />
  );
};

export default PermissionGate;
