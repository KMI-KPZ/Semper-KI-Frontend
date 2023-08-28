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
  const { orderQuery } = useOrder();
  const service: GeneralServiceProps | undefined = getService();

  const renderService = (service: GeneralServiceProps) => {
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        return <ServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <div>Modeling</div>;
    }
  };

  const checkForOtherSuborders = (): boolean => {
    return orderQuery.data !== undefined &&
      orderQuery.data.subOrders.length === 0
      ? false
      : true;
  };
  if (service === undefined) {
    return checkForOtherSuborders() ? (
      <Navigate to={`../${orderQuery.data?.subOrders[0].subOrderID}`} />
    ) : (
      <Navigate to=".." />
    );
  }
  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      {service !== undefined &&
      (service.type === undefined || service.type === ServiceType.UNDEFINED) ? (
        <ServiceSelect />
      ) : (
        renderService(service)
      )}
      <ServiceOverview />
    </div>
  );
};

export default Service;
