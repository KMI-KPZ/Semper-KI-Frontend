import { useContext, useState } from "react";
import { Button } from "@component-library/Button";
import MailIcon from "@mui/icons-material/Mail";
import Chat from "./components/Chat";
import StatusBar from "./StatusBar/StatusBar";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Badge } from "@component-library/Badge";
import OrderFile from "./components/OrderFile";
import { User, UserType } from "@/hooks/useUser/types";
import { OrderEventItem } from "@/pages/App/types";
import { AppContext } from "@/pages/App/App";
import { getModelURI } from "@/services/utils";
import { Heading, Text } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useOrderEventChange from "../hooks/useOrderEventChange";
import logger from "@/hooks/useLogger";
import Modal from "@component-library/Modal";
import { OrderState } from "../../hooks/useOrder";
import useSubOrder, { SubOrderProps } from "../../hooks/useSubOrder";
import SubOrderService from "./Service/Service";
import { ServiceType } from "../../Service/hooks/useService";

interface Props {
  subOrder: SubOrderProps;
  orderID: string;
  user: User | undefined;
  orderEvent?: OrderEventItem;
}

interface State {
  chatOpen: boolean;
  menuOpen: boolean;
}

const SubOrder: React.FC<Props> = (props) => {
  const { subOrder, orderID, user, orderEvent } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
    menuOpen: false,
  });
  const { chatOpen, menuOpen } = state;
  const { deleteEvent } = useContext(AppContext);
  const { deleteSubOrder, updateSubOrder } = useSubOrder();
  const { getDeleteOrderEvent } = useOrderEventChange(
    subOrder,
    orderID,
    chatOpen
  );
  const { t } = useTranslation();

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
    // updateOrder.mutate({
    //   orderCollectionID: orderID,
    //   orderID: subOrder.id,
    //   state: status,
    // });
  };
  const handleOnClickButtonCancel = () => {
    if (window.confirm(t("Orders.OrderView.confirm.cancel"))) {
      deleteSubOrder.mutate(subOrder.subOrderID);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("Orders.OrderView.confirm.reOrder"))) {
      logger("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("Orders.OrderView.confirm.reject"))) {
      updateStatus(OrderState.REJECTED);
    }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("OrderView.button.confirm") + "?")) {
    updateStatus(OrderState.CONFIRMED);
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("OrderView.button.verify") + "?")) {
    updateStatus(OrderState.CLARIFICATION);
    // }
  };
  const handleOnClickButtonExpand = () => {
    setState((prevState) => ({ ...prevState, menuOpen: !prevState.menuOpen }));
  };

  const renderButtons = () => {
    if (user === undefined) return null;
    if (user.usertype === UserType.USER)
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
    if (user.usertype === UserType.ORGANIZATION)
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
          {t("Orders.OrderView.header")} {subOrder.subOrderID}
        </Heading>
        <Text variant="body">
          {new Date(subOrder.created).toLocaleString()}
        </Text>
        <Heading variant="h3">{ServiceType[subOrder.service.type]}</Heading>
        <PermissionGate element={["OrderButtons", "ChatButton"]} concat="or">
          <div className="flex flex-col items-center  justify-center gap-3 md:flex-row">
            <PermissionGate element="ChatButton">
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
            </PermissionGate>
            <PermissionGate element="OrderButtons">
              {menuOpen ? renderButtons() : null}
            </PermissionGate>
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
                  `Orders.OrderView.button.${menuOpen ? "collapse" : "expand"}`
                )}
                onClick={handleOnClickButtonExpand}
              />
            </div>
          </div>
        </PermissionGate>
      </div>
      <div className="md:jube flex flex-col md:flex-row"></div>
      <StatusBar
        currentState={subOrder.state}
        updateStatus={updateStatus}
        userType={user === undefined ? UserType.ANONYM : user.usertype}
      />
      <SubOrderService service={subOrder.service} />
      <PermissionGate element="OrderFile">
        <OrderFile subOrder={subOrder} orderCollectionID={orderID} />
      </PermissionGate>
      <PermissionGate element="Chat">
        <Modal
          open={chatOpen}
          closeModal={handleOnOutsideClickChat}
          className="flex w-full flex-col  "
        >
          <Chat
            chat={subOrder.chat}
            user={user}
            closeMenu={closeMenu}
            orderCollectionID={orderID}
            orderID={subOrder.subOrderID}
          />
        </Modal>
      </PermissionGate>
    </div>
  );
};

export default SubOrder;
