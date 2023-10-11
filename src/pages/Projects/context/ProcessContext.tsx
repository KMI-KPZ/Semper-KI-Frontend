import React, { useDebugValue } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import useProcess, { ProcessProps } from "../hooks/useProcess";
import logger from "@/hooks/useLogger";

interface ProcessContextProviderProps {}

export interface ProcessContextProps {
  process?: ProcessProps;
}

export const ProcessContext = React.createContext<ProcessContextProps>({
  process: undefined,
});

const ProcessContextProvider: React.FC<ProcessContextProviderProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { getCurrentProcess } = useProcess();
  const process = getCurrentProcess();
  if (process === undefined)
    logger("ProcessContextProvider", process !== undefined ? process : ""); // return <Navigate to="/projects" />;

  return (
    <ProcessContext.Provider value={{ process }}>
      <Outlet />
    </ProcessContext.Provider>
  );
};

export default ProcessContextProvider;
