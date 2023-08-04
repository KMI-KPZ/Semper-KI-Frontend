import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import OrdersTable from "./Table";
import { FlatOrder } from "@/pages/Orders/hooks/useFlatOrders";

interface OrdersCompletedProps {
  flatOrders: FlatOrder[];
}

const OrdersCompleted: React.FC<OrdersCompletedProps> = (props) => {
  const { flatOrders } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
        <Heading variant="h2">{t("order.overview.completed")}</Heading>
      </div>
      <OrdersTable flatOrders={flatOrders} />
    </div>
  );
};

export default OrdersCompleted;
