import React, { PropsWithChildren, createContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import { DefinedProcessContextProvider } from "@/contexts/DefinedProcessContext";

interface DefinedProcessOutletProps {}

export const DefinedProcessOutlet: React.FC<
  PropsWithChildren<DefinedProcessOutletProps>
> = (props) => {
  const { children } = props;
  const { project } = useProject();
  const { process } = useProcess();

  if (
    process !== undefined &&
    process.serviceType !== undefined &&
    process.serviceType !== 0
  )
    return (
      <DefinedProcessContextProvider process={process}>
        <Outlet />
        {children}
      </DefinedProcessContextProvider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};
