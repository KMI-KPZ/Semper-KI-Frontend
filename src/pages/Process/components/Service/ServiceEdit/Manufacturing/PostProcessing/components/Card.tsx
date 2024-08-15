import {
  Container,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useProcess from "@/hooks/Process/useProcess";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";
import useSetPostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useSetPostProcessing";
import { Divider } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import { useProject } from "@/hooks/Project/useProject";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface Props<Item> {
  item: Item;
  openItemView(item: Item): void;
  children?: React.ReactNode;
  selected: boolean;
}

const ProcessPostProcessingCard = <Item extends PostProcessingProps>(
  props: Props<Item>
) => {
  const { item, openItemView, children, selected } = props;

  const { t } = useTranslation();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openItemView(item);
  };

  return (
    <Container
      className={`w-fit min-w-[350px] max-w-[32%] gap-0 overflow-clip rounded-xl border-2 bg-white ${
        selected ? "border-blau-500" : ""
      }`}
      direction="col"
    >
      <img
        src={item.imgPath}
        alt="post-processing"
        className="h-60 w-full object-cover"
      />
      <Divider />
      <Container direction="col" className="p-5">
        <Heading variant="h3">{item.title}</Heading>

        <table className="auto table border-separate border-spacing-2">
          <tr>
            <td>
              {t(`Service.Manufacturing.PostProcessing.components.Card.type`)}
            </td>
            <td>{item.type}</td>
          </tr>
          <tr>
            <td>
              {t(`Service.Manufacturing.PostProcessing.components.Card.value`)}
            </td>
            <td>{item.value}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              {t(`Service.Manufacturing.PostProcessing.components.Card.props`)}
            </td>
          </tr>

          {item.valueList.map((prop, index: number) => (
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
        </table>

        {children}
      </Container>
    </Container>
  );
};

export default ProcessPostProcessingCard;
