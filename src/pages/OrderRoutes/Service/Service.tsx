import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import useService, { ServiceType } from "./hooks/useService";
import { ServiceManufacturing } from "./Manufacturing/Manufacturing";
import {
  ServiceManufacturingProps,
  UpdateServiceManufacturingProps,
} from "./Manufacturing/types";
import ServiceOverview from "./Overview/Overview";
import { useOrder } from "../hooks/useOrder";
import { ServiceModellingProps } from "./Modelling/Modelling";
import ServiceSelect from "./Select/Select";

export interface ServiceProps {}

export type GeneralServiceProps =
  | ServiceManufacturingProps
  | ServiceModellingProps;

export interface UpdateServiceProps {
  type?: ServiceType;
}

export type GerneralUpdateServiceProps = UpdateServiceManufacturingProps;

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { getService } = useService();
  const service: GeneralServiceProps | undefined = {
    type: Math.floor(Math.random() * 2),
  }; //  getService();

  const renderService = (service: GeneralServiceProps) => {
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        return <ServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <div>Modeling</div>;
    }
  };

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      {service === undefined ||
      (service !== undefined && service.type === undefined) ? (
        <ServiceSelect />
      ) : (
        renderService(service)
      )}
      <ServiceOverview />
    </div>
  );
};

export default Service;
