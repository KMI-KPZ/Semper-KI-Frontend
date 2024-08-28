import { Container } from "@component-library/index";
import React, { PropsWithChildren } from "react";

interface ServiceDetailsCardProps {}

const ServiceDetailsCard: React.FC<
  PropsWithChildren<ServiceDetailsCardProps>
> = (props) => {
  const { children } = props;

  return (
    <Container width="full" className="card" justify="center">
      {children}
    </Container>
  );
};

export default ServiceDetailsCard;
