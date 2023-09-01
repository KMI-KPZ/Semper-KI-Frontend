import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { OrderProps } from "../hooks/useOrder";

interface OrderInfoProps {
  order: OrderProps;
}

const OrderInfo: React.FC<OrderInfoProps> = (props) => {
  const { order } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-fit flex-col items-start justify-center gap-5 bg-white p-10">
      <Text variant="body" className="break-all">
        {t("Orders.OrderInfo.id")} {order.orderID}
      </Text>
      <Text variant="body">
        {t("Orders.OrderInfo.created")}{" "}
        {new Date(order.created).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Orders.OrderInfo.updated")}{" "}
        {new Date(order.updated).toLocaleDateString()}
      </Text>
    </div>
  );
};

export default OrderInfo;
