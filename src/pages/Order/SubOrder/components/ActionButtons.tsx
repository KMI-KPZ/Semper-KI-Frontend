import { UserProps, UserType } from "@/hooks/useUser/types";
import useSubOrder, {
  SubOrderProps,
} from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { Button } from "@component-library/Button";
import React, { Dispatch, SetStateAction, useContext } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { OrderState } from "@/pages/Order/hooks/useOrder";
import { SubOrderState } from "../SubOrder";
import { AppContext } from "@/pages/App/App";
import InfoIcon from "@mui/icons-material/Info";
import useOrderEventChange from "../../hooks/useOrderEventChange";
import { OrderEventItem } from "@/pages/App/types";
import { Badge } from "@component-library/Badge";
import MailIcon from "@mui/icons-material/Mail";

interface SubOrderActionButtonsProps {
  user: UserProps | undefined;
  orderID: string;
  subOrder: SubOrderProps;
  updateStatus: (status: OrderState) => void;
  setState: Dispatch<SetStateAction<SubOrderState>>;
  orderEvent?: OrderEventItem;
}

const SubOrderActionButtons: React.FC<SubOrderActionButtonsProps> = (props) => {
  const { orderID, subOrder, user, updateStatus, setState, orderEvent } = props;
  const { t } = useTranslation();
  const { deleteEvent } = useContext(AppContext);
  const { deleteSubOrder, updateSubOrderWithSubOrderID } = useSubOrder();
  const { getDeleteOrderEvent } = useOrderEventChange(subOrder, orderID, true); // todo: check if this is correct

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

  const handleOnClickButtonChat = () => {
    deleteEvent(getDeleteOrderEvent("message"));
    setState((prevState) => ({ ...prevState, chatOpen: true }));
  };

  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };
  const handleOnClickButtonInfo = () => {
    setState((prevState) => ({ ...prevState, infoOpen: true }));
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:flex-nowrap">
      <Button
        variant="icon"
        width="fit"
        size="sm"
        children={<InfoIcon />}
        onClick={handleOnClickButtonInfo}
        title={t("Orders.OrderView.button.info")}
      />
      {user !== undefined ? (
        <PermissionGate element="SubOrderButtonChat">
          {orderEvent !== undefined &&
          orderEvent.messages !== undefined &&
          orderEvent.messages > 0 ? (
            <Badge count={orderEvent.messages}>
              <Button
                variant="icon"
                width="fit"
                size="sm"
                children={<MailIcon />}
                onClick={handleOnClickButtonChat}
                title={t("Orders.OrderView.button.chat")}
              />
            </Badge>
          ) : (
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<MailIcon />}
              onClick={handleOnClickButtonChat}
              title={t("Orders.OrderView.button.chat")}
            />
          )}
        </PermissionGate>
      ) : null}
      {subOrder.state <= OrderState.REQUESTED ? (
        <PermissionGate element="SubOrderButtonDelete">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<DeleteIcon />}
            onClick={handleOnClickButtonCancel}
            title={t("Orders.OrderView.button.cancel")}
          />
        </PermissionGate>
      ) : null}
      {subOrder.state === OrderState.COMPLETED ? (
        <PermissionGate element="SubOrderButtonReOrder">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
            title={t("Orders.OrderView.button.reOrder")}
          />
        </PermissionGate>
      ) : null}

      {subOrder.state >= OrderState.REJECTED &&
      subOrder.state <= OrderState.CONFIRMED ? (
        <>
          <PermissionGate element="SubOrderButtonReject">
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<DeleteIcon />}
              onClick={handleOnClickButtonReject}
              title={t("Orders.OrderView.button.reject")}
            />
          </PermissionGate>
          <PermissionGate element="SubOrderButtonConfirm">
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<CheckIcon />}
              onClick={handleOnClickButtonConfirm}
              title={t("Orders.OrderView.button.confirm")}
            />
          </PermissionGate>
        </>
      ) : null}
      {subOrder.state === OrderState.CONFIRMED ? (
        <PermissionGate element="SubOrderButtonVerify">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
            title={t("Orders.OrderView.button.verify")}
          />
        </PermissionGate>
      ) : null}
    </div>
  );
};

export default SubOrderActionButtons;
