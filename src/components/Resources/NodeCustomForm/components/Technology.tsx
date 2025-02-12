import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import useGetOrgaNodesByType from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { NodeFormData } from "../../NodeForm";
import { UseFormRegister } from "react-hook-form";

interface NodeCustomFormTechnologyProps {
  register: UseFormRegister<NodeFormData>;
}

const NodeCustomFormTechnology: React.FC<NodeCustomFormTechnologyProps> = (
  props
) => {
  const { register } = props;
  const { t } = useTranslation();

  const customDataNodes = useGetOrgaNodesByType("technology");

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
};

export default NodeCustomFormTechnology;
