import { useContext, useState } from "react";
import {
  IOrder,
  IOrderCollection,
  IOrderEvent,
} from "../../interface/Interface";
import Button from "../General/Button";
import MailIcon from "@mui/icons-material/Mail";
import PopUp from "../PopUp/PopUp";
import { AppContext } from "../App/App";
import ChatView from "./ChatView";
import StatusView from "./StatusView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getModelURI } from "../../services/utils";
import { useOrders } from "../../hooks/useOrders";
import { EOrderState, EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Badge from "../General/Badge";

interface Props {
  order: IOrder;
  orderCollectionID: string;
  userType: EUserType;
  orderEvent?: IOrderEvent;
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
  const { user } = useContext(AppContext);
  const { deleteOrder, updateOrder } = useOrders();
  const { t } = useTranslation();

  const handleOnClickButtonChat = () => {
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
  const updateStatus = (status: EOrderState) => {
    updateOrder.mutate({
      orderCollectionID: orderCollectionID,
      orderID: order.id,
      state: status,
    });
  };

  const handleOnClickButtonCancel = () => {
    if (window.confirm("Auftrag wirklich stonieren?")) {
      deleteOrder.mutate(order.id);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm("Auftrag wirklich erneut Bestellen?")) {
      console.log("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("orderView.button.reject") + "?")) {
      updateStatus(EOrderState.rejected);
    }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("orderView.button.confirm") + "?")) {
    updateStatus(EOrderState.confirmed);
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("orderView.button.verify") + "?")) {
    updateStatus(EOrderState.verify);
    // }
  };
  const handleOnClickButtonExpand = () => {
    setState((prevState) => ({ ...prevState, menuOpen: !prevState.menuOpen }));
  };

  const renderButtons = () => {
    if (userType === EUserType.client)
      return (
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <Button
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonCancel}
          >
            {t("orderView.button.cancel")}
          </Button>
          <Button
            size="small"
            icon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
          >
            {t("orderView.button.re-order")}
          </Button>
        </div>
      );
    if (userType === EUserType.manufacturer)
      return (
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <Button
            size="small"
            icon={<CancelIcon />}
            onClick={handleOnClickButtonReject}
          >
            {t("orderView.button.reject")}
          </Button>
          <Button
            size="small"
            icon={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
          >
            {t("orderView.button.verify")}
          </Button>
          <Button
            size="small"
            icon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
          >
            {t("orderView.button.confirm")}
          </Button>
        </div>
      );
  };
  return (
    <div className="flex flex-col justify-start items-start gap-3 border-2 w-full p-3">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <h3 className="break-words">Bestellung: {order.id}</h3>
        <div className=" flex flex-col md:flex-row gap-3 items-center justify-center">
          {orderEvent !== undefined &&
          orderEvent.messages !== undefined &&
          orderEvent.messages > 0 ? (
            <Badge count={orderEvent.messages}>
              <Button
                size="small"
                icon={<MailIcon />}
                onClick={handleOnClickButtonChat}
              >
                Chat
              </Button>
            </Badge>
          ) : (
            <Button
              size="small"
              icon={<MailIcon />}
              onClick={handleOnClickButtonChat}
            >
              Chat
            </Button>
          )}
          {menuOpen ? renderButtons() : null}
          <div
            className={`flex items-center justify-center ${
              menuOpen ? "rotate-90" : "-rotate-90"
            }`}
          >
            <Button
              size="small"
              icon={<ExpandLessIcon />}
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
      <div className="flex flex-col md:flex-row gap-5 w-full items-start justify-center md:justify-around p-5">
        <img
          src={getModelURI(order.item.model!)}
          className="object-fit w-2/12"
        />
        <div className="flex flex-col items-center justify-start p-3 w-1/4">
          <h3>{order.item.model?.title}</h3>
        </div>
        <div className="flex flex-col items-center justify-start p-3 w-1/4">
          <h3>{order.item.material?.title}</h3>
        </div>
        <div className="flex flex-col items-center justify-start p-3 w-1/4">
          <h3>Nachbearbeitungen</h3>
          {order.item.postProcessings?.map((postProcessing, index) => (
            <span key={index}>{postProcessing.title}</span>
          ))}
        </div>
      </div>
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
