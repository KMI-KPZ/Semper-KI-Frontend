import React, { useDebugValue } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useParams } from "react-router-dom";
import useProcess, { ProcessProps } from "../hooks/useProcess";
import logger from "@/hooks/useLogger";
import { LoadingAnimation } from "@component-library/index";
import { useProject } from "../hooks/useProject";

interface ProcessContextProviderProps {}

export interface ProcessContextProps {
  process: ProcessProps;
}

export const ProcessContext = React.createContext<ProcessContextProps>({
  process: {
    client: "",
    contractor: [""],
    created: new Date(),
    details: {},
    files: [],
    messages: { messages: [] },
    processID: "",
    service: undefined,
    serviceStatus: 0,
    status: 0,
    updated: new Date(),
    serviceType: 0,
  },
});

const ProcessContextProvider: React.FC<ProcessContextProviderProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { project, projectQuery } = useProject();
  const { processID } = useParams();

  const process = project.processes.find(
    (process) => process.processID === processID
  );

  if (projectQuery.isLoading || projectQuery.isRefetching)
    return <LoadingAnimation />;

  if (process !== undefined && projectQuery.isFetched)
    return (
      <ProcessContext.Provider value={{ process }}>
        <Outlet />
      </ProcessContext.Provider>
    );

  return <Navigate to="/projects" />;
};

export default ProcessContextProvider;
