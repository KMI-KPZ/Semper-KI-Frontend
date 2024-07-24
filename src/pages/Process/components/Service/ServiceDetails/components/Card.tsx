 import { Container } from "@component-library/index";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface ServiceDetailsCardProps {}

const ServiceDetailsCard: React.FC<
  PropsWithChildren<ServiceDetailsCardProps>
> = (props) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <Container direction="row" width="full" className=" card">
      {children}
    </Container>
  );
};

export default ServiceDetailsCard;
