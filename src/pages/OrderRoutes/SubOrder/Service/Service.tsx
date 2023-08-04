import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import useService, { ServiceType } from "./hooks/useService";
import { ServiceManufacturing } from "./Manufacturing/Manufacturing";
import { ServiceManufacturingProps } from "./Manufacturing/types";

export interface ServiceProps {
  type: ServiceType;
}

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { getService } = useService();
  const service = getService();

  switch (service?.type) {
    case ServiceType.MANUFACTURING:
      return (
        <ServiceManufacturing service={service as ServiceManufacturingProps} />
      );
    case ServiceType.MODELING:
      return <div>Modeling</div>;
    case ServiceType.ASSEMBLY:
      return <div>Assembly</div>;
    default:
      return <Navigate to=".." />;
  }
};

export default Service;
