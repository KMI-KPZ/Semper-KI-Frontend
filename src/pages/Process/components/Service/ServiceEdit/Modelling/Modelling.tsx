import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";

export type ModelingServiceProps = {};

const ServiceModeling: React.FC<ModelingServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container>
      <Heading variant="h1">
        {t("Process.components.Service.ServiceEdit.Modeling.heading")}
      </Heading>
    </Container>
  );
};

export default ServiceModeling;
