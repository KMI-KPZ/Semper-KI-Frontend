import React, { useContext } from "react";
import {
  IOrderCollection,
  IOrderCollectionEvent,
  IOrderEvent,
} from "../../interface/Interface";
import Button from "../General/Button";
import OrderView from "./OrderView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import { useOrders } from "../../hooks/useOrders";
import {
  EOrderCollectionState,
  EOrderState,
  EUserType,
} from "../../interface/enums";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPreView from "./OrderPreView";
import { AppContext } from "../App/App";

interface Props {
  index: number;
  orderCollection: IOrderCollection;
  userType: EUserType;
  isOpen: boolean;
  toggleOpen(index: number): void;
  orderCollectionEvent?: IOrderCollectionEvent;
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
        state: EOrderState.rejected,
      });
    }
  };
  const handleOnClickButtonConfirm = () => {
    if (window.confirm(t("Orders.OrderCollection.button.confirm") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: EOrderState.confirmed,
      });
    }
  };
  const handleOnClickButtonVerify = () => {
    if (window.confirm(t("Orders.OrderCollection.button.verify") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: EOrderState.verify,
      });
    }
  };

  const renderButtons = () => {
    if (userType === EUserType.client)
      return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
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
    if (userType === EUserType.manufacturer)
      return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
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

  const getOrderEventByID = (orderID: string): IOrderEvent | undefined => {
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
    <div className="flex flex-col justify-start items-start bg-white w-full gap-5 p-5">
      <div className="flex flex-col md:flex-row w-full gap-5 items-start md:items-center justify-start md:justify-between">
        <h2 className="break-words">
          {t("Orders.OrderCollection.id")}: {orderCollection.id}
        </h2>
        <h2>
          {t("Orders.OrderCollection.state.header")}:{" "}
          {t(
            `Orders.OrderCollection.state.${
              EOrderCollectionState[orderCollection.state]
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
          {orderCollection.orders.map((order, index) => (
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
        <div className="flex flex-col md:flex-row gap-5 justify-start items-start">
          {orderCollection.orders.map((order, index) => (
            <OrderPreView
              key={index}
              order={order}
              orderEvent={getOrderEventByID(order.id)}
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <Button
          onClick={handleOnClickButton}
          icon={isOpen === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
      </div>
    </div>
  );
};

export default OrderCollection;
