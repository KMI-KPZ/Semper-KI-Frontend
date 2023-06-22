import { useContext, useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import MailIcon from "@mui/icons-material/Mail";
import ChatView from "./Chat";
import StatusView from "./StatusView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Badge } from "@component-library/Badge";
import OrderFileView from "./FileView";
import PopUp from "@/components/PopUp";
import { IOrder, OrderState, useOrders } from "../hooks/useOrders";
import { UserType } from "@/hooks/useUser/types";
import {
  DeleteOrderEvent,
  Event,
  OrderEvent,
  OrderEventItem,
} from "@/pages/App/hooks/types";
import { AppContext } from "@/pages/App";
import { getModelURI } from "@/services/utils";
import { Heading } from "@component-library/Typography";

interface Props {
  order: IOrder;
  orderCollectionID: string;
  userType: UserType;
  orderEvent?: OrderEventItem;
}

interface State {
  chatOpen: boolean;
  menuOpen: boolean;
}

const OrderView: React.FC<Props> = (props) => {
  const { order, orderCollectionID, userType, orderEvent } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
    menuOpen: false,
  });
  const { chatOpen, menuOpen } = state;
  const { user, deleteEvent } = useContext(AppContext);
  const { deleteOrder, updateOrder } = useOrders();
  const { t } = useTranslation();

  const getDeleteOrderEvent = (type: "status" | "message"): Event => {
    const deleteOrderEvent: DeleteOrderEvent = {
      eventType: "orderEvent",
      orderCollectionID: orderCollectionID,
      orderID: order.id,
      type: type,
    };
    return deleteOrderEvent as Event;
  };

  useEffect(() => {
    deleteEvent(getDeleteOrderEvent("status"));
    if (chatOpen) deleteEvent(getDeleteOrderEvent("message"));
  }, [order]);

  const handleOnClickButtonChat = () => {
    deleteEvent(getDeleteOrderEvent("message"));
    setState((prevState) => ({ ...prevState, chatOpen: true }));
  };
  const handleOnOutsideClickChat = () => {
    closeMenu();
  };
  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };
  const updateStatus = (status: OrderState) => {
    updateOrder.mutate({
      orderCollectionID: orderCollectionID,
      orderID: order.id,
      state: status,
    });
  };
  const handleOnClickButtonCancel = () => {
    if (window.confirm(t("Orders.OrderView.confirm.cancel"))) {
      deleteOrder.mutate(order.id);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("Orders.OrderView.confirm.reOrder"))) {
      console.log("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("Orders.OrderView.confirm.reject"))) {
      updateStatus(OrderState.rejected);
    }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("OrderView.button.confirm") + "?")) {
    updateStatus(OrderState.confirmed);
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("OrderView.button.verify") + "?")) {
    updateStatus(OrderState.verify);
    // }
  };
  const handleOnClickButtonExpand = () => {
    setState((prevState) => ({ ...prevState, menuOpen: !prevState.menuOpen }));
  };

  const renderButtons = () => {
    if (userType === UserType.client)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-3 md:w-fit md:flex-row">
          <Button
            size="sm"
            startIcon={<CancelIcon />}
            onClick={handleOnClickButtonCancel}
            title={t("Orders.OrderView.button.cancel")}
          />
          <Button
            size="sm"
            startIcon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
            title={t("Orders.OrderView.button.reOrder")}
          />
        </div>
      );
    if (userType === UserType.manufacturer)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-3 md:w-fit md:flex-row">
          <Button
            size="sm"
            startIcon={<CancelIcon />}
            onClick={handleOnClickButtonReject}
            title={t("Orders.OrderView.button.reject")}
          />
          <Button
            size="sm"
            startIcon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
            title={t("Orders.OrderView.button.verify")}
          />
          <Button
            size="sm"
            startIcon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
            title={t("Orders.OrderView.button.confirm")}
          />
        </div>
      );
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 border-2 p-3 md:items-start">
      <div className="flex w-full flex-col justify-between md:flex-row">
        <Heading variant="h3">
          {t("Orders.OrderView.header")} {order.id}
        </Heading>
        <Heading variant="h3">{order.item.title}</Heading>
        <div className="flex flex-col items-center  justify-center gap-3 md:flex-row">
          {orderEvent !== undefined &&
          orderEvent.messages !== undefined &&
          orderEvent.messages > 0 ? (
            <Badge count={orderEvent.messages}>
              <Button
                size="sm"
                startIcon={<MailIcon />}
                onClick={handleOnClickButtonChat}
                title={t("Orders.OrderView.button.chat")}
              />
            </Badge>
          ) : (
            <Button
              size="sm"
              startIcon={<MailIcon />}
              onClick={handleOnClickButtonChat}
              title={t("Orders.OrderView.button.chat")}
            />
          )}
          {menuOpen ? renderButtons() : null}
          <div className={`flex items-center justify-center `}>
            <Button
              size="sm"
              startIcon={
                <ExpandLessIcon
                  className={` ${
                    menuOpen ? "md:rotate-90" : "rotate-180 md:-rotate-90"
                  }`}
                />
              }
              title={t(
                `Orders.OrderView.button.${menuOpen ? "expand" : "collapse"}`
              )}
              onClick={handleOnClickButtonExpand}
            />
          </div>
        </div>
      </div>
      <StatusView
        status={order.orderState}
        updateStatus={updateStatus}
        userType={userType}
      />
      <div className="flex w-full flex-col items-center justify-center gap-5 p-5 md:flex-row md:items-start md:justify-around">
        <img
          src={getModelURI(order.item.model!)}
          className="object-fit w-2/12"
        />
        <div className="flex w-1/4 flex-col items-center justify-start p-3">
          <Heading variant="h3">{order.item.model?.title}</Heading>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-start p-3">
          <Heading variant="h3">{order.item.material?.title}</Heading>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-start p-3">
          <Heading variant="h3">{t("Orders.OrderView.postProcessing")}</Heading>
          {order.item.postProcessings?.map((postProcessing, index) => (
            <span key={index}>{postProcessing.title}</span>
          ))}
        </div>
      </div>
      <OrderFileView order={order} orderCollectionID={orderCollectionID} />
      <PopUp open={chatOpen} onOutsideClick={handleOnOutsideClickChat}>
        <ChatView
          chat={order.chat.messages}
          user={user}
          closeMenu={closeMenu}
          orderCollectionID={orderCollectionID}
          orderID={order.id}
        />
      </PopUp>
    </div>
  );
};

export default OrderView;
