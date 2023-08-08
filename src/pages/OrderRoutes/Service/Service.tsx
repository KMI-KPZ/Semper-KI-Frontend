import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import useService, { ServiceType } from "./hooks/useService";
import { ServiceManufacturing } from "./Manufacturing/Manufacturing";
import { ServiceManufacturingProps } from "./Manufacturing/types";
import ServiceOverview from "./Overview/Overview";
import { useOrder } from "../hooks/useOrder";
import { ServiceModellingProps } from "./Modelling/Modelling";

export interface ServiceProps {
  type: ServiceType;
  title: string;
}

export type GeneralServiceProps =
  | ServiceManufacturingProps
  | ServiceModellingProps;

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { orderQuery } = useOrder();
  const { getService } = useService();
  const service = getService();

  const renderService = () => {
    switch (service?.type) {
      case ServiceType.MANUFACTURING:
        return <ServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <div>Modeling</div>;
    }
  };

  return (
    <div className="flex w-full flex-col-reverse md:flex-row">
      {renderService()}
      <ServiceOverview subOrders={orderQuery.data?.subOrders} />
    </div>
  );
};

export default Service;
