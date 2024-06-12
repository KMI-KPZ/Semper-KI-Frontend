import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "./Card";
import TestImg from "@images/Test2.png";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { MaterialProps } from "@/pages/Service/Manufacturing/Material/Material";
import useSetModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useSetModel";
import useDeleteModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useDeleteModel";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";

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
  const updateProcess = useUpdateProcess();
  const deleteModel = useDeleteModel();
  const deleteMaterial = useDeleteMaterial();
  const deletePostProcessing = useDeletePostProcessing();
  const setModel = useSetModel();

  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
  };
  const handleOnButtonClickMaterial = () => {
    navigate("service/manufacturing/material");
  };
  const handleOnButtonClickPostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };

  const handleOnButtonClickDeleteModel = (modelID: string) => {
    deleteModel.mutate({
      processID: process.processID,
      projectID: project.projectID,
      modelID,
    });
  };
  const handleOnButtonClickDeleteMaterial = (materialID: string) => {
    deleteMaterial.mutate({
      processID: process.processID,
      projectID: project.projectID,
      materialID,
    });
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
      </Container>
      <Container width="full" direction="col">
        {models.length > 0
          ? models.map((model, index) => (
              <ServiceDetailsCard key={index}>
                <img
                  src={TestImg}
                  className=""
                  alt={t(
                    "Process.Service.ServiceDetails.components.manufacturing.model.img"
                  )}
                />
                <Container direction="col" width="full" className="" gap={3}>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.model.name"
                      )}
                    </Text>
                    <Text>{model.fileName}</Text>
                  </Container>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.model.dimensions"
                      )}
                    </Text>
                    <Text>--x--x-- mm</Text>
                  </Container>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.model.surface"
                      )}
                    </Text>
                    <Text>-- mm²</Text>
                  </Container>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.model.volume"
                      )}
                    </Text>
                    <Text>-- mm³</Text>
                  </Container>
                </Container>
                <Container
                  direction="col"
                  justify="center"
                  width="fit"
                  gap={3}
                  className="p-5"
                >
                  <Button
                    title={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.editModel"
                    )}
                    size="sm"
                    variant="secondary"
                    onClick={handleOnButtonClickModel}
                    children={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.edit"
                    )}
                  />
                  <Button
                    title={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.deleteModel"
                    )}
                    size="sm"
                    variant="text"
                    onClick={() => handleOnButtonClickDeleteModel(model.id)}
                    children={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.delete"
                    )}
                  />
                </Container>
              </ServiceDetailsCard>
            ))
          : null}
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
      </Container>
      <Container width="full" direction="col">
        {materials.length > 0
          ? materials.map((material, index) => (
              <ServiceDetailsCard>
                <img
                  src={TestImg}
                  alt={t(
                    "Process.Service.ServiceDetails.components.manufacturing.material.img"
                  )}
                  className="w-full object-cover"
                />
                <Container direction="col" width="full" className="" gap={3}>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.material.name"
                      )}
                    </Text>
                    <Text>{material.title}</Text>
                  </Container>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.material.type"
                      )}
                    </Text>
                    <Text>---</Text>
                  </Container>
                  <Container direction="row" justify="between" width="full">
                    <Text>
                      {t(
                        "Process.Service.ServiceDetails.components.manufacturing.material.properties"
                      )}
                    </Text>
                  </Container>
                  <ul className="flex w-full list-inside list-disc flex-col items-start justify-start pl-3">
                    {material.propList.length > 0 ? (
                      material.propList.map((prop, index) => (
                        <li key={index}>{prop}</li>
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
                  className="p-5"
                >
                  <Button
                    title={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.editMaterial"
                    )}
                    size="sm"
                    variant="secondary"
                    onClick={handleOnButtonClickMaterial}
                    children={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.edit"
                    )}
                  />
                  <Button
                    title={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.deleteMaterial"
                    )}
                    size="sm"
                    variant="text"
                    onClick={() =>
                      handleOnButtonClickDeleteMaterial(material.id)
                    }
                    children={t(
                      "Process.Service.ServiceDetails.components.manufacturing.button.delete"
                    )}
                  />
                </Container>
              </ServiceDetailsCard>
            ))
          : null}
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
      </Container>
      <Container width="full" direction="col">
        {postProcessings.length > 0
          ? postProcessings.map((postProcessing, index) => (
              <ServiceDetailsCard key={index}>
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
                </Container>
              </ServiceDetailsCard>
            ))
          : null}
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
      </Container>
    </Container>
  );
};

export default ServiceManufacturingDetails;
