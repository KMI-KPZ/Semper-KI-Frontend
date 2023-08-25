import { useContext, useState } from "react";
import { Button } from "@component-library/Button";
import MailIcon from "@mui/icons-material/Mail";
import Chat from "./components/Chat";
import StatusBar from "./StatusBar/StatusBar";

import { useTranslation } from "react-i18next";
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

import { Divider } from "@component-library/Divider";
import SubOrderNextStepButton from "./components/StateButton";
import { getTitleFromSubOrder } from "../../Service/Overview/components/Item";
import SubOrderActionButtons from "./components/ActionButtons";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

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
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    chatOpen: false,
  });
  const inputText: string = getTitleFromSubOrder(subOrder, t);
  const [nameState, setNameState] = useState<{
    edit: boolean;
    titleText: string;
  }>({
    edit: false,
    titleText: "",
  });
  const { chatOpen } = state;
  const { deleteEvent } = useContext(AppContext);
  const { deleteSubOrder, updateSubOrderWithSubOrderID } = useSubOrder();
  const { getDeleteOrderEvent } = useOrderEventChange(
    subOrder,
    orderID,
    chatOpen
  );

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

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (nameState.edit)
      updateSubOrderWithSubOrderID.mutate({
        subOrderID: subOrder.subOrderID,
        updates: {
          changes: { details: { title: nameState.titleText } },
        },
      });
    setNameState((prevState) => {
      return {
        edit: !prevState.edit,
        titleText: prevState.edit ? prevState.titleText : inputText,
      };
    });
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNameState((prevState) => ({
      ...prevState,
      titleText: e.target.value,
    }));
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 p-5 shadow-card  md:items-start">
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <div className="flex flex-row items-center justify-center gap-2">
          {nameState.edit === true ? (
            <>
              <Heading variant="h3" className="md:whitespace-nowrap">
                {t("Orders.OrderView.name")}
              </Heading>
              <input
                type="text"
                value={nameState.titleText}
                className="bg-slate-100 p-2"
                onChange={handleOnChangeInput}
              />
            </>
          ) : (
            <Heading variant="h3" className="md:whitespace-nowrap">
              {t("Orders.OrderView.name")} {getTitleFromSubOrder(subOrder, t)}
            </Heading>
          )}
          <Button
            onClick={handleOnClickEditCheckButton}
            variant="icon"
            title={t("Orders.OrderView.button.editName")}
            children={
              nameState.edit ? (
                <CheckIcon fontSize="small" />
              ) : (
                <EditIcon fontSize="small" />
              )
            }
          />
        </div>
        <Divider className="hidden md:block" />
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:flex-nowrap">
          {user !== undefined ? (
            <PermissionGate element="SubOrderButtonChat">
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
          ) : null}
          <SubOrderActionButtons
            orderID={orderID}
            subOrder={subOrder}
            updateStatus={updateStatus}
            user={user}
          />
        </div>
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
          className="flex w-full flex-col"
        >
          <Chat
            chat={subOrder.chat.messages}
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
