import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import TestImg from "@images/Test2.png";
import { Button, Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import { PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";

interface ProcessSericePostProcessingCardProps {
  postProcessing: PostProcessingProps;
}

const ProcessSericePostProcessingCard: React.FC<
  ProcessSericePostProcessingCardProps
> = (props) => {
  const { postProcessing } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deletePostProcessing = useDeletePostProcessing();
  const handleOnButtonClickPostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };
  const handleOnButtonClickDeletePostProcessing = (
    postProcessingID: string
  ) => {
    deletePostProcessing.mutate({
      processID: process.processID,
      projectID: project.projectID,
      postProcessingID,
    });
  };

  return (
    <ServiceDetailsCard>
      <img
        src={TestImg}
        alt={t(
          "Process.Service.ServiceDetails.components.manufacturing.postProcessing.img"
        )}
      />
      <Container direction="col" width="full" className="" gap={3}>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.name"
            )}
          </Text>
          <Text>{postProcessing.title}</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.type"
            )}
          </Text>
          <Text>---</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.describtion"
            )}
          </Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>{}</Text>
        </Container>
      </Container>
      <Container
        direction="col"
        justify="center"
        width="fit"
        gap={3}
        className="p-5"
      >
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.editPostProcessing"
            )}
            size="sm"
            variant="secondary"
            onClick={handleOnButtonClickPostProcessing}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.edit"
            )}
          />
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.deletePostProcessing"
            )}
            size="sm"
            variant="text"
            onClick={() =>
              handleOnButtonClickDeletePostProcessing(postProcessing.id)
            }
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.delete"
            )}
          />
        </ProcessStatusGate>
      </Container>
    </ServiceDetailsCard>
  );
};

export default ProcessSericePostProcessingCard;
