import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { useFlatOrders } from "./hooks/useFlatOrders";
import { useOrder } from "../OrderRoutes/hooks/useOrder";
import OrdersTable from "./components/Table";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { ordersQuery } = useFlatOrders();
  const { createOrder } = useOrder();

  const onButtonClickCreateOrder = () => {
    createOrder.mutate();
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <Heading variant="h1">{t("order.overview.title")}</Heading>
        <Button
          title={t("order.overview.button.create")}
          onClick={onButtonClickCreateOrder}
        />
      </div>
      <LoadingSuspense query={ordersQuery}>
        {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
          <OrdersTable flatOrders={ordersQuery.data} />
        ) : (
          <Text variant="body">
            {t("Orders.OrderCollectionOverview.empty")}
          </Text>
        )}
      </LoadingSuspense>
    </div>
  );
};

export default Orders;
