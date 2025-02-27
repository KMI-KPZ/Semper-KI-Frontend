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
import ProcessStatusGate from "@/components/Process/StatusGate";
import {
  OntoNode,
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import ColorView from "@/components/Resources/NodeCustomForm/components/ColorView";

interface ProcessServiceMaterialCardProps {
  material: MaterialProps;
  color?: OntoNode;
  groupID: number;
}

const ProcessServiceMaterialCard: React.FC<ProcessServiceMaterialCardProps> = (
  props
) => {
  const { material, groupID, color } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deleteMaterial = useDeleteMaterial();
  const handleOnButtonClickMaterial = () => {
    navigate(`service/manufacturing/${groupID}/material`);
  };

  const [edit, setEdit] = useState<MaterialProps | undefined>(undefined);
  const handleOnButtonClickDeleteMaterial = () => {
    deleteMaterial.mutate({
      processID: process.processID,
      projectID: project.projectID,
      groupID,
    });
  };

  return (
    <ServiceDetailsCard>
      <Container direction="col" width="full" className="gap-2">
        <Text variant="strong">{material.title}</Text>
        <img
          src={material.imgPath ? material.imgPath : TestImg}
          alt={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.MaterialCard.img"
          )}
          className="aspect-square max-h-40 w-full rounded-md border-2 object-cover md:w-fit"
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
          {material.propList.length === 0 ? <Text>---</Text> : null}
        </Container>
        {material.propList.length > 0 ? (
          <Container width="full" direction="col" className="gap-0 px-3">
            {material.propList
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
              ))}
          </Container>
        ) : null}
        {color !== undefined ? (
          <Container
            width="full"
            direction="col"
            className="gap-0 rounded-md border-2 p-1"
          >
            <table className="w-full grow table-auto  border-separate border-spacing-x-3 border-spacing-y-0">
              <tbody>
                <tr>
                  <th className="text-left">
                    {t(
                      "Process.components.Service.ServiceDetails.components.Manufacturing.MaterialCard.color"
                    )}
                  </th>
                  <th>
                    <Container direction="row" width="fit">
                      <Text>{color.name}</Text>
                      <ColorView colorNode={color} size="medium" />
                    </Container>
                  </th>
                </tr>
                {color.properties
                  .filter((item) => item.name !== "imgPath")
                  .map((prop, index: number) => (
                    <tr key={index} className="model-view-tag">
                      <td>
                        {isOntoNodePropertyName(prop.name)
                          ? t(
                              `types.OntoNodePropertyName.${
                                prop.name as OntoNodePropertyName
                              }`
                            )
                          : prop.name}
                        {": "}
                      </td>
                      <td>
                        {prop.value.toString()} {prop.unit}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Container>
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
            onClick={() => handleOnButtonClickDeleteMaterial()}
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
