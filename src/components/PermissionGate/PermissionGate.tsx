import { UserType } from "@/hooks/useUser/types";
import { AppContext } from "@/pages/App/App";
import React, { PropsWithChildren, useContext } from "react";
import { useTranslation } from "react-i18next";
import usePermissionGate from "./hooks/usePermissionGate";
import logger from "@/hooks/useLogger";

interface PermissionProps {
  element: string | string[];
  showMessage?: boolean;
  concat?: "or" | "and";
}

const PermissionGate: React.FC<PropsWithChildren<PermissionProps>> = (
  props
) => {
  const { children, element, showMessage = false, concat = "and" } = props;
  const { t } = useTranslation();
  const { hasPermission: elementHasPermission } = usePermissionGate();

  const checkElements = (elements: string[]) => {
    return concat === "and"
      ? elements.every((element) => elementHasPermission(element))
      : elements.some((element) => elementHasPermission(element));
  };
  const hasPermission = (element: string | string[]): boolean => {
    return Array.isArray(element)
      ? checkElements(element)
      : elementHasPermission(element);
  };

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
