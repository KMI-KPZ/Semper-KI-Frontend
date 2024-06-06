import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessHistoryTextItem from "./TextItem";
import {
  ServiceProps,
  instanceOfManufacturingServiceProps,
} from "@/api/Service/Querys/useGetServices";

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
      service.materials !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.material"
        )}
        data={service.materials.title}
      />
    ) : null;
  };
  const renderModel = () => {
    return service !== undefined &&
      instanceOfManufacturingServiceProps(service) &&
      service.models !== undefined ? (
      <ProcessHistoryTextItem
        name={t(
          "Projects.Project.Process.History.components.ServiceText.manufacturing.model"
        )}
        data={service.models.fileName}
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
