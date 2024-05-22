import React, { createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ServiceProps } from "../hooks/useService";
import { LoadingAnimation } from "@component-library/index";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";

type ServiceContextType = {
  serviceDetails: ServiceProps;
};

export const ServiceContext = createContext<ServiceContextType>({
  serviceDetails: {},
});

interface ServiceContextProviderProps {}

export const ServiceContextProvider: React.FC<ServiceContextProviderProps> = (
  props
) => {
  const {} = props;
  const { projectQuery, project } = useProject();
  const { process } = useProcess();

  if (projectQuery.isLoading) return <LoadingAnimation />;

  if (
    projectQuery.isFetched &&
    process !== undefined &&
    process.serviceType !== undefined &&
    process.serviceType !== 0
  )
    return (
      <ServiceContext.Provider
        value={{ serviceDetails: process.serviceDetails }}
      >
        <Outlet />
      </ServiceContext.Provider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};
