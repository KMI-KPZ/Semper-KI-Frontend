import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AppContext } from "@/pages/App";
import { useContext } from "react";
import { Permission } from "@/hooks/usePermissions";

interface ReturnProps {
  hasPermission(gate: Permission): boolean;
}

const usePermissionGate = (): ReturnProps => {
  const {
    appState: { permissions },
  } = useContext(AppContext);

  const hasPermission = (gate: Permission): boolean => {
    return (
      permissions !== undefined &&
      permissions.find(
        (permission) =>
          permission.context === gate.context &&
          permission.permission === gate.permission
      ) !== undefined
    );
  };

  return { hasPermission };
};

export default usePermissionGate;
