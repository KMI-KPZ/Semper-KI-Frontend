import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <Container direction="col"></Container>;
};

export default ServiceCard;
