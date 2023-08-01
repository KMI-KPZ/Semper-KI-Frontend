import React, { useContext } from "react";
import { Button } from "@component-library/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPreView from "./SubOrder/components/OrderPreView";
import EditIcon from "@mui/icons-material/Edit";
import SubOrderView from "./SubOrder/SubOrder";
import { UserType } from "@/hooks/useUser/types";
import { OrderEvent, OrderEventItem } from "@/pages/App/types";
import { Heading } from "@component-library/Typography";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import FactoryIcon from "@mui/icons-material/Factory";
import { useNavigate } from "react-router-dom";
import { Order, OrderState, useOrder } from "./hooks/useOrder";

interface Props {
  userType: UserType;
  event?: OrderEvent;
}

const OrderView: React.FC<Props> = (props) => {
  const { userType, event: orderCollectionEvent } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderQuery } = useOrder();
  const order: Order = {
    date: new Date().toLocaleDateString(),
    id: "bjhkjlkrnbqckubg6874bhjvsbhwvegzukwbnuifebwza1",
    state: OrderState.CONFIRMED,
    subOrders: [],
  };

  const handleOnClickButtonCancel = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
    //   deleteOrderCollection.mutate(orderCollection.id);
    // }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("Orders.OrderCollection.button.re-order") + "?")) {
      logger("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.reject") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.REJECTED,
    //   });
    // }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.confirm") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.CONFIRMED,
    //   });
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.verify") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.CLARIFICATION,
    //   });
    // }
  };

  const handleOnClickButtonEdit = () => {
    navigate("model");
  };
  const handleOnClickButtonManufacture = () => {};

  const renderAnonymButtons = () => {
    return (
      <>
        <Button
          size="sm"
          startIcon={<EditIcon />}
          to="model"
          title={t("Orders.OrderCollection.button.edit")}
        />
        <Button
          size="sm"
          startIcon={<FactoryIcon />}
          to="checkout"
          title={t("Orders.OrderCollection.button.manufacturer")}
        />
      </>
    );
  };

  const renderClientButtons = () => {
    return (
      <>
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
      </>
    );
  };

  const renderManufacturerButtons = () => {
    return (
      <>
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
      </>
    );
  };

  const renderButtons = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        {userType === UserType.anonym ? renderAnonymButtons() : null}
        {userType === UserType.client ? renderClientButtons() : null}
        {userType === UserType.manufacturer
          ? renderManufacturerButtons()
          : null}
      </div>
    );
  };

  const handleOnClickButton = () => {
    // toggleOpen(index);
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
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col items-start justify-start gap-5 md:flex-row md:items-center md:justify-between">
        <Heading variant="h2">
          {t("Orders.OrderCollection.id")}: {order.id}
        </Heading>
        <Heading variant="h2">
          {t("Orders.OrderCollection.state.header")}
          {": "}
          {t(`Orders.OrderCollection.state.${OrderState[order.state]}`)}
        </Heading>
        <Heading variant="h2">
          {t("Orders.OrderCollection.date")}:{" "}
          {new Date(order.date).toLocaleString()}
        </Heading>
      </div>
      {order.subOrders.length === 0 ? (
        <Heading variant="h2">
          {t("Orders.OrderCollection.noSubOrders")}
        </Heading>
      ) : (
        order.subOrders
          .sort((subOrderA, subOrderB) =>
            subOrderA.id < subOrderB.id ? -1 : 1
          )
          .map((subOrder, index) => (
            <SubOrderView
              key={index}
              subOrder={subOrder}
              orderID={order.id}
              userType={userType}
              orderEvent={getOrderEventItemByID(subOrder.id)}
            />
          ))
      )}
      <PermissionGate element={"OrderButtons"}>
        {renderButtons()}
      </PermissionGate>
    </div>
  );
};

export default OrderView;
