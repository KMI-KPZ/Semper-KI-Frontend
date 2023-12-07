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
    contractor: "",
    createdWhen: new Date(),
    processDetails: {},
    files: [],
    messages: [],
    processID: "",
    serviceDetails: undefined,
    serviceStatus: 0,
    processStatus: 0,
    updatedWhen: new Date(),
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

  if (projectQuery.isLoading) return <LoadingAnimation />;

  if (process !== undefined && projectQuery.isFetched)
    return (
      <ProcessContext.Provider value={{ process }}>
        <Outlet />
      </ProcessContext.Provider>
    );

  return <Navigate to={`/projects/${project.projectID}`} />;
};

export default ProcessContextProvider;
