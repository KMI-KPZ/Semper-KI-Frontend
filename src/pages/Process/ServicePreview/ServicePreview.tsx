import { ServiceType } from "@/pages/Service/hooks/useService";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessServiceManufacturing from "./components/Manufacturing";
import ProcessServiceModelling from "./components/Modelling";
import { Heading } from "@component-library/index";
import { Divider } from "@component-library/index";
import { Process } from "@/hooks/Process/useProcess";
import ProcessServiceSelect from "./components/Select";

interface ProcessServicePreviewProps {
  process: Process;
}

const ProcessServicePreview: React.FC<ProcessServicePreviewProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  const renderService = () => {
    switch (process.serviceType) {
      case ServiceType.NONE:
        return <ProcessServiceSelect process={process} />;
      case ServiceType.MANUFACTURING:
        return <ProcessServiceManufacturing process={process} />;
      case ServiceType.MODELING:
        return <ProcessServiceModelling process={process} />;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 pt-5 md:p-0">
      <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center">
        <Heading variant="h3" className="whitespace-nowrap">
          {t("Projects.Project.Process.ServicePreview.ServicePreview.title")}{" "}
          {t(
            `enum.ServiceType.${
              ServiceType[process.serviceType] as keyof typeof ServiceType
            }`
          )}
        </Heading>
        <Divider className="mt-[0.3rem] hidden md:block" />
      </div>
      {renderService()}
    </div>
  );
};

export default ProcessServicePreview;
