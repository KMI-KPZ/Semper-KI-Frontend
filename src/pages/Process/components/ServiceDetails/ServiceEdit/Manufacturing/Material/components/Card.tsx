import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Text } from "@component-library/index";
import { Heading } from "@component-library/index";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  OntoNode,
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useGetRalColors from "@/api/Resources/Organization/Querys/useGetRalColors";
import CheckIcon from "@mui/icons-material/Check";
import { MaterialColorState } from "../Material";

interface Props {
  material: MaterialProps;
  openMaterialView(material: MaterialProps): void;
  selected: boolean;
  seletedColors: MaterialColorState[];
  setSelectedColors: Dispatch<SetStateAction<MaterialColorState[]>>;
}

export const ProcessMaterialCard: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { material, children, selected, seletedColors, setSelectedColors } =
    props;
  const { t } = useTranslation();
  const ralColors = useGetRalColors(true);

  const handleOnClickButtonColor = (colorNode: OntoNode) => {
    setSelectedColors((prev) => [
      ...prev.filter((item) => item.materialID !== material.id),
      { color: colorNode, materialID: material.id },
    ]);
  };

  const colorIsSelected = (colorNode: OntoNode) => {
    const colorItem = seletedColors.find(
      (item) => item.materialID === material.id
    );
    return colorItem?.color?.nodeID === colorNode.nodeID;
  };

  const seletedColor = material.colors.find((color) => colorIsSelected(color));

  const getBackgroundColor = (colorNode: OntoNode): string => {
    const colorHEX = colorNode.properties.find(
      (property) => property.key === "colorHEX"
    )?.value as string;

    if (colorHEX) {
      return colorHEX.split(",").length > 1
        ? `linear-gradient(to bottom, ${colorHEX})`
        : colorHEX;
    }

    const colorRAL = colorNode.properties.find(
      (property) => property.key === "colorRAL"
    )?.value;

    if (colorRAL) {
      return (
        (ralColors.data?.find((color) => color.RAL === colorRAL)
          ?.Hex as string) || "#FFFFFF"
      );
    }

    return "#FFFFFF";
  };

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
          className="h-60 w-full object-contain"
        />
        <Divider />
        <Container direction="col" className="grow p-5" width="full">
          <Heading variant="h3">{material.title}</Heading>
          <Heading variant="h4" className="text-3xl">
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
                    <td>
                      {prop.value.toString()} {prop.unit}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Container direction="col" width="full">
            <Heading variant="h4">
              {t(
                `Process.components.Service.ServiceEdit.Manufacturing.Material.components.Card.colors`
              )}
            </Heading>
            <Container
              width="fit"
              direction="row"
              wrap="wrap"
              className="rounded-md border p-2"
            >
              {material.colors.filter((node) => node.nodeType === "color")
                .length > 0 ? (
                material.colors
                  .filter((node) => node.nodeType === "color")
                  .map((colorNode, index) => (
                    <div
                      key={index}
                      tabIndex={0}
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-md border-2 duration-300
                         hover:cursor-pointer hover:border-2 hover:border-black
                          ${
                            colorIsSelected(colorNode)
                              ? "border-2 border-black"
                              : ""
                          }`}
                      onClick={() => handleOnClickButtonColor(colorNode)}
                      style={{
                        background: getBackgroundColor(colorNode),
                      }}
                    >
                      {colorIsSelected(colorNode) ? (
                        <Container className="rounded-full border-2 border-black bg-white">
                          <CheckIcon />
                        </Container>
                      ) : null}
                    </div>
                  ))
              ) : (
                <Text>
                  {t(
                    `Process.components.Service.ServiceEdit.Manufacturing.Material.components.Card.noColors`
                  )}
                </Text>
              )}
              <Container direction="col" width="full">
                {seletedColor !== undefined ? (
                  <table className="w-fit grow table-auto  border-separate border-spacing-3">
                    <caption>
                      <Text>{seletedColor.name}</Text>
                    </caption>
                    <tbody>
                      {seletedColor.properties
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
                ) : (
                  <Text>
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Material.components.Card.noColorProps`
                    )}
                  </Text>
                )}
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container width="full" direction="col" className="p-5">
        {children}
      </Container>
    </Container>
  );
};
