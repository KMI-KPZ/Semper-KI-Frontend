import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Contact from "@/pages/Legal/Contact/Contact";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ServiceManufacturingProps } from "@/pages/Service/Manufacturing/types/types";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import Modal from "@component-library/Modal";
import { Heading, Text } from "@component-library/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessServiceManufacturingModelPreview from "./ModellPreView";

interface ProcessServiceManufacturingProps {
  service: ServiceManufacturingProps;
}

const ProcessServiceManufacturing: React.FC<
  ProcessServiceManufacturingProps
> = (props) => {
  const { service } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleOnClickButtonOpen = () => {
    setOpen(true);
  };

  return (
    <Container direction="col" align="start" className="p-5">
      <PermissionGate element={"ProcessButtonModelPreView"}>
        <Button
          onClick={handleOnClickButtonOpen}
          title={t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.buttons.modelPreView"
          )}
        />
      </PermissionGate>
      <Container>
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.model"
          )}
        </Text>
        <Text variant="body">
          {service.model === undefined ? "---" : service.model.title}
        </Text>
      </Container>
      <Container>
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.material"
          )}
        </Text>
        <Text variant="body">
          {service.material === undefined ? "---" : service.material.title}
        </Text>
      </Container>
      <Container>
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.postProcessings"
          )}
        </Text>
        <Text variant="body">
          {service.postProcessings === undefined
            ? "---"
            : service.postProcessings.map(
                (postProcessing: PostProcessingProps) => postProcessing.title
              )}
        </Text>
      </Container>
      <Modal
        open={open}
        closeModal={() => {
          setOpen(false);
        }}
      >
        <ProcessServiceManufacturingModelPreview modelUrl="/assets/test/3DBenchy.stl" />
      </Modal>
    </Container>
  );
};

export default ProcessServiceManufacturing;
