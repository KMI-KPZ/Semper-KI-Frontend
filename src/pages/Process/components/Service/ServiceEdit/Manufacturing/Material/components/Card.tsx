import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Text } from "@component-library/index";
import { Heading } from "@component-library/index";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

interface Props {
  material: MaterialProps;
  openMaterialView(material: MaterialProps): void;
  selected: boolean;
}

export const ProcessMaterialCard: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { material, children, selected } = props;
  const { t } = useTranslation();

  return (
    <Container
      className={`w-fit  gap-0 overflow-clip rounded-xl border-2 bg-white ${
        selected ? "border-blau-500" : ""
      }`}
      direction="col"
    >
      <img
        src={material.imgPath}
        alt={material.title}
        className="h-60 w-full object-cover"
      />
      <Divider />
      <Container direction="col" className="p-5">
        <Heading variant="h3">{material.title}</Heading>
        <Container direction="col" justify="start" align="start">
          <Text>{`${t(
            `Service.Manufacturing.Material.components.Card.props`
          )}`}</Text>
        </Container>
        <table className="auto table border-separate border-spacing-2">
          <tbody>
            {material.propList
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
                  <td>{prop.value.toString()}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {children}
      </Container>
    </Container>
  );
};
