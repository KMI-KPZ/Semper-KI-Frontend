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
import { ServiceModellingProps } from "./Modelling/Modelling";
import ServiceSelect from "./Select/Select";
import { useOrder } from "../Order/hooks/useOrder";
import logger from "@/hooks/useLogger";

export interface ServiceProps {}

export type GeneralServiceProps =
  | ServiceManufacturingProps
  | ServiceModellingProps
  | ServiceUndefinedProps;

export interface ServiceUndefinedProps {
  type: ServiceType.UNDEFINED;
}

export interface UpdateServiceProps {
  type?: ServiceType;
}

export type GerneralUpdateServiceProps = UpdateServiceManufacturingProps;

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { getService } = useService();
  const service: GeneralServiceProps | undefined = getService();

  const renderService = (service?: GeneralServiceProps) => {
    if (
      service === undefined ||
      (service !== undefined && service.type === undefined)
    ) {
      return <ServiceSelect />;
    }
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        return <ServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <div>Modeling</div>;
      case ServiceType.UNDEFINED:
        return <ServiceSelect />;
    }
  };

  logger("Service", service);

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      {renderService(service)}
      <ServiceOverview />
    </div>
  );
};

export default Service;
