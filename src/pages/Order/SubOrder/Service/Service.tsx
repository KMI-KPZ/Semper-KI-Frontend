import { GeneralServiceProps } from "@/pages/Service/Service";
import { ServiceType } from "@/pages/Service/hooks/useService";
import React from "react";
import { useTranslation } from "react-i18next";
import SubOrderServiceManufacturing from "./components/Manufacturing";
import SubOrderServiceModelling from "./components/Modelling";
import { Heading } from "@component-library/Typography";
import { Divider } from "@component-library/Divider";
import { useNavigate } from "react-router-dom";
import useSubOrder from "@/pages/Order/SubOrder/hooks/useSubOrder";
import ServiceSelect from "@/pages/Service/Select/Select";

interface SubOrderServiceProps {
  service: GeneralServiceProps;
  subOrderID: string;
}

const SubOrderService: React.FC<SubOrderServiceProps> = (props) => {
  const { service, subOrderID } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateSubOrderWithSubOrderID } = useSubOrder();

  const renderService = () => {
    if (
      service.type === undefined ||
      (service.type !== undefined && service.type === undefined)
    )
      return <ServiceSelect subOrderID={subOrderID} />;
    switch (service.type) {
      case ServiceType.UNDEFINED:
        return <ServiceSelect subOrderID={subOrderID} />;
      case ServiceType.MANUFACTURING:
        return <SubOrderServiceManufacturing service={service} />;
      case ServiceType.MODELING:
        return <SubOrderServiceModelling service={service} />;
    }
  };

  const handleOnClickButtonDelete = () => {
    updateSubOrderWithSubOrderID.mutate({
      subOrderID,
      updates: {
        changes: { service: { type: ServiceType.UNDEFINED } },
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-start pt-5 md:p-0">
      <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center">
        <Heading variant="h3" className="whitespace-nowrap">
          {t("Orders.OrderView.Service.title")}{" "}
          {t(`OrderRoutes.Service.type.${ServiceType[service.type]}`)}
        </Heading>
        <Divider className="mt-[0.3rem] hidden md:block" />
      </div>
      {renderService()}
    </div>
  );
};

export default SubOrderService;
