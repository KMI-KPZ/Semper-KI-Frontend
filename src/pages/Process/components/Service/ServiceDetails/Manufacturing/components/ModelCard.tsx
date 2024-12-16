import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import TestImg from "@images/Test2.png";
import {
  Button,
  Container,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useDeleteModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useDeleteModel";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import {
  ModelComplexity,
  ModelLevelOfDetail,
  ProcessModel,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import useGetCheckModel from "@/api/Process/Querys/useGetCheckModel";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface ProcessServiceModelCardProps {
  model: ProcessModel;
}

const ProcessServiceModelCard: React.FC<ProcessServiceModelCardProps> = (
  props
) => {
  const { model } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deleteModel = useDeleteModel();
  const checkModel = useGetCheckModel(model.id);
  const { groupID } = useContext(ManufacturingGroupContext);

  const handleOnButtonClickModel = () => {
    navigate(`service/manufacturing/${groupID}/model/${model.id}`);
  };
  const handleOnButtonClickDeleteModel = (modelID: string) => {
    deleteModel.mutate({
      processID: process.processID,
      projectID: project.projectID,
      modelID,
    });
  };

  const roundNumberWithDecimals = (number: number, decimals: number) => {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  if (checkModel.isLoading) return <LoadingAnimation />;
  if (checkModel.data !== undefined)
    return (
      <ServiceDetailsCard>
        <Container direction="col" width="full" className="gap-2">
          <Text variant="strong">{model.fileName}</Text>
          <img
            src={TestImg}
            className="max-h-40 w-full object-contain md:w-fit"
            alt={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.img"
            )}
          />
        </Container>
        <Container direction="col" width="full" className="gap-1">
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.quantity"
              )}
            </Text>
            <Text variant="strong">{model.quantity}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.levelOfDetail"
              )}
            </Text>
            <Text>
              {t(
                `enum.ModelLevelOfDetail.${
                  ModelLevelOfDetail[
                    model.levelOfDetail
                  ] as keyof typeof ModelLevelOfDetail
                }`
              )}
            </Text>
          </Container>
          {model.complexity !== undefined ? (
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.complexity"
                )}
              </Text>
              <Text>
                {t(
                  `enum.ModelComplexity.${
                    ModelComplexity[
                      model.complexity
                    ] as keyof typeof ModelComplexity
                  }`
                )}
              </Text>
            </Container>
          ) : null}
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.dimensions"
              )}
            </Text>
            <Text>{`${roundNumberWithDecimals(
              checkModel.data.measurements.mbbDimensions._1,
              2
            )} x ${roundNumberWithDecimals(
              checkModel.data.measurements.mbbDimensions._2,
              2
            )} x ${roundNumberWithDecimals(
              checkModel.data.measurements.mbbDimensions._3,
              2
            )} mm`}</Text>
          </Container>
          {checkModel.data !== undefined ? (
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.surface"
                )}
              </Text>
              <Text>
                {`${roundNumberWithDecimals(
                  checkModel.data.measurements.surfaceArea,
                  2
                )} mm²`}
              </Text>
            </Container>
          ) : null}
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.volume"
              )}
            </Text>
            <Text>{`${roundNumberWithDecimals(
              checkModel.data.measurements.volume,
              2
            )} mm³`}</Text>
          </Container>
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
                "Process.components.Service.ServiceDetails.components.Manufacturing.button.editModel"
              )}
              size="sm"
              variant="secondary"
              onClick={handleOnButtonClickModel}
              children={t("general.button.edit")}
            />
            <Button
              title={t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.button.deleteModel"
              )}
              size="sm"
              variant="text"
              onClick={() => handleOnButtonClickDeleteModel(model.id)}
              children={t("general.button.delete")}
            />
          </ProcessStatusGate>
        </Container>
      </ServiceDetailsCard>
    );
  return "";
};

export default ProcessServiceModelCard;
