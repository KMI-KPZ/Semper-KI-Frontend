import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessMenu from "@/components/Process/Menu";
import { Button, Container, Divider, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceSelection from "./ServiceSelection/ServiceSelection";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import ServiceDetails from "./ServiceDetails/ServiceDetails";
import ProcessStatusButtons from "../StatusButtons";
import ProcessContainer from "@/components/Process/Container";
import ProcessHeader from "@/components/Process/Header";

interface ServiceProps {
  process: Process;
}

const Service: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const updateProcess = useUpdateProcess();

  const handleOnClickButtonEditType = () => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { changes: { serviceType: ServiceType.NONE } },
    });
  };

  const handleOnClickButtonComplete = () => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: {
        changes: { processStatus: ProcessStatus.CONTRACTOR_SELECTED },
      },
    });
  };

  return (
    <ProcessContainer id="draft">
      <ProcessHeader
        menuTitle={t("Project.components.Info.button.menu")}
        pageTitle={`${t("Process.Service.Service.title")}: ${
          process.serviceType === undefined ||
          process.serviceType === ServiceType.NONE
            ? t("Process.Service.Service.noType")
            : t(
                `enum.ServiceType.${
                  ServiceType[process.serviceType] as keyof typeof ServiceType
                }`
              )
        }`}
      >
        <Button
          title={t("Process.Service.Service.button.editType")}
          stopPropagation={false}
          variant="secondary"
          size="sm"
          onClick={handleOnClickButtonEditType}
        />
      </ProcessHeader>

      {process.serviceType === undefined ||
      process.serviceType === ServiceType.NONE ? (
        <ServiceSelection />
      ) : (
        <ServiceDetails process={process} />
      )}

      <ProcessStatusButtons
        start={ProcessStatus.DRAFT}
        end={ProcessStatus.SERVICE_COMPLICATION}
      />
    </ProcessContainer>
  );
};

export default Service;
