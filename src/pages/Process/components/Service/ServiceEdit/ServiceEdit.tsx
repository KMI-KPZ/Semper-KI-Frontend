import React from "react";
import { LoadingAnimation } from "@component-library/index";
import useProcess from "../../../../../hooks/Process/useProcess";
import { Navigate } from "react-router-dom";
import { useProject } from "../../../../../hooks/Project/useProject";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface ServiceEditProps {}

const ServiceEdit: React.FC<ServiceEditProps> = (props) => {
  const {} = props;
  const { project } = useProject();
  const { process } = useProcess();

  switch (process.serviceType) {
    case ServiceType.NONE:
      return (
        <Navigate to={`/projects/${project.projectID}/${process.processID}`} />
      );
    case ServiceType.MANUFACTURING:
      return <Navigate to="manufacturing" />;
    case ServiceType.MODELING:
      return <Navigate to="modeling" />;
  }

  return <LoadingAnimation />;
};

export default ServiceEdit;
