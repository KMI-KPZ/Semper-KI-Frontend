import React from "react";
import { IOrderCollection } from "../../interface/Interface";
import Button from "../General/Button";
import OrderView from "./OrderView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import { useOrders } from "../../hooks/useOrders";
import { EOrderState, EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface Props {
  orderCollection: IOrderCollection;
  userType: EUserType;
}

const OrderCollection: React.FC<Props> = (props) => {
  const { orderCollection, userType } = props;
  const { t } = useTranslation();
  const { deleteOrderCollection, updateOrder } = useOrders();

  const handleOnClickButtonCancel = () => {
    if (window.confirm(t("orderCollection.button.cancel") + "?")) {
      deleteOrderCollection.mutate(orderCollection.id);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("orderCollection.button.re-order") + "?")) {
      console.log("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("orderCollection.button.reject") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: EOrderState.rejected,
      });
    }
  };
  const handleOnClickButtonConfirm = () => {
    if (window.confirm(t("orderCollection.button.confirm") + "?")) {
      updateOrder.mutate({
        orderCollectionID: orderCollection.id,
        state: EOrderState.confirmed,
      });
    }
  };
  const handleOnClickButtonVerify = () => {
    if (window.confirm(t("orderCollection.button.verify") + "?")) {
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
            {t("orderCollection.button.cancel")}
          </Button>
          <Button
            size="small"
            icon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
          >
            {t("orderCollection.button.re-order")}
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
            {t("orderCollection.button.reject")}
          </Button>
          <Button
            size="small"
            icon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
          >
            {t("orderCollection.button.verify")}
          </Button>
          <Button
            size="small"
            icon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
          >
            {t("orderCollection.button.confirm")}
          </Button>
        </div>
      );
  };

  return (
    <div className="flex flex-col justify-start items-start bg-white w-full gap-5 p-5">
      <div className="flex flex-col md:flex-row w-full gap-5 items-start md:items-center justify-start md:justify-between">
        <h2 className="break-words">Id: {orderCollection.id}</h2>
        <h2>Status: {orderCollection.state}</h2>
        <h2>Datum: {new Date(orderCollection.date).toLocaleString()}</h2>
      </div>
      {orderCollection.orders.map((order, index) => (
        <OrderView
          key={index}
          order={order}
          orderCollectionID={orderCollection.id}
          userType={userType}
        />
      ))}
      {renderButtons()}
    </div>
  );
};

export default OrderCollection;
