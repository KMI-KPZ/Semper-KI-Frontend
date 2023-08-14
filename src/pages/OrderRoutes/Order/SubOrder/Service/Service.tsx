import { GeneralServiceProps } from "@/pages/OrderRoutes/Service/Service";
import { ServiceType } from "@/pages/OrderRoutes/Service/hooks/useService";
import Service from "@/pages/Service/Service";
import React from "react";
import { useTranslation } from "react-i18next";
import SubOrderServiceManufacturing from "./components/Manufacturing";
import SubOrderServiceModelling from "./components/Modelling";
import SubOrderServiceSelect from "./components/Select";
import { Heading } from "@component-library/Typography";

interface SubOrderServiceProps {
  service: GeneralServiceProps;
}

const SubOrderService: React.FC<SubOrderServiceProps> = (props) => {
  const { service } = props;
  const { t } = useTranslation();

  const renderService = () => {
    if (
      service.type === undefined ||
      (service.type !== undefined && service.type === undefined)
    )
      return <SubOrderServiceSelect />;
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        return <SubOrderServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <SubOrderServiceModelling service={service} />;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="flex w-full">
        <Heading variant="h3">{t("Orders.OrderView.Service.title")}</Heading>
      </div>
      {renderService()}
    </div>
  );
};

export default SubOrderService;
