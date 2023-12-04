import React, { createContext, useContext, useState } from "react";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { Navigate, Outlet } from "react-router-dom";
import { ServiceProps } from "../hooks/useService";
import { useProject } from "@/pages/Projects/hooks/useProject";
import { LoadingAnimation } from "@component-library/index";

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

  if (projectQuery.isLoading || projectQuery.isRefetching)
    return <LoadingAnimation />;

  if (
    projectQuery.isFetched &&
    !projectQuery.isRefetching &&
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
