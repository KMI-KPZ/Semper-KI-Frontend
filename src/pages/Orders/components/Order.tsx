import { useContext, useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import MailIcon from "@mui/icons-material/Mail";
import { AppContext } from "../../App";
import ChatView from "./Chat";
import StatusView from "./StatusView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getModelURI } from "../../../services/utils";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Badge } from "@component-library/Badge";
import OrderFileView from "./FileView";
import PopUp from "@/components/PopUp";
import { IOrder, OrderState, useOrders } from "../hooks/useOrders";
import { OrderEvent, UserType } from "@/hooks/useUser";

interface Props {
  order: IOrder;
  orderCollectionID: string;
  userType: UserType;
  orderEvent?: OrderEvent;
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

  useEffect(() => {
    deleteEvent(orderCollectionID, order.id, "status");
    if (chatOpen) deleteEvent(orderCollectionID, order.id, "message");
  }, [order]);

  const handleOnClickButtonChat = () => {
    deleteEvent(orderCollectionID, order.id, "message");
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
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonCancel}
          >
            {t("Orders.OrderView.button.cancel")}
          </Button>
          <Button
            size="small"
            icon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
          >
            {t("Orders.OrderView.button.reOrder")}
          </Button>
        </div>
      );
    if (userType === UserType.manufacturer)
      return (
        <div className="flex w-full flex-col items-center justify-center gap-3 md:w-fit md:flex-row">
          <Button
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonReject}
          >
            {t("Orders.OrderView.button.reject")}
          </Button>
          <Button
            size="small"
            icon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
          >
            {t("Orders.OrderView.button.verify")}
          </Button>
          <Button
            size="small"
            icon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
          >
            {t("Orders.OrderView.button.confirm")}
          </Button>
        </div>
      );
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 border-2 p-3 md:items-start">
      <div className="flex w-full flex-col justify-between md:flex-row">
        <h3 className="break-words">
          {t("Orders.OrderView.header")} {order.id}
        </h3>
        <h3 className="break-words">{order.item.title}</h3>
        <div className="flex flex-col items-center  justify-center gap-3 md:flex-row">
          {orderEvent !== undefined &&
          orderEvent.messages !== undefined &&
          orderEvent.messages > 0 ? (
            <Badge count={orderEvent.messages}>
              <Button
                size="small"
                icon={<MailIcon />}
                onClick={handleOnClickButtonChat}
              >
                {t("Orders.OrderView.button.chat")}
              </Button>
            </Badge>
          ) : (
            <Button
              size="small"
              icon={<MailIcon />}
              onClick={handleOnClickButtonChat}
            >
              {t("Orders.OrderView.button.chat")}
            </Button>
          )}
          {menuOpen ? renderButtons() : null}
          <div className={`flex items-center justify-center `}>
            <Button
              size="small"
              icon={
                <ExpandLessIcon
                  className={` ${
                    menuOpen ? "md:rotate-90" : "rotate-180 md:-rotate-90"
                  }`}
                />
              }
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
          <h3>{order.item.model?.title}</h3>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-start p-3">
          <h3>{order.item.material?.title}</h3>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-start p-3">
          <h3>{t("Orders.OrderView.postProcessing")}</h3>
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
