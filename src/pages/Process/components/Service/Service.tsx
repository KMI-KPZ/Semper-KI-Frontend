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
      <ProcessMenu title={t("Project.components.Info.button.menu")}>
        <Button
          title={t("Process.Service.Service.button.editType")}
          stopPropagation={false}
          variant="secondary"
          size="sm"
          onClick={handleOnClickButtonEditType}
        />
      </ProcessMenu>
      <Container width="full" justify="start">
        <Heading variant="h2">
          {t("Process.Service.Service.title")}
          {`: ${
            process.serviceType === undefined ||
            process.serviceType === ServiceType.NONE
              ? t("Process.Service.Service.noType")
              : t(
                  `enum.ServiceType.${
                    ServiceType[process.serviceType] as keyof typeof ServiceType
                  }`
                )
          }`}
        </Heading>
      </Container>
      <Divider />
      {process.serviceType === undefined ||
      process.serviceType === ServiceType.NONE ? (
        <ServiceSelection />
      ) : (
        <ServiceDetails process={process} />
      )}
      {process.processStatus < ProcessStatus.CONTRACTOR_SELECTED ? (
        <>
          <Divider />
          <ProcessStatusButtons process={process} />
          {/* <Button
            active={process.processStatus === ProcessStatus.SERVICE_READY}
            variant="primary"
            title={t("Process.Service.Service.button.complete")}
            onClick={handleOnClickButtonComplete}
          /> */}
        </>
      ) : null}
    </ProcessContainer>
  );
};

export default Service;
