import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/index";
import usePermissionGate from "./hooks/usePermissionGate";

interface PermissionProps {
  element: string;
  showMessage?: boolean;
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, showMessage = false } = props;
  const { t } = useTranslation();

  const { hasPermission } = usePermissionGate();

  const inDebugMode = false;
  if (inDebugMode && hasPermission(props.element))
    return (
      <div className="w-fit border-2 border-green-500 p-2">
        <Text className="text-green-500">{props.element}</Text>
        {children}
      </div>
    );
  if (inDebugMode && !hasPermission(props.element))
    return (
      <div className="w-fit border-2 border-red-500 p-2">
        <Text className="text-red-500">{props.element}</Text>
        {children}
      </div>
    );
  if (hasPermission(props.element)) return children;
  if (showMessage !== undefined || showMessage === true)
    return (
      <Text variant="body" children={t("components.PermissionGate.message")} />
    );
  return null;
};

export default PermissionGate;
