import { Process } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import React from "react";
import ServiceManufacturingView from "./Manufacturing/Manufacturing";
import { Container, Text } from "@component-library/index";
import { useTranslation } from "react-i18next";

interface ServiceProps {
  process: Process;
}

const ServiceDetails: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  switch (process.serviceType) {
    case ServiceType.ADDITIVE_MANUFACTURING:
      return <ServiceManufacturingView process={process} />;
    default:
      return (
        <Container direction="col">
          {/* <Text>{t("Process.components.Service.ServiceDetails.dummy")}</Text> */}
          <Text>{t("Process.components.Service.ServiceDetails.dummy2")}</Text>
        </Container>
      );
  }
};

export default ServiceDetails;
