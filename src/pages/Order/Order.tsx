import React from "react";
import { useTranslation } from "react-i18next";
import SubOrder from "./SubOrder/SubOrder";
import { UserProps, UserType } from "@/hooks/useUser/types";
import { OrderEvent, OrderEventItem } from "@/pages/App/types";
import { Heading, Text } from "@component-library/Typography";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  LoadingAnimation,
  LoadingSuspense,
} from "@component-library/index";
import OrderButtons from "./components/Buttons";
import { OrderProps, OrderState, useOrder } from "./hooks/useOrder";
import Container from "@component-library/Container";
import CancelIcon from "@mui/icons-material/Cancel";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface Props {
  user: UserProps | undefined;
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
          <Container width="full" justify="between" align="start">
            <Container direction="col" align="start">
              <Heading variant="h2" className="break-all">
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
            </Container>
            <Container>
              <PermissionGate element={"OrderButtonDelete"}>
                <Button
                  size="sm"
                  startIcon={<CancelIcon />}
                  title={t("Orders.OrderCollection.button.cancel")}
                />
              </PermissionGate>
            </Container>
          </Container>
          <Divider />
          <Container width="full" justify="between">
            <Heading variant="h2">
              {t("Orders.OrderCollection.subOrders")}
              {":"}
            </Heading>
            <OrderButtons order={order} user={user} />
          </Container>
          <Container justify="between" width="full">
            <label className="flex flex-row items-center justify-start gap-3">
              <input type="checkbox" className="h-8 w-8" />
              <Text variant="body" className="whitespace-nowrap">
                {t("Orders.OrderCollection.selectAll")}
              </Text>
            </label>
          </Container>

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
