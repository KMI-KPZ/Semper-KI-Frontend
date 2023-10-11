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
import logger from "@/hooks/useLogger";

interface ServiceProps {}

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      <ServiceSelect />
      {/* <ServiceOverview /> */}
    </div>
  );
};

export default Service;
