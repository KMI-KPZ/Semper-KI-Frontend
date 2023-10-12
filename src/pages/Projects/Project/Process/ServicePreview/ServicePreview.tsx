import {
  GeneralServiceProps,
  ServiceType,
} from "@/pages/Service/hooks/useService";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessServiceManufacturing from "./components/Manufacturing";
import ProcessServiceModelling from "./components/Modelling";
import { Heading } from "@component-library/Typography";
import { Divider } from "@component-library/Divider";
import ServiceSelect from "@/pages/Service/Select/Select";

interface ProcessServicePreviewProps {
  service: GeneralServiceProps;
  processID: string;
}

const ProcessServicePreview: React.FC<ProcessServicePreviewProps> = (props) => {
  const { service, processID } = props;
  const { t } = useTranslation();

  const renderService = () => {
    if (
      service.type === undefined ||
      (service.type !== undefined && service.type === undefined)
    )
      return <ServiceSelect processID={processID} />;
    switch (service.type) {
      case ServiceType.UNDEFINED:
        return <ServiceSelect processID={processID} />;
      case ServiceType.MANUFACTURING:
        return <ProcessServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <ProcessServiceModelling service={service} />;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center pt-5 md:p-0">
      <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center">
        <Heading variant="h3" className="whitespace-nowrap">
          {t("Projects.ProjectView.Service.title")}{" "}
          {t(`ProjectRoutes.Service.type.${ServiceType[service.type]}`)}
        </Heading>
        <Divider className="mt-[0.3rem] hidden md:block" />
      </div>
      {renderService()}
    </div>
  );
};

export default ProcessServicePreview;
