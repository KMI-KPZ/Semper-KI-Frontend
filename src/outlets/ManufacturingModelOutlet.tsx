import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";
import { ManufacturingModelContextProvider } from "@/contexts/ManufacturingModelContext";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import { useProject } from "@/hooks/Project/useProject";
import React, { PropsWithChildren, useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

interface ManufacturingModelOutletProps {}

const ManufacturingModelOutlet: React.FC<
  PropsWithChildren<ManufacturingModelOutletProps>
> = (props) => {
  const { children } = props;
  const { project } = useProject();
  const { process } = useManufacturingProcess();
  const { groupID } = useContext(ManufacturingGroupContext);
  const { modelID } = useParams();
  const model = process.serviceDetails.groups[groupID].models?.find(
    (model) => model.id === modelID
  );

  if (modelID !== undefined && model !== undefined)
    return (
      <ManufacturingModelContextProvider model={model}>
        {children}
        <Outlet />
      </ManufacturingModelContextProvider>
    );
  else
    return (
      <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
    );
};

export default ManufacturingModelOutlet;
