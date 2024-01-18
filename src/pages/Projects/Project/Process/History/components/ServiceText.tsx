import { ServiceProps } from "@/pages/Service/hooks/useService";
import Container from "@component-library/Container";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessHistoryTextItem from "./TextItem";
import { instanceOfManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";

interface ProcessHistoryServiceTextProps {
  service: ServiceProps;
}

const ProcessHistoryServiceText: React.FC<ProcessHistoryServiceTextProps> = (
  props
) => {
  const { service } = props;
  const { t } = useTranslation();

  const renderMaterial = () => {
    return service !== undefined &&
      instanceOfManufacturingServiceProps(service) &&
      service.material !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.material"
        )}
        data={service.material.title}
      />
    ) : null;
  };
  const renderModel = () => {
    return service !== undefined &&
      instanceOfManufacturingServiceProps(service) &&
      service.model !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.model"
        )}
        data={service.model.fileName}
      />
    ) : null;
  };
  const renderPostProcessings = () => {
    return service !== undefined &&
      instanceOfManufacturingServiceProps(service) &&
      service.postProcessings !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.postProcessings"
        )}
        data={service.postProcessings
          .map((postProcessing) => {
            return postProcessing.title;
          })
          .join(", ")}
      />
    ) : null;
  };
  const renderManufacturer = () => {
    return service !== undefined &&
      instanceOfManufacturingServiceProps(service) &&
      service.manufacturerID !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.manufacturer"
        )}
        data={service.manufacturerID}
      />
    ) : null;
  };

  return (
    <Container>
      {renderMaterial()}
      {renderModel()}
      {renderPostProcessings()}
      {renderManufacturer()}
    </Container>
  );
};

export default ProcessHistoryServiceText;
