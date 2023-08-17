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
import DeleteIcon from "@mui/icons-material/Delete";
import { Heading, Text } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useOrderEventChange from "../hooks/useOrderEventChange";
import logger from "@/hooks/useLogger";
import Modal from "@component-library/Modal";
import { OrderState } from "../../hooks/useOrder";
import useSubOrder, { SubOrderProps } from "../../hooks/useSubOrder";
import SubOrderService from "./Service/Service";
import { ServiceType } from "../../Service/hooks/useService";
import EditIcon from "@mui/icons-material/Edit";
import { Divider } from "@component-library/Divider";
import SubOrderNextStepButton from "./components/StateButton";
import { getTitleFromSubOrder } from "../../Service/Overview/components/Item";

interface Props {
  subOrder: SubOrderProps;
  orderID: string;
  user: User | undefined;
  orderEvent?: OrderEventItem;
}

interface State {
  chatOpen: boolean;
}

const SubOrder: React.FC<Props> = (props) => {
  const { subOrder, orderID, user, orderEvent } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
  });
  const { chatOpen } = state;
  const { deleteEvent } = useContext(AppContext);
  const { deleteSubOrder, updateSubOrderWithSubOrderID } = useSubOrder();
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

  const renderButtons = () => {
    if (user === undefined) return null;
    if (user.usertype === UserType.USER)
      return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:w-fit md:flex-nowrap">
          {subOrder.state < OrderState.REQUESTED ? (
            <Button
              width="fit"
              size="sm"
              children={<EditIcon />}
              to={`/order/${orderID}/suborder/${subOrder.subOrderID}`}
              title={t("Orders.OrderView.button.edit")}
            />
          ) : null}
          {subOrder.state <= OrderState.REQUESTED ? (
            <Button
              width="fit"
              size="sm"
              children={<DeleteIcon />}
              onClick={handleOnClickButtonCancel}
              title={t("Orders.OrderView.button.cancel")}
            />
          ) : null}
          {subOrder.state === OrderState.COMPLETED ? (
            <Button
              width="fit"
              size="sm"
              children={<ReplayIcon />}
              onClick={handleOnClickButtonReOrder}
              title={t("Orders.OrderView.button.reOrder")}
            />
          ) : null}
        </div>
      );
    if (user.usertype === UserType.ORGANIZATION)
      return (
        <div className="flex  flex-row flex-wrap items-center justify-center gap-3 md:w-fit md:flex-nowrap">
          {subOrder.state >= OrderState.REJECTED &&
          subOrder.state <= OrderState.CONFIRMED ? (
            <>
              <Button
                width="fit"
                size="sm"
                children={<DeleteIcon />}
                onClick={handleOnClickButtonReject}
                title={t("Orders.OrderView.button.reject")}
              />
              <Button
                width="fit"
                size="sm"
                children={<CheckIcon />}
                onClick={handleOnClickButtonConfirm}
                title={t("Orders.OrderView.button.confirm")}
              />
            </>
          ) : null}
          {subOrder.state === OrderState.CONFIRMED ? (
            <Button
              width="fit"
              size="sm"
              children={<QuestionMarkIcon />}
              onClick={handleOnClickButtonVerify}
              title={t("Orders.OrderView.button.verify")}
            />
          ) : null}
        </div>
      );
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 p-5 shadow-card  md:items-start">
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <Heading variant="h3" className="md:whitespace-nowrap">
          {t("Orders.OrderView.name")} {getTitleFromSubOrder(subOrder, t)}
        </Heading>
        <Divider className="hidden md:block" />
        <PermissionGate element={["OrderButtons", "ChatButton"]} concat="or">
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:flex-nowrap">
            <PermissionGate element="ChatButton">
              {orderEvent !== undefined &&
              orderEvent.messages !== undefined &&
              orderEvent.messages > 0 ? (
                <Badge count={orderEvent.messages}>
                  <Button
                    width="fit"
                    size="sm"
                    children={<MailIcon />}
                    onClick={handleOnClickButtonChat}
                    title={t("Orders.OrderView.button.chat")}
                  />
                </Badge>
              ) : (
                <Button
                  width="fit"
                  size="sm"
                  children={<MailIcon />}
                  onClick={handleOnClickButtonChat}
                  title={t("Orders.OrderView.button.chat")}
                />
              )}
            </PermissionGate>
            <PermissionGate element="OrderButtons">
              {renderButtons()}
            </PermissionGate>
          </div>
        </PermissionGate>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-5 md:flex-row md:flex-wrap md:justify-between">
        <Text variant="body" className="break-all">
          {t("Orders.OrderView.id")} {subOrder.subOrderID}
        </Text>
        <Text variant="body">
          {t("Orders.OrderView.created")}{" "}
          {new Date(subOrder.created).toLocaleDateString()}
        </Text>
      </div>
      <StatusBar state={subOrder.state} serviceType={subOrder.service.type} />
      <SubOrderNextStepButton
        state={subOrder.state}
        subOrderID={subOrder.subOrderID}
      />
      <SubOrderService
        service={subOrder.service}
        subOrderID={subOrder.subOrderID}
      />
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
            orderID={orderID}
            subOrderID={subOrder.subOrderID}
          />
        </Modal>
      </PermissionGate>
    </div>
  );
};

export default SubOrder;
