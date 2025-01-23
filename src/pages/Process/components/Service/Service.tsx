import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceSelection from "./ServiceSelection/ServiceSelection";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import ServiceDetails from "./ServiceDetails/ServiceDetails";
import ProcessContainer from "@/components/Process/Container/Container";

interface ServiceProps {
  process: Process;
}

const Service: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  const menuButtonTitle = t("Process.components.Service.button.menu");
  const pageTitle = `${t("Process.components.Service.heading")}: ${
    process.serviceType === undefined ||
    process.serviceType === ServiceType.NONE
      ? t("Process.components.Service.noType")
      : t(
          `enum.ServiceType.${
            ServiceType[process.serviceType] as keyof typeof ServiceType
          }`
        )
  }`;

  const noServiceSelected =
    process.serviceType === undefined ||
    process.serviceType === ServiceType.NONE;

  return (
    <ProcessContainer
      id="Service"
      start={ProcessStatus.DRAFT}
      end={ProcessStatus.SERVICE_COMPLICATION}
      menuButtonTitle={menuButtonTitle}
      pageTitle={pageTitle}
    >
      {noServiceSelected ? (
        <ServiceSelection />
      ) : (
        <ServiceDetails process={process} />
      )}
    </ProcessContainer>
  );
};

export default Service;
