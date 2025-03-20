import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import React from "react";
import ProcessContainer from "@/components/Process/Container/Container";
import ServiceManufacturingView from "./ServiceDetails/Manufacturing/Manufacturing";
import { Container, Text } from "@component-library/index";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { useTranslation } from "react-i18next";

interface ServiceProps {
  process: Process;
}

const ServiceDetails: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  const getAddtionalTitle = (): string | undefined => {
    switch (process.serviceType) {
      case ServiceType.ADDITIVE_MANUFACTURING:
        return `${t("Process.components.Service.ServiceDetails.group", {
          count: process.serviceDetails.groups.length,
        })} ${t("Process.components.Service.ServiceDetails.model", {
          count: process.serviceDetails.groups.reduce(
            (acc, group) => acc + group.models.length,
            0
          ),
        })}`;
      default:
        return undefined;
    }
  };

  const renderServiceView = () => {
    switch (process.serviceType) {
      case ServiceType.ADDITIVE_MANUFACTURING:
        return <ServiceManufacturingView process={process} />;
      default:
        return (
          <Container
            direction="col"
            className="rounded-md bg-white p-5"
            width="full"
          >
            <Text>{t("Process.components.Service.ServiceDetails.dummy2")}</Text>
          </Container>
        );
    }
  };

  return (
    <ProcessContainer
      id="ServiceDetails"
      start={ProcessStatus.DRAFT}
      end={ProcessStatus.SERVICE_COMPLICATION}
      titleAddition={getAddtionalTitle()}
    >
      {renderServiceView()}
    </ProcessContainer>
  );
};

export default ServiceDetails;
