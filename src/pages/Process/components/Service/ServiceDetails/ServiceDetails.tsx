import { Process } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import React from "react";
import ServiceManufacturingView from "./Manufacturing/Manufacturing";
import { Container, Text } from "@component-library/index";

interface ServiceProps {
  process: Process;
}

const ServiceDetails: React.FC<ServiceProps> = (props) => {
  const { process } = props;

  switch (process.serviceType) {
    case ServiceType.ADDITIVE_MANUFACTURING:
      return <ServiceManufacturingView process={process} />;
    default:
      return (
        <Container direction="col">
          <Text>Dummy Service</Text>
          <Text>Service noch nicht angelegt</Text>
        </Container>
      );
  }
};

export default ServiceDetails;
