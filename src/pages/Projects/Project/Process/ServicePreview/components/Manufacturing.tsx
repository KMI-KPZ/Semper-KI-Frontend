import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import Modal from "@component-library/Modal";
import { Heading, Text } from "@component-library/Typography";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ModelPreview from "@/pages/Test/STLViewer";
import useProcess, {
  ManufactoringProcessProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";

interface ProcessServiceManufacturingProps {
  process: ManufactoringProcessProps;
}

const ProcessServiceManufacturing: React.FC<
  ProcessServiceManufacturingProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const { downloadFile } = useGeneralProcess();
  const [fileUrl, setFileUrl] = useState<string>("");

  const closeModal = () => {
    setOpen(false);
    setFileUrl("");
  };

  const handleOnClickButtonOpen = () => {
    setOpen(true);
    if (
      process.serviceDetails.model !== undefined &&
      process.files.length > 0 &&
      process.files.find(
        (file) =>
          process.serviceDetails.model !== undefined &&
          file.id === process.serviceDetails.model.id
      ) !== undefined
    ) {
      downloadFile(
        {
          processID: process.processID,
          fileID: process.serviceDetails.model.id,
        },
        {
          onSuccess(data) {
            const url = window.URL.createObjectURL(data);
            setFileUrl(url);
          },
        }
      );
    }
  };

  return (
    <Container direction="col" align="start" className="p-5">
      {process.serviceDetails.model !== undefined ? (
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
          {process.serviceDetails.model === undefined
            ? "---"
            : process.serviceDetails.model.fileName}
        </Text>
      </Container>
      <Container>
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.material"
          )}
        </Text>
        <Text variant="body">
          {process.serviceDetails.material === undefined
            ? "---"
            : process.serviceDetails.material.title}
        </Text>
      </Container>
      <Container>
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.postProcessings"
          )}
        </Text>
        <Text variant="body">
          {process.serviceDetails.postProcessings === undefined
            ? "---"
            : process.serviceDetails.postProcessings.map(
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
