import { GeneralServiceProps } from "@/pages/OrderRoutes/Service/Service";
import { ServiceType } from "@/pages/OrderRoutes/Service/hooks/useService";
import Service from "@/pages/Service/Service";
import React from "react";
import { useTranslation } from "react-i18next";
import SubOrderServiceManufacturing from "./components/Manufacturing";
import SubOrderServiceModelling from "./components/Modelling";

interface SubOrderServiceProps {
  service: GeneralServiceProps;
}

const SubOrderService: React.FC<SubOrderServiceProps> = (props) => {
  const { service } = props;
  const { t } = useTranslation();

  switch (service.type) {
    case ServiceType.MANUFACTURING:
      return <SubOrderServiceManufacturing service={service} />;
    case ServiceType.MODELING:
      return <SubOrderServiceModelling service={service} />;
  }
};

export default SubOrderService;
