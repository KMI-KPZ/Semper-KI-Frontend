import {
  ManufactoringProcessProps,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";
import { PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import ProcessServiceModelCard from "./components/ModellCard";
import ProcessServiceMaterialCard from "./components/MaterialCard";
import ProcessSericePostProcessingCard from "./components/PostProcessingCard";
import ProcessStatusGate from "../../../StatusGate";

interface ServiceManufacturingDetailsProps {
  process: ManufactoringProcessProps;
}

const ServiceManufacturingDetails: React.FC<
  ServiceManufacturingDetailsProps
> = (props) => {
  const { process } = props;
  const { project } = useProject();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const models: ModelProps[] =
    process.serviceDetails.models !== undefined
      ? process.serviceDetails.models
      : [];
  const postProcessings: PostProcessingProps[] =
    process.serviceDetails.postProcessings !== undefined
      ? process.serviceDetails.postProcessings
      : [];
  const materials: MaterialProps[] = process.serviceDetails.materials
    ? process.serviceDetails.materials
    : [];

  const handleOnButtonClickMaterial = () => {
    navigate("service/manufacturing/material");
  };
  const handleOnButtonClickPostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };
  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
  };

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className="p-5"
    >
      <Container direction="row" justify="between" width="full">
        <Container align="end">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.heading"
            )}
          </Heading>
          <Text>
            {models.length > 0
              ? models.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.model.noModels"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {models.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickModel}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {models.length > 0
          ? models.map((model, index) => (
              <ProcessServiceModelCard model={model} key={index} />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {models.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickModel}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>

      <Container direction="row" justify="between" width="full">
        <Container align="end">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.material.heading"
            )}
          </Heading>
          <Text>
            {materials.length > 0
              ? materials.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.noMaterial"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {materials.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickMaterial}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {materials.length > 0
          ? materials.map((material, index) => (
              <ProcessServiceMaterialCard material={material} key={index} />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {materials.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickMaterial}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>

      <Container direction="row" justify="between" width="full">
        <Container align="end">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.heading"
            )}
          </Heading>
          <Text>
            {postProcessings.length > 0
              ? postProcessings.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.postProcessing.noPostProcessings"
                )}
          </Text>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {postProcessings.length === 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickPostProcessing}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
      <Container width="full" direction="col">
        {postProcessings.length > 0
          ? postProcessings.map((postProcessing, index) => (
              <ProcessSericePostProcessingCard
                postProcessing={postProcessing}
                key={index}
              />
            ))
          : null}
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          {postProcessings.length > 0 ? (
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
              )}
              size="sm"
              variant="primary"
              onClick={handleOnButtonClickPostProcessing}
              startIcon={<AddIcon />}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.add"
              )}
            />
          ) : null}
        </ProcessStatusGate>
      </Container>
    </Container>
  );
};

export default ServiceManufacturingDetails;
