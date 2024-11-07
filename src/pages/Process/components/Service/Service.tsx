import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Button } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceSelection from "./ServiceSelection/ServiceSelection";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import ServiceDetails from "./ServiceDetails/ServiceDetails";
import ProcessContainer from "@/components/Process/Container";
import ProcessFilter from "./Filter/Filter";
import ProcessStatusGate from "../StatusGate";

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

  // const handleOnClickButtonComplete = () => {
  //   updateProcess.mutate({
  //     processIDs: [process.processID],
  //     updates: {
  //       changes: { processStatus: ProcessStatus.CONTRACTOR_COMPLETED },
  //     },
  //   });
  // };

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
      menuChildren={
        <Button
          title={t("Process.components.Service.button.editType")}
          stopPropagation={false}
          variant="secondary"
          size="sm"
          onClick={handleOnClickButtonEditType}
        />
      }
    >
      {noServiceSelected ? (
        <ServiceSelection />
      ) : (
        <>
          {process.serviceType === ServiceType.ADDITIVE_MANUFACTURING ? (
            <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
              <ProcessFilter />
            </ProcessStatusGate>
          ) : null}
          <ServiceDetails process={process} />
        </>
      )}
    </ProcessContainer>
  );
};

export default Service;
