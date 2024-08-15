import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import TestImg from "@images/Test2.png";
import { Button, Container, Modal, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useDeleteMaterial from "@/api/Service/AdditiveManufacturing/Material/Mutations/useDeleteMaterial";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface ProcessServiceMaterialCardProps {
  material: MaterialProps;
}

const ProcessServiceMaterialCard: React.FC<ProcessServiceMaterialCardProps> = (
  props
) => {
  const { material } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deleteMaterial = useDeleteMaterial();
  const handleOnButtonClickMaterial = () => {
    navigate("service/manufacturing/material");
  };

  const [edit, setEdit] = useState<MaterialProps | undefined>(undefined);
  const handleOnButtonClickDeleteMaterial = (materialID: string) => {
    deleteMaterial.mutate({
      processID: process.processID,
      projectID: project.projectID,
      materialID,
    });
  };

  return (
    <ServiceDetailsCard>
      <img
        src={TestImg}
        alt={t(
          "Process.Service.ServiceDetails.components.manufacturing.material.img"
        )}
        className="max-h-40 w-full object-contain md:w-fit"
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
            onClick={() => handleOnButtonClickDeleteMaterial(material.id)}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.delete"
            )}
          />
        </ProcessStatusGate>
      </Container>
      <Modal
        open={edit !== undefined}
        closeModal={() => setEdit(undefined)}
        modalKey="editProcessServiceMaterial"
      ></Modal>
    </ServiceDetailsCard>
  );
};

export default ProcessServiceMaterialCard;
