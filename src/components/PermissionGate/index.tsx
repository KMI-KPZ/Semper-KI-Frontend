import { UserType } from "@/hooks/useUser/types";
import { AppContext } from "@/pages/App";
import React, { PropsWithChildren, useContext } from "react";
import { useTranslation } from "react-i18next";
import usePermissionGate from "./hooks";

interface PermissionProps {
  element: string;
  showMessage?: boolean;
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, element, showMessage } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  return hasPermission(element) ? (
    <>{children}</>
  ) : (
    //  showMessage === undefined || showMessage === false ? null : (
    //   <Text variant="body" children={t("PermissionGate.message")} />
    // );
    <div className="border-2 border-orange-500 ">{children}</div>
  );
};

export default PermissionGate;
