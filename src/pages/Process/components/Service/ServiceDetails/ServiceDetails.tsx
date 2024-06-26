import { Process } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceManufacturingView from "./Manufacturing/Manufacturing";

interface ServiceProps {
  process: Process;
}

const ServiceDetails: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

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
