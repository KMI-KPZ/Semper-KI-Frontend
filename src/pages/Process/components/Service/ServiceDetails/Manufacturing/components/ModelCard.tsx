import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import TestImg from "@images/Test2.png";
import { Button, Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useDeleteModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useDeleteModel";
import { useProject } from "@/hooks/Project/useProject";
import {
  ModelComplexity,
  ModelLevelOfDetail,
  ProcessModel,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/components/Process/StatusGate";
import useProcess from "@/hooks/Process/useProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { CheckModel } from "@/api/Process/Querys/useGetCheckModel";
import { getFileSizeAsString } from "@/services/utils";

interface ProcessServiceModelCardProps {
  model: ProcessModel;
  groupID: number;
}

const ProcessServiceModelCard: React.FC<ProcessServiceModelCardProps> = (
  props
) => {
  const { model, groupID } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deleteModel = useDeleteModel();

  const handleOnButtonClickModel = () => {
    navigate(`service/manufacturing/${groupID}/model/${model.id}`);
  };
  const handleOnButtonClickDeleteModel = (modelID: string) => {
    deleteModel.mutate({
      processID: process.processID,
      projectID: project.projectID,
      modelID,
      groupID,
    });
  };

  const roundNumberWithDecimals = (number: number, decimals: number) => {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };
  const calculations: CheckModel[] | undefined =
    process.serviceType === ServiceType.ADDITIVE_MANUFACTURING &&
    process.serviceDetails.groups !== undefined &&
    process.serviceDetails.groups[groupID] !== undefined &&
    process.serviceDetails.groups[groupID].calculations !== undefined
      ? process.serviceDetails.groups[groupID].calculations
      : undefined;

  const calculation =
    calculations !== undefined
      ? calculations.find((calc) => calc.filename === model.fileName)
      : undefined;

  return (
    <ServiceDetailsCard>
      <Container direction="col" width="full" className="gap-2">
        <Text variant="strong">{model.fileName}</Text>
        <img
          src={model.imgPath ? model.imgPath : TestImg}
          className="aspect-square max-h-40 w-full rounded-md border-2 object-cover md:w-fit"
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.img"
          )}
        />
      </Container>
      <Container direction="col" width="full" className="gap-0">
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
        {model.size !== undefined && model.isFile ? (
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.size"
              )}
            </Text>
            <Text>{getFileSizeAsString(model.size)}</Text>
          </Container>
        ) : null}
        {calculation !== undefined ? (
          <>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.dimensions"
                )}
              </Text>
              <Text>{`${roundNumberWithDecimals(
                calculation.measurements.mbbDimensions._1,
                2
              )} x ${roundNumberWithDecimals(
                calculation.measurements.mbbDimensions._2,
                2
              )} x ${roundNumberWithDecimals(
                calculation.measurements.mbbDimensions._3,
                2
              )} mm`}</Text>
            </Container>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.surface"
                )}
              </Text>
              <Text>
                {`${roundNumberWithDecimals(
                  calculation.measurements.surfaceArea,
                  2
                )} mm²`}
              </Text>
            </Container>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.volume"
                )}
              </Text>
              <Text>{`${roundNumberWithDecimals(
                calculation.measurements.volume,
                2
              )} mm³`}</Text>
            </Container>
            {model.isFile ? (
              <Container direction="row" justify="between" width="full">
                <Text>
                  {t(
                    "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.fem"
                  )}
                </Text>
                <Text>
                  {model.femRequested === true &&
                  model.testType !== undefined &&
                  model.pressure !== undefined
                    ? t(
                        "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.femValue",
                        {
                          testType: t(`types.FemTestType.${model.testType}`),
                          pressure: model.pressure,
                        }
                      )
                    : "---"}
                </Text>
              </Container>
            ) : null}
          </>
        ) : null}
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
