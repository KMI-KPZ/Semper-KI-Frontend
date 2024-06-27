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
        <Container direction="row" width="full" align="start">
          <Container direction="col" justify="start" align="start">
            <Text>
              {`${t(
                `Service.Manufacturing.PostProcessing.components.Card.type`
              )}`}
            </Text>
            <Text>
              {`${t(
                `Service.Manufacturing.PostProcessing.components.Card.value`
              )}`}
            </Text>
            <Text>
              {`${t(
                `Service.Manufacturing.PostProcessing.components.Card.value`
              )}`}
            </Text>
          </Container>
          <Container direction="col" justify="start" align="start">
            <Text>{item.type}</Text>
            <Text>{item.value}</Text>
            <Text>{item.valueList}</Text>
          </Container>
        </Container>

        {children}
      </Container>
    </Container>
  );
};

export default ProcessPostProcessingCard;
