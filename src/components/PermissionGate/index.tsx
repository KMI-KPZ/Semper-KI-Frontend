import { Permission } from "@/hooks/usePermissions";
import { AppContext } from "@/pages/App";
import { Text } from "@component-library/Typography";
import React, { PropsWithChildren, useContext } from "react";
import { useTranslation } from "react-i18next";

interface PermissionProps {
  gate: Permission;
  showMessage?: boolean;
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, gate, showMessage } = props;
  const {
    appState: { permissions },
  } = useContext(AppContext);
  const { t } = useTranslation();

  const allowAccess =
    permissions !== undefined &&
    permissions.find(
      (permission) =>
        permission.context === gate.context &&
        permission.permission === gate.permission
    ) !== undefined;

  return allowAccess === true ? (
    <>{children}</>
  ) : (
    // showMessage === undefined || showMessage === false ? null : (
    //   <Text variant="body" children={t("PermissionGate.message")} />
    // );
    <div className="border-2 border-orange-500 ">{children}</div>
  );
};

export default PermissionGate;
