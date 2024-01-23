import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";
import { Button, LoadingAnimation } from "@component-library/index";
import { Container } from "@component-library/index";
import { Modal } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ModelPreview from "@/pages/Test/STLViewer";
import useProcess, {
  ManufactoringProcessProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";
import Card from "@component-library/Card/Card";
import { useNavigate, useParams } from "react-router-dom";

interface ProcessServiceManufacturingProps {
  process: ManufactoringProcessProps;
}

const ProcessServiceManufacturing: React.FC<
  ProcessServiceManufacturingProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { downloadFile, getNavigationPrefix } = useGeneralProcess();
  const [fileUrl, setFileUrl] = useState<string>("");

  const closeModal = () => {
    setOpen(false);
    setFileUrl("");
  };

  const handleOnClickButtonOpen = () => {
    setOpen(true);
    setLoading(true);
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
            setLoading(false);
          },
        }
      );
    }
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    card: "model" | "material" | "postprocessing"
  ) => {
    e.preventDefault();
    switch (card) {
      case "model":
        navigate(
          `${getNavigationPrefix(process.processID)}service/manufacturing/model`
        );
        break;
      case "material":
        navigate(
          `${getNavigationPrefix(
            process.processID
          )}service/manufacturing/material`
        );
        break;
      case "postprocessing":
        navigate(
          `${getNavigationPrefix(
            process.processID
          )}service/manufacturing/postprocessing`
        );
        break;
    }
  };

  return (
    <Container
      direction="auto"
      justify="around"
      className="flex-wrap items-center md:items-start"
      width="full"
    >
      <Container direction="col" className="w-full md:w-fit">
        <Card
          className={`w-full flex-row flex-wrap md:w-fit ${
            process.serviceDetails.model === undefined
              ? "border-yellow-500"
              : "border-green-500"
          }`}
          onClick={(e) => handleOnClickCard(e, "model")}
        >
          <Text variant="body">
            {t(
              "Projects.Project.Process.ServicePreview.components.Manufacturing.model"
            )}
          </Text>
          <Text variant="body">
            {process.serviceDetails.model === undefined
              ? t(
                  "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
                )
              : process.serviceDetails.model.fileName}
          </Text>
        </Card>
        {process.serviceDetails.model !== undefined ? (
          <PermissionGate element={"ProcessButtonModelPreView"}>
            <Button
              size="sm"
              onClick={handleOnClickButtonOpen}
              title={t(
                "Projects.Project.Process.ServicePreview.components.Manufacturing.buttons.modelPreView"
              )}
            />
          </PermissionGate>
        ) : null}
      </Container>
      <Card
        className={`w-full flex-row flex-wrap md:w-fit ${
          process.serviceDetails.material === undefined
            ? "border-yellow-500"
            : "border-green-500"
        }`}
        onClick={(e) => handleOnClickCard(e, "material")}
      >
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.material"
          )}
        </Text>
        <Text variant="body">
          {process.serviceDetails.material === undefined
            ? t(
                "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
              )
            : process.serviceDetails.material.title}
        </Text>
      </Card>
      <Card
        className="w-full flex-row flex-wrap border-green-500 md:w-fit"
        onClick={(e) => handleOnClickCard(e, "postprocessing")}
      >
        <Text variant="body">
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.postProcessings"
          )}
        </Text>
        <Text variant="body">
          {process.serviceDetails.postProcessings === undefined
            ? t(
                "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
              )
            : process.serviceDetails.postProcessings.map(
                (postProcessing: PostProcessingProps) => postProcessing.title
              )}
        </Text>
      </Card>
      <Modal
        title="ModelPreview"
        open={open}
        closeModal={closeModal}
        className="h-full max-w-7xl bg-white"
      >
        {loading ? (
          <LoadingAnimation />
        ) : fileUrl !== "" ? (
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
