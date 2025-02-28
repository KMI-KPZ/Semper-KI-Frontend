import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import useGetOrgaNodesByType from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { NodeFormData } from "../../NodeForm";
import { UseFormRegister } from "react-hook-form";

interface NodeCustomFormMaterialCategoryProps {
  register: UseFormRegister<NodeFormData>;
}

const NodeCustomFormMaterialCategory: React.FC<
  NodeCustomFormMaterialCategoryProps
> = (props) => {
  const { register } = props;
  const { t } = useTranslation();
  const customDataNodes = useGetOrgaNodesByType("materialCategory");

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
};

export default NodeCustomFormMaterialCategory;
