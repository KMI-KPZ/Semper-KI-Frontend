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
      className={` w-full justify-between gap-0 self-stretch overflow-clip rounded-md border-2 bg-white md:w-[calc(50%-10px)] ${
        selected ? "border-blau-500" : ""
      }`}
      direction="col"
    >
      <Container direction="col" width="full">
        <img
          src={material.imgPath}
          alt={material.title}
          className="h-60 w-full object-cover"
        />
        <Divider />
        <Container direction="col" className="grow p-5" width="full">
          <Heading variant="h3">{material.title}</Heading>
          <Heading variant="h2">
            {material.medianPrice}
            {" €"}
          </Heading>
          <table className="w-full grow table-auto  border-separate border-spacing-3 rounded-md border-2">
            <caption>
              <Text>{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Material.components.Card.props`
              )}`}</Text>
            </caption>
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
        </Container>
      </Container>
      <Container width="full" direction="col" className="p-5">
        {children}
      </Container>
    </Container>
  );
};
