import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import usePermissionGate from "./hooks/usePermissionGate";
import { Text } from "@component-library/index";

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

  if (hasPermission(element)) return <>{children}</>;
  if (inDebugMode)
    return (
      <div className="w-fit overflow-clip rounded-xl border-2 border-red-500 ">
        {children}
      </div>
    );
  if (showMessage !== undefined || showMessage === true)
    return (
      <Text variant="body" children={t("components.PermissionGate.message")} />
    );
  return null;
};

export default PermissionGate;
