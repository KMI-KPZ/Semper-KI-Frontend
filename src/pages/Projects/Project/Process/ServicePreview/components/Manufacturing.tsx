import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Contact from "@/pages/Legal/Contact/Contact";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ServiceManufacturingProps } from "@/pages/Service/Manufacturing/types/types";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import Modal from "@component-library/Modal";
import { Heading, Text } from "@component-library/Typography";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessServiceManufacturingModelPreview from "./ModellPreView";
import useTest from "@/pages/Test/hooks/useTest";
import ModelPreview from "@/pages/Test/STLViewer";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { use } from "i18next";
import logger from "@/hooks/useLogger";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";

interface ProcessServiceManufacturingProps {
  process: ProcessProps;
  service: ServiceManufacturingProps;
}

const ProcessServiceManufacturing: React.FC<
  ProcessServiceManufacturingProps
> = (props) => {
  const { process, service } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const { downloadFileTest } = useTest();
  const [fileUrl, setFileUrl] = useState<string>("");

  const closeModal = () => {
    setOpen(false);
    setFileUrl("");
  };

  const handleOnClickButtonOpen = () => {
    setOpen(true);
    if (
      service.model !== undefined &&
      process.files.length > 0 &&
      process.files.find(
        (file) => service.model !== undefined && file.id === service.model.id
      ) !== undefined
    ) {
      downloadFileTest.mutate(
        {
          processID: process.processID,
          fileID: service.model.id,
        },
        {
          onSuccess(data) {
            // logger("success", "downloadFileTest.mutate", data);
            setFileUrl(data);
          },
        }
      );
    }
  };

  return (
    <Container direction="col" align="start" className="p-5">
      {service.model !== undefined ? (
        <PermissionGate element={"ProcessButtonModelPreView"}>
          <Button
            onClick={handleOnClickButtonOpen}
            title={t(
              "Projects.Project.Process.ServicePreview.components.Manufacturing.buttons.modelPreView"
            )}
          />
        </PermissionGate>
      ) : null}
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
        title="ModelPreview"
        open={open}
        closeModal={closeModal}
        className="h-full max-w-7xl bg-white"
      >
        {fileUrl !== "" ? (
          <ModelPreview file={fileUrl} />
        ) : (
          <div className="p-20">
            {t(
              "Projects.Project.Process.ServicePreview.components.Manufacturing.noModel"
            )}
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default ProcessServiceManufacturing;
