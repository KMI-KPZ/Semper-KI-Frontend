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
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

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
      <Container direction="col" width="full" className="gap-2">
        <Text variant="strong">{material.title}</Text>
        <img
          src={TestImg}
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.MaterialCard.img"
          )}
          className="max-h-40 w-full object-contain md:w-fit"
        />
      </Container>
      <Container direction="col" width="full" className="gap-1">
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.MaterialCard.cost"
            )}
          </Text>
          <Text variant="strong">
            {material.medianPrice}
            {" €/KG"}
          </Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.MaterialCard.properties"
            )}
          </Text>
        </Container>
        <Container width="full" direction="col" className="gap-0 px-3">
          {material.propList.length > 0 ? (
            material.propList
              .filter((item) => item.name !== "imgPath")
              .map((prop, index) => (
                <Container key={index} justify="between" width="full">
                  <Text className="whitespace-nowrap">
                    &bull;{" "}
                    {isOntoNodePropertyName(prop.name)
                      ? t(
                          `types.OntoNodePropertyName.${
                            prop.name as OntoNodePropertyName
                          }`
                        )
                      : prop.name}
                  </Text>
                  <Text className="whitespace-nowrap">
                    {prop.value.toString()} {prop.unit}
                  </Text>
                </Container>
              ))
          ) : (
            <Text>---</Text>
          )}
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
              "Process.components.Service.ServiceDetails.components.Manufacturing.button.editMaterial"
            )}
            size="sm"
            variant="secondary"
            onClick={handleOnButtonClickMaterial}
            children={t("general.button.edit")}
          />
          <Button
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.button.deleteMaterial"
            )}
            size="sm"
            variant="text"
            onClick={() => handleOnButtonClickDeleteMaterial(material.id)}
            children={t("general.button.delete")}
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
