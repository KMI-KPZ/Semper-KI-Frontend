import { Process } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import React from "react";
import ServiceManufacturingView from "./Manufacturing/Manufacturing";

interface ServiceProps {
  process: Process;
}

const ServiceDetails: React.FC<ServiceProps> = (props) => {
  const { process } = props;

  switch (process.serviceType) {
    case ServiceType.MANUFACTURING:
      return <ServiceManufacturingView process={process} />;
    case ServiceType.MODELING:
      return <div>MODELING</div>;
    case ServiceType.NONE:
      return <div>NONE</div>;
    default:
      return <div>default</div>;
  }
};

export default ServiceDetails;
