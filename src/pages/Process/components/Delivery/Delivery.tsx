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

  const getAddtionalTitle = () => {
    const contractFiles = process.files.filter(
      (file) => file.origin === "PaymentFiles"
    );
    if (
      contractFiles.length === 0 &&
      process.processStatus === ProcessStatus.PRODUCTION_COMPLETED
    ) {
      return t("Process.components.Delivery.noFile");
    }
    if (
      contractFiles.length > 0 &&
      process.processStatus === ProcessStatus.PRODUCTION_COMPLETED
    ) {
      return t("Process.components.Delivery.isFile");
    }
    if (process.processStatus === ProcessStatus.DELIVERY_IN_PROGRESS) {
      return t("Process.components.Delivery.inProgress");
    }
    if (process.processStatus === ProcessStatus.FAILED)
      return t("Process.components.Delivery.failed");
    return t("Process.components.Delivery.completed");
  };

  return (
    <ProcessContainer
      id="Delivery"
      titleAddition={getAddtionalTitle()}
      start={ProcessStatus.PRODUCTION_COMPLETED}
      end={ProcessStatus.DELIVERY_IN_PROGRESS}
    >
      <ProcessMessages messages={process.messages.Contract} origin="Delivery" />
      <DeliveryUpload />
    </ProcessContainer>
  );
};

export default ProcessDelivery;
