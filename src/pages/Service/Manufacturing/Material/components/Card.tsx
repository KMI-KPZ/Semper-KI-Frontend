import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Text } from "@component-library/index";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useService from "@/hooks/useService";

interface Props {
  material: MaterialProps;
  openMaterialView(material: MaterialProps): void;
}

export const ProcessMaterialCard: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { material, openMaterialView, children } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updatedService } = useService();

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("../postprocessing");
    updatedService({ material });
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openMaterialView(material);
  };
  return (
    <Container
      className="w-fit min-w-[350px] max-w-[32%] gap-0 overflow-clip rounded-xl border-2 bg-white"
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
        <Container direction="row" width="full" align="start">
          <Container direction="col" justify="start" align="start">
            <Text>{`${t(
              `Service.Manufacturing.Material.components.Card.props`
            )}`}</Text>
          </Container>
          <Container direction="col" justify="start" align="start">
            <Text>{material.propList}</Text>
          </Container>
        </Container>

        {children}
      </Container>
    </Container>
  );
};
