import React, { PropsWithChildren, createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingAnimation } from "@component-library/index";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import { ServiceContextProvider } from "@/contexts/ServiceContext";

interface ServiceOutletProps {}

export const ServiceOutlet: React.FC<PropsWithChildren<ServiceOutletProps>> = (
  props
) => {
  const {} = props;
  const { project } = useProject();
  const { process } = useProcess();

  if (
    process !== undefined &&
    process.serviceType !== undefined &&
    process.serviceType !== 0
  )
    return (
      <ServiceContextProvider process={process}>
        <Outlet />
      </ServiceContextProvider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};
