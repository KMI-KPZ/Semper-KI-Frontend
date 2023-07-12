import React, { useContext } from "react";
import { Button } from "@component-library/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPreView from "./OrderPreView";
import Order from "./Order";
import {
  IOrderCollection,
  OrderCollectionState,
  OrderState,
  useOrders,
} from "../hooks/useOrders";
import { UserType } from "@/hooks/useUser/types";
import { Event, OrderEvent, OrderEventItem } from "@/pages/App/types";
import { Heading } from "@component-library/Typography";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface Props {
  index: number;
  orderCollection: IOrderCollection;
  userType: UserType;
  isOpen: boolean;
  toggleOpen(index: number): void;
  event?: OrderEvent;
}

const OrderCollection: React.FC<Props> = (props) => {
  const {
    orderCollection,
    userType,
    isOpen,
    toggleOpen,
    index,
    event: orderCollectionEvent,
  } = props;
  const { t } = useTranslation();
  const { deleteOrderCollection, updateOrder } = useOrders();

  const handleOnClickButtonCancel = () => {
    if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
      deleteOrderCollection.mutate(orderCollection.id);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("Orders.OrderCollection.button.re-order") + "?")) {
      logger("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("Orders.OrderCollection.button.reject") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: OrderState.rejected,
      });
    }
  };
  const handleOnClickButtonConfirm = () => {
    if (window.confirm(t("Orders.OrderCollection.button.confirm") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: OrderState.confirmed,
      });
    }
  };
  const handleOnClickButtonVerify = () => {
    if (window.confirm(t("Orders.OrderCollection.button.verify") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: OrderState.verify,
      });
    }
  };

  const renderButtons = () => {
    if (userType === UserType.client)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            size="sm"
            startIcon={<CancelIcon />}
            onClick={handleOnClickButtonCancel}
            title={t("Orders.OrderCollection.button.cancel")}
          />
          <Button
            size="sm"
            startIcon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
            title={t("Orders.OrderCollection.button.reOrder")}
          />
        </div>
      );
    if (userType === UserType.manufacturer)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            size="sm"
            startIcon={<CancelIcon />}
            onClick={handleOnClickButtonReject}
            title={t("Orders.OrderCollection.button.reject")}
          />
          <Button
            size="sm"
            startIcon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
            title={t("Orders.OrderCollection.button.verify")}
          />

          <Button
            size="sm"
            startIcon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
            title={t("Orders.OrderCollection.button.confirm")}
          />
        </div>
      );
  };

  const handleOnClickButton = () => {
    toggleOpen(index);
  };

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
    <div className="flex w-full flex-col items-start justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col items-start justify-start gap-5 md:flex-row md:items-center md:justify-between">
        <Heading variant="h2">
          {t("Orders.OrderCollection.id")}: {orderCollection.id}
        </Heading>
        <Heading variant="h2">
          {t("Orders.OrderCollection.state.header")}
          {": "}
          {t(
            `Orders.OrderCollection.state.${
              OrderCollectionState[orderCollection.state]
            }`
          )}
        </Heading>
        <Heading variant="h2">
          {t("Orders.OrderCollection.date")}:{" "}
          {new Date(orderCollection.date).toLocaleString()}
        </Heading>
      </div>
      {isOpen === true ? (
        <>
          {orderCollection.orders
            .sort((orderA, orderB) => (orderA.id < orderB.id ? -1 : 1))
            .map((order, index) => (
              <Order
                key={index}
                order={order}
                orderCollectionID={orderCollection.id}
                userType={userType}
                orderEvent={getOrderEventItemByID(order.id)}
              />
            ))}
          <PermissionGate element={"OrderButtons"}>
            {renderButtons()}
          </PermissionGate>
        </>
      ) : (
        <div className="flex flex-col items-start justify-start gap-5 md:flex-row">
          {orderCollection.orders.map((order, index) => (
            <OrderPreView
              key={index}
              order={order}
              orderEvent={getOrderEventItemByID(order.id)}
            />
          ))}
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        <Button
          title={t(
            `Orders.OrderCollection.button.${isOpen ? "expand" : "collapse"}`
          )}
          onClick={handleOnClickButton}
          startIcon={isOpen === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
      </div>
    </div>
  );
};

export default OrderCollection;
