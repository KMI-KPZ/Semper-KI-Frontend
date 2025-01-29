import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import DeliveryUpload from "./DeliveryUpload";

interface ProcessDeliveryProps {}

const ProcessDelivery: React.FC<ProcessDeliveryProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="Delivery"
      menuButtonTitle={t("Process.components.Delivery.button.menu")}
      pageTitle={`${t("Process.components.Delivery.heading")}:`}
      start={ProcessStatus.PRODUCTION_COMPLETED}
      end={ProcessStatus.DELIVERY_IN_PROGRESS}
    >
      <DeliveryUpload />
    </ProcessContainer>
  );
};

export default ProcessDelivery;
