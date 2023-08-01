import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import OrdersDraft from "./components/Draft";
import OrdersOngoing from "./components/Ongoing";
import OrdersCompleted from "./components/Completed";
import { useFlatOrders } from "./hooks/useFlatOrders";
import { OrderState } from "../Order/hooks/useOrder";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { ordersQuery } = useFlatOrders();

  const getFlatOrdersByState = (
    startState: OrderState,
    endState: OrderState
  ) => {
    const orders = ordersQuery.data;
    return orders === undefined
      ? []
      : orders.filter(
          (order) => order.state >= startState && order.state <= endState
        );
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("order.overview.title")}</Heading>
      <LoadingSuspense query={ordersQuery}>
        <OrdersDraft
          flatOrders={getFlatOrdersByState(
            OrderState.DRAFT,
            OrderState.VERIFICATION
          )}
        />
        <OrdersOngoing
          flatOrders={getFlatOrdersByState(
            OrderState.REQUESTED,
            OrderState.DELIVERY
          )}
        />
        <OrdersCompleted
          flatOrders={getFlatOrdersByState(
            OrderState.COMPLETED,
            OrderState.COMPLETED
          )}
        />
      </LoadingSuspense>
    </div>
  );
};

export default Orders;
