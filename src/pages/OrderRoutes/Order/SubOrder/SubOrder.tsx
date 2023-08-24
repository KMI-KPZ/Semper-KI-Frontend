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

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 p-5 shadow-card  md:items-start">
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <Heading variant="h3" className="md:whitespace-nowrap">
          {t("Orders.OrderView.name")} {getTitleFromSubOrder(subOrder, t)}
        </Heading>
        <Divider className="hidden md:block" />
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:flex-nowrap">
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
