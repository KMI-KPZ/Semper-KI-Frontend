import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import useGetOrgaNodesByType from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { NodeFormData } from "../../NodeForm";
import { UseFormRegister } from "react-hook-form";

interface NodeCustomFormMaterialTypeProps {
  register: UseFormRegister<NodeFormData>;
}

const NodeCustomFormMaterialType: React.FC<NodeCustomFormMaterialTypeProps> = (
  props
) => {
  const { register } = props;
  const { t } = useTranslation();
  const customDataNodes = useGetOrgaNodesByType("materialType");

  return (
    <Container width="full" direction="row">
      <Text>{t("components.Resources.NodeForm.materialType")}</Text>
      <select
        className=" rounded-md border border-gray-300 p-2"
        {...register(`materialType`, {
          required: true,
          validate: (value) => value !== "none",
        })}
      >
        {customDataNodes.data !== undefined &&
        customDataNodes.data.length > 0 ? (
          <>
            <option value="none" disabled>
              {t("components.Resources.NodeForm.noMaterialType")}
            </option>
            {customDataNodes.data?.map((materialType) => (
              <option key={materialType.nodeID} value={materialType.nodeID}>
                {materialType.name}
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
};

export default NodeCustomFormMaterialType;
