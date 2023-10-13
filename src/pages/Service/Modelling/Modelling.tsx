import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "../hooks/useService";
import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";

export type ServiceModelingProps = {
  type: ServiceType.MODELING;
};

const ServiceModeling: React.FC<ServiceModelingProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container>
      <Heading variant="h1">{t("Service.Modeling.Modeling.title")}</Heading>
    </Container>
  );
};

export default ServiceModeling;
