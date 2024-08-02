import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { ManufacturingProcessContextProvider } from "@/contexts/ManufacturingProcessContext";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import { useProject } from "@/hooks/Project/useProject";
import logger from "@/hooks/useLogger";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ManufacturingProcessOutletProps {}

const ManufacturingProcessOutlet: React.FC<
  PropsWithChildren<ManufacturingProcessOutletProps>
> = (props) => {
  const { children } = props;
  const { project } = useProject();
  const { process } = useDefinedProcess();

  if (process.serviceType === ServiceType.MANUFACTURING)
    return (
      <ManufacturingProcessContextProvider process={process}>
        {children}
        <Outlet />
      </ManufacturingProcessContextProvider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};

export default ManufacturingProcessOutlet;
