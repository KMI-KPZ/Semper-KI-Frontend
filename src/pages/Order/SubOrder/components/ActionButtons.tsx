import { UserProps, UserType } from "@/hooks/useUser/types";
import useSubOrder, {
  SubOrderProps,
} from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { Button } from "@component-library/Button";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { OrderState } from "@/pages/Order/hooks/useOrder";
import SubOrderService from "../Service/Service";
import useService from "@/pages/Service/hooks/useService";

interface SubOrderActionButtonsProps {
  user: UserProps | undefined;
  orderID: string;
  subOrder: SubOrderProps;
  updateStatus: (status: OrderState) => void;
}

const SubOrderActionButtons: React.FC<SubOrderActionButtonsProps> = (props) => {
  const { orderID, subOrder, user, updateStatus } = props;
  const { t } = useTranslation();
  const { deleteSubOrder, updateSubOrderWithSubOrderID } = useSubOrder();

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

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:w-fit md:flex-nowrap">
      {subOrder.state <= OrderState.REQUESTED ? (
        <PermissionGate element="SubOrderButtonDelete">
          <Button
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
              width="fit"
              size="sm"
              children={<DeleteIcon />}
              onClick={handleOnClickButtonReject}
              title={t("Orders.OrderView.button.reject")}
            />
          </PermissionGate>
          <PermissionGate element="SubOrderButtonConfirm">
            <Button
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
