import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
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
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import useGetCheckModel from "@/api/Process/Querys/useGetCheckModel";

interface ProcessServiceModelCardProps {
  model: ModelProps;
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

  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
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
        <img
          src={TestImg}
          className="max-h-40 w-full object-contain md:w-fit"
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.img"
          )}
        />
        <Container direction="col" width="full" className="" gap={3}>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Process.components.Service.ServiceDetails.components.Manufacturing.ModelCard.name"
              )}
            </Text>
            <Text>{model.fileName}</Text>
          </Container>
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
