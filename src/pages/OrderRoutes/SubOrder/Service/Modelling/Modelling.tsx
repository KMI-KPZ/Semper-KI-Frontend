import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceProps } from "../Service";

export interface ServiceModellingProps extends ServiceProps {}

const ServiceModelling: React.FC<ServiceModellingProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">ServiceModelling</div>;
};

export default ServiceModelling;
