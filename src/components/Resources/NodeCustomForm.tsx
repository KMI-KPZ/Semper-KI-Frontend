import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import useGetOrgaNodesByType, {
  OntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { UseFormRegister } from "react-hook-form";
import { NodeFormData } from "./NodeForm";

interface NodeCustomFormProps {
  nodeType: OntoNodeType;
  register: UseFormRegister<NodeFormData>;
}

const NodeCustomForm: React.FC<NodeCustomFormProps> = (props) => {
  const { nodeType, register } = props;
  const { t } = useTranslation();

  const getCustomDataNodeType = (): OntoNodeType | undefined => {
    switch (nodeType) {
      case "printer":
        return "technology";
      case "material":
        return "materialCategory";
    }
    return undefined;
  };

  const customDataNodes = useGetOrgaNodesByType(getCustomDataNodeType());

  switch (nodeType) {
    case "printer":
      return (
        <Container width="full" direction="row">
          <Text>{t("components.Resources.NodeForm.technology")}</Text>
          <select
            className=" rounded-md border border-gray-300 p-2"
            {...register(`technology`, {
              required: true,
              validate: (value) => value !== "none",
            })}
          >
            {customDataNodes.data !== undefined &&
            customDataNodes.data.length > 0 ? (
              <>
                <option value="none" disabled>
                  {t("components.Resources.NodeForm.noTechnology")}
                </option>
                {customDataNodes.data?.map((technology) => (
                  <option key={technology.nodeID} value={technology.nodeID}>
                    {technology.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">
                {t("components.Resources.NodeForm.noTechnologies")}
              </option>
            )}
          </select>
        </Container>
      );
    case "material":
      return (
        <Container width="full" direction="row">
          <Text>{t("components.Resources.NodeForm.materialCategory")}</Text>
          <select
            className=" rounded-md border border-gray-300 p-2"
            {...register(`materialCategory`, {
              required: true,
              validate: (value) => value !== "none",
            })}
          >
            {customDataNodes.data !== undefined &&
            customDataNodes.data.length > 0 ? (
              <>
                <option value="none" disabled>
                  {t("components.Resources.NodeForm.noMaterialCategory")}
                </option>
                {customDataNodes.data?.map((materialCategory) => (
                  <option
                    key={materialCategory.nodeID}
                    value={materialCategory.nodeID}
                  >
                    {materialCategory.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">
                {t("components.Resources.NodeForm.noMaterialCategories")}
              </option>
            )}
          </select>
        </Container>
      );
    case "color":
      return (
        <Container width="full" direction="row">
          <Text>{t("components.Resources.NodeForm.color")}</Text>

          <select
            className=" rounded-md border border-gray-300 p-2"
            {...register(`color`, {
              required: true,
              validate: (value) => value !== "none",
            })}
          >
            {customDataNodes.data !== undefined &&
            customDataNodes.data.length > 0 ? (
              <>
                <option value="none" disabled>
                  {t("components.Resources.NodeForm.noColor")}
                </option>
                {customDataNodes.data?.map((materialCategory) => (
                  <option
                    key={materialCategory.nodeID}
                    value={materialCategory.nodeID}
                  >
                    {materialCategory.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">
                {t("components.Resources.NodeForm.noColors")}
              </option>
            )}
          </select>
        </Container>
      );
  }
  return null;
};

export default NodeCustomForm;
