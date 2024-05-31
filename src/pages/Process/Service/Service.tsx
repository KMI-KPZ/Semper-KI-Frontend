import { Process } from "@/api/Process/Querys/useGetProcess";
import CardMenu from "@/components/CardMenu/CardMenu";
import { Button, Container, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCards from "./components/ServiceCards";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

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

  return (
    <Container direction="col" width="full" className="relative bg-white p-3">
      <CardMenu title={t("Project.components.Info.button.menu")}>
        <Button
          title={t("Process.Service.Service.button.editType")}
          stopPropagation={false}
          variant="secondary"
          size="sm"
          onClick={handleOnClickButtonEditType}
        />
      </CardMenu>
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
      {process.serviceType === undefined ||
      process.serviceType === ServiceType.NONE ? (
        <ServiceCards />
      ) : null}
    </Container>
  );
};

export default Service;
