import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceProps } from "../Service";
import { ServiceType } from "../hooks/useService";

export type ServiceModellingProps = {
  type: ServiceType.MODELING;
} & ServiceProps;

const ServiceModelling: React.FC<ServiceModellingProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">ServiceModelling</div>;
};

export default ServiceModelling;
