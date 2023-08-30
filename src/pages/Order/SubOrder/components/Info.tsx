import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { SubOrderProps } from "../hooks/useSubOrder";

interface SubOrderInfoProps {
  subOrder: SubOrderProps;
}

const SubOrderInfo: React.FC<SubOrderInfoProps> = (props) => {
  const { subOrder } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-fit flex-col items-start justify-center gap-5 bg-white p-10">
      <Text variant="body" className="break-all">
        {t("Orders.OrderView.id")} {subOrder.subOrderID}
      </Text>
      <Text variant="body">
        {t("Orders.OrderView.created")}{" "}
        {new Date(subOrder.created).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Orders.OrderView.updated")}{" "}
        {new Date(subOrder.updated).toLocaleDateString()}
      </Text>
    </div>
  );
};

export default SubOrderInfo;
