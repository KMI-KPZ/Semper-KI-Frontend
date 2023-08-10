import React from "react";
import { useTranslation } from "react-i18next";
import SubOrder from "./SubOrder/SubOrder";
import { User, UserType } from "@/hooks/useUser/types";
import { OrderEvent, OrderEventItem } from "@/pages/App/types";
import { Heading } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useNavigate } from "react-router-dom";
import { OrderProps, OrderState, useOrder } from "../hooks/useOrder";
import { Divider } from "@component-library/Divider";
import { LoadingAnimation, LoadingSuspense } from "@component-library/index";
import OrderButtons from "./components/Buttons";
import useSubOrder from "../hooks/useSubOrder";

interface Props {
  user: User | undefined;
  event?: OrderEvent;
}

const Order: React.FC<Props> = (props) => {
  const { user, event: orderCollectionEvent } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderQuery } = useOrder();

  const order: OrderProps | undefined = orderQuery.data;

  const getOrderEventItemByID = (
    orderID: string
  ): OrderEventItem | undefined => {
    if (
      orderCollectionEvent === undefined ||
      orderCollectionEvent.orders.length < 1
    )
      return undefined;
    return orderCollectionEvent.orders.find(
      (orderEvent) => orderEvent.orderID === orderID
    );
  };

  return (
    <LoadingSuspense query={orderQuery}>
      {order === undefined ? (
        <LoadingAnimation />
      ) : (
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <div className="flex w-full flex-col items-start justify-start gap-5 md:flex-row md:items-center md:justify-between">
            <Heading variant="h2">
              {t("Orders.OrderCollection.id")}: {order.orderID}
            </Heading>
            <Heading variant="h2">
              {t("Orders.OrderCollection.state.header")}
              {": "}
              {t(`Orders.OrderCollection.state.${OrderState[order.state]}`)}
            </Heading>
            <Heading variant="h2">
              {t("Orders.OrderCollection.date")}:{" "}
              {new Date(order.created).toLocaleString()}
            </Heading>
          </div>
          <PermissionGate element={"OrderButtons"}>
            <Divider />
            <OrderButtons order={order} user={user} />
          </PermissionGate>
          <Divider />
          {order.subOrders.length === 0 ? (
            <Heading variant="h2">
              {t("Orders.OrderCollection.noSubOrders")}
            </Heading>
          ) : (
            order.subOrders
              .sort((subOrderA, subOrderB) =>
                subOrderA.created < subOrderB.created ? -1 : 1
              )
              .map((subOrder, index) => (
                <SubOrder
                  key={index}
                  subOrder={subOrder}
                  orderID={order.orderID}
                  user={user}
                  orderEvent={getOrderEventItemByID(subOrder.subOrderID)}
                />
              ))
          )}
        </div>
      )}
    </LoadingSuspense>
  );
};

export default Order;
