import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessDeliveryProps {}

const ProcessDelivery: React.FC<ProcessDeliveryProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="Delivery"
      menuButtonTitle={t("Process.components.Delivery.Delivery.button.menu")}
      pageTitle={`${t("Process.components.Delivery.Delivery.title")}:`}
      start={ProcessStatus.PRODUCTION_COMPLETED}
      end={ProcessStatus.DELIVERY_COMPLETED}
    ></ProcessContainer>
  );
};

export default ProcessDelivery;
