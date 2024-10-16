import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/index";

interface PermissionProps {
  element: string;
  showMessage?: boolean;
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, showMessage = false } = props;
  const { t } = useTranslation();

  const inDebugMode = process.env.NODE_ENV === "development";

  if (true) return <>{children}</>;
  if (inDebugMode)
    return (
      <div className="w-fit overflow-clip rounded-md border-2 border-red-500 ">
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
