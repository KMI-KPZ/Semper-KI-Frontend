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
import OrderView from "./Order";
import {
  IOrderCollection,
  OrderCollectionState,
  OrderState,
  useOrders,
} from "../hooks/useOrders";
import { OrderCollectionEvent, OrderEvent, UserType } from "@/hooks/useUser";

interface Props {
  index: number;
  orderCollection: IOrderCollection;
  userType: UserType;
  isOpen: boolean;
  toggleOpen(index: number): void;
  orderCollectionEvent?: OrderCollectionEvent;
}

const OrderCollection: React.FC<Props> = (props) => {
  const {
    orderCollection,
    userType,
    isOpen,
    toggleOpen,
    index,
    orderCollectionEvent,
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
      console.log("//TODO ReOrder");
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
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonCancel}
          >
            {t("Orders.OrderCollection.button.cancel")}
          </Button>
          <Button
            size="small"
            icon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
          >
            {t("Orders.OrderCollection.button.reOrder")}
          </Button>
        </div>
      );
    if (userType === UserType.manufacturer)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonReject}
          >
            {t("Orders.OrderCollection.button.reject")}
          </Button>
          <Button
            size="small"
            icon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
          >
            {t("Orders.OrderCollection.button.verify")}
          </Button>
          <Button
            size="small"
            icon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
          >
            {t("Orders.OrderCollection.button.confirm")}
          </Button>
        </div>
      );
  };

  const handleOnClickButton = () => {
    toggleOpen(index);
  };

  const getOrderEventByID = (orderID: string): OrderEvent | undefined => {
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
        <h2 className="break-words">
          {t("Orders.OrderCollection.id")}: {orderCollection.id}
        </h2>
        <h2>
          {t("Orders.OrderCollection.state.header")}
          {": "}
          {t(
            `Orders.OrderCollection.state.${
              OrderCollectionState[orderCollection.state]
            }`
          )}
        </h2>
        <h2>
          {t("Orders.OrderCollection.date")}:{" "}
          {new Date(orderCollection.date).toLocaleString()}
        </h2>
      </div>
      {isOpen === true ? (
        <>
          {orderCollection.orders
            .sort((orderA, orderB) => (orderA.id < orderB.id ? -1 : 1))
            .map((order, index) => (
              <OrderView
                key={index}
                order={order}
                orderCollectionID={orderCollection.id}
                userType={userType}
                orderEvent={getOrderEventByID(order.id)}
              />
            ))}
          {renderButtons()}
        </>
      ) : (
        <div className="flex flex-col items-start justify-start gap-5 md:flex-row">
          {orderCollection.orders.map((order, index) => (
            <OrderPreView
              key={index}
              order={order}
              orderEvent={getOrderEventByID(order.id)}
            />
          ))}
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        <Button
          onClick={handleOnClickButton}
          icon={isOpen === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
      </div>
    </div>
  );
};

export default OrderCollection;
