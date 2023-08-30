import { useContext, useState } from "react";
import { Button } from "@component-library/Button";

import Chat from "./components/Chat";
import StatusBar from "./StatusBar/StatusBar";
import { useTranslation } from "react-i18next";
import { Badge } from "@component-library/Badge";
import OrderFile from "./components/OrderFile";
import { UserProps } from "@/hooks/useUser/types";
import { OrderEventItem } from "@/pages/App/types";
import { AppContext } from "@/pages/App/App";
import { Heading, Text } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useOrderEventChange from "../hooks/useOrderEventChange";
import Modal from "@component-library/Modal";
import useSubOrder, { SubOrderProps } from "./hooks/useSubOrder";
import SubOrderService from "./Service/Service";
import { Divider } from "@component-library/Divider";
import SubOrderNextStepButton from "./components/StateButton";
import { getTitleFromSubOrder } from "../../Service/Overview/components/Item";
import SubOrderActionButtons from "./components/ActionButtons";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { OrderState } from "../hooks/useOrder";
import SubOrderInfo from "./components/Info";

interface Props {
  subOrder: SubOrderProps;
  orderID: string;
  user: UserProps | undefined;
  orderEvent?: OrderEventItem;
}

export interface SubOrderState {
  chatOpen: boolean;
  infoOpen: boolean;
}

const SubOrder: React.FC<Props> = (props) => {
  const { subOrder, orderID, user, orderEvent } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<SubOrderState>({
    chatOpen: false,
    infoOpen: false,
  });
  const inputText: string = getTitleFromSubOrder(subOrder, t);
  const [nameState, setNameState] = useState<{
    edit: boolean;
    titleText: string;
  }>({
    edit: false,
    titleText: "",
  });

  const { updateSubOrderWithSubOrderID } = useSubOrder();

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

  const closeChat = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };
  const closeInfo = () => {
    setState((prevState) => ({
      ...prevState,
      infoOpen: false,
    }));
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 p-5 shadow-card  md:items-start">
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <input type="checkbox" className="h-8 w-8" />
          <Heading variant="h3" className="md:whitespace-nowrap">
            {t("Orders.OrderView.name")}
          </Heading>
          {nameState.edit === true ? (
            <>
              <input
                type="text"
                value={nameState.titleText}
                className="w-full bg-slate-100 p-2 md:w-fit"
                onChange={handleOnChangeInput}
              />
            </>
          ) : (
            <Heading variant="h3" className="md:whitespace-nowrap">
              {getTitleFromSubOrder(subOrder, t)}
            </Heading>
          )}
          <Button
            width="fit"
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
        <SubOrderActionButtons
          setState={setState}
          orderID={orderID}
          subOrder={subOrder}
          updateStatus={updateStatus}
          user={user}
          orderEvent={orderEvent}
        />
      </div>
      <StatusBar state={subOrder.state} serviceType={subOrder.service.type} />
      <SubOrderService
        service={subOrder.service}
        subOrderID={subOrder.subOrderID}
      />
      <PermissionGate element="OrderFile">
        <OrderFile subOrder={subOrder} orderCollectionID={orderID} />
      </PermissionGate>
      <PermissionGate element="Chat">
        <Modal
          open={state.chatOpen}
          closeModal={closeChat}
          className="flex w-full flex-col"
        >
          <Chat
            chat={subOrder.chat.messages}
            user={user}
            closeMenu={closeChat}
            orderID={orderID}
            subOrderID={subOrder.subOrderID}
          />
        </Modal>
      </PermissionGate>
      <Modal
        open={state.infoOpen}
        closeModal={closeInfo}
        className="flex w-full flex-col"
      >
        <SubOrderInfo subOrder={subOrder} />
      </Modal>
    </div>
  );
};

export default SubOrder;
