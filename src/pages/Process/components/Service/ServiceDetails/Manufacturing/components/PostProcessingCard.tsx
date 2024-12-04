import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import TestImg from "@images/Test2.png";
import { Button, Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import { PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

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
  const { groupID } = useContext(ManufacturingGroupContext);
  const handleOnButtonClickPostProcessing = () => {
    navigate(`service/manufacturing/${groupID}/postprocessing`);
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
      <Container direction="col" width="full" className="gap-2">
        <Text variant="strong">{postProcessing.title}</Text>
        <img
          src={TestImg}
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.PostProcessingCard.img"
          )}
          className="max-h-40 w-full object-contain md:w-fit"
        />
      </Container>

      <Container direction="col" width="full" className="" gap={3}>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.PostProcessingCard.type"
            )}
          </Text>
          <Text>---</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.PostProcessingCard.properties"
            )}
          </Text>
        </Container>
        <ul className="flex w-full list-inside list-disc flex-col items-start justify-start pl-3">
          {postProcessing.propList.length > 0 ? (
            postProcessing.propList
              .filter((item) => item.name !== "imgPath")
              .map((prop, index) => (
                <li key={index}>
                  {isOntoNodePropertyName(prop.name)
                    ? t(
                        `types.OntoNodePropertyName.${
                          prop.name as OntoNodePropertyName
                        }`
                      )
                    : prop.name}
                  {": "}
                  {prop.value.toString()}
                </li>
              ))
          ) : (
            <li>---</li>
          )}
        </ul>
      </Container>
      <Container
        direction="col"
        justify="center"
        width="fit"
        gap={3}
        className="flex-row p-5 md:flex-col"
      >
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.button.editPostProcessing"
            )}
            size="sm"
            variant="secondary"
            onClick={handleOnButtonClickPostProcessing}
            children={t("general.button.edit")}
          />
          <Button
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.button.deletePostProcessing"
            )}
            size="sm"
            variant="text"
            onClick={() =>
              handleOnButtonClickDeletePostProcessing(postProcessing.id)
            }
            children={t("general.button.delete")}
          />
        </ProcessStatusGate>
      </Container>
    </ServiceDetailsCard>
  );
};

export default ProcessSericePostProcessingCard;
