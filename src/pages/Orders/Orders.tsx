import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Order, OrderState, useOrders } from "@/pages/Order/hooks/useOrders";
import { LoadingSuspense } from "@component-library/Loading";
import OrdersDraft from "./components/Draft";
import OrdersOngoing from "./components/Ongoing";
import OrdersCompleted from "./components/Completed";
import { OrdersTableRowProps } from "./components/Table";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { ordersQuery } = useOrders();

  const convertOrdersToRows = (orders: Order[]): OrdersTableRowProps[] => {
    return orders.map((order) => ({
      id: order.id,
      name: `Auftrag ${order.id}`,
      count: order.subOrders.length,
      created: order.date,
      status: OrderState[order.state],
    }));
  };

  const getOrdersByState = (startState: OrderState, endState: OrderState) => {
    const orders = ordersQuery.data;
    return orders === undefined
      ? []
      : convertOrdersToRows(
          orders.filter(
            (order) => order.state >= startState && order.state <= endState
          )
        );
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("order.overview.title")}</Heading>
      <LoadingSuspense query={ordersQuery}>
        <OrdersDraft
          rows={getOrdersByState(OrderState.DRAFT, OrderState.VERIFICATION)}
        />
        <OrdersOngoing
          rows={getOrdersByState(OrderState.REQUESTED, OrderState.DELIVERY)}
        />
        <OrdersCompleted
          rows={getOrdersByState(OrderState.COMPLETED, OrderState.COMPLETED)}
        />
      </LoadingSuspense>
    </div>
  );
};

export default Orders;
