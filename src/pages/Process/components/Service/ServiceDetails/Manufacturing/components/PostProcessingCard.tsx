import React from "react";
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
import ProcessStatusGate from "@/components/Process/StatusGate";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

interface ProcessSericePostProcessingCardProps {
  postProcessing: PostProcessingProps;
  groupID: number;
}

const ProcessSericePostProcessingCard: React.FC<
  ProcessSericePostProcessingCardProps
> = (props) => {
  const { postProcessing, groupID } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deletePostProcessing = useDeletePostProcessing();
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
      groupID,
    });
  };

  return (
    <ServiceDetailsCard>
      <Container direction="col" width="full" className="gap-2">
        <Text variant="strong">{postProcessing.title}</Text>
        <img
          src={postProcessing.imgPath ? postProcessing.imgPath : TestImg}
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.PostProcessingCard.img"
          )}
          className="aspect-square max-h-40 w-full rounded-md border-2 object-cover md:w-fit"
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
        <ProcessStatusGate endExclude end={ProcessStatus.SERVICE_COMPLETED}>
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
