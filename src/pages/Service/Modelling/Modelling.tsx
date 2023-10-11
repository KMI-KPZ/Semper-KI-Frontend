import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "../hooks/useService";

export type ServiceModellingProps = {
  type: ServiceType.MODELING;
};

const ServiceModelling: React.FC<ServiceModellingProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">ServiceModelling</div>;
};

export default ServiceModelling;
