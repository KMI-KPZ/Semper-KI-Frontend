import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import DeliveryUpload from "./DeliveryUpload";
import useProcess from "@/hooks/Process/useProcess";
import ProcessMessages from "@/components/Process/Messages/Messages";

interface ProcessDeliveryProps {}

const ProcessDelivery: React.FC<ProcessDeliveryProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <ProcessContainer
      id="Delivery"
      menuButtonTitle={t("Process.components.Delivery.button.menu")}
      pageTitle={`${t("Process.components.Delivery.heading")}:`}
      start={ProcessStatus.PRODUCTION_COMPLETED}
      end={ProcessStatus.DELIVERY_IN_PROGRESS}
    >
      <ProcessMessages messages={process.messages.Contract} origin="Delivery" />
      <DeliveryUpload />
    </ProcessContainer>
  );
};

export default ProcessDelivery;
