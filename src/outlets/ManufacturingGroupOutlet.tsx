import { ManufacturingGroupContextProvider } from "@/contexts/ManufacturingGroupContext";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import { useProject } from "@/hooks/Project/useProject";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

interface ManufacturingGroupOutletProps {}

const ManufacturingGroupOutlet: React.FC<
  PropsWithChildren<ManufacturingGroupOutletProps>
> = (props) => {
  const { children } = props;
  const { project } = useProject();
  const { process } = useManufacturingProcess();
  const { groupID } = useParams();
  const groupIDNumber = parseInt(groupID || "");

  if (
    groupID !== undefined &&
    process.serviceDetails[groupIDNumber] !== undefined
  )
    return (
      <ManufacturingGroupContextProvider
        group={process.serviceDetails[groupIDNumber]}
        groupID={groupIDNumber}
        allGroups={process.serviceDetails}
      >
        {children}
        <Outlet />
      </ManufacturingGroupContextProvider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};

export default ManufacturingGroupOutlet;
