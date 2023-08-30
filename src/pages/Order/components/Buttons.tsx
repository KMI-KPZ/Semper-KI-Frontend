import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import FactoryIcon from "@mui/icons-material/Factory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { UserProps, UserType } from "@/hooks/useUser/types";
import useSubOrder from "../SubOrder/hooks/useSubOrder";
import { Divider } from "@component-library/Divider";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { OrderProps, OrderState, useOrder } from "../hooks/useOrder";
import { Text } from "@component-library/Typography";

interface OrderButtonsProps {
  order: OrderProps;
  user: UserProps | undefined;
}

const OrderButtons: React.FC<OrderButtonsProps> = (props) => {
  const { user, order } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createSubOrder } = useSubOrder();
  const { deleteOrder } = useOrder();

  const onButtonClickCreateSubOrder = () => {
    createSubOrder.mutate();
  };

  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
      deleteOrder.mutate(order.orderID);
      navigate("/orders");
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm(t("Orders.OrderCollection.button.re-order") + "?")) {
      logger("//TODO ReOrder");
    }
  };
  const handleOnClickButtonReject = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.reject") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.REJECTED,
    //   });
    // }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.confirm") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.CONFIRMED,
    //   });
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.verify") + "?")) {
    //   updateOrder.mutate({
    //     orderCollectionID: orderCollection.id,
    //     state: OrderState.CLARIFICATION,
    //   });
    // }
  };

  const handleOnClickButtonEdit = () => {
    navigate("model");
  };
  const handleOnClickButtonManufacture = () => {};

  const renderClientButtons = () => {
    return (
      <>
        {/* {order.state < OrderState.REQUESTED ? (
          <PermissionGate element={"OrderButtonEdit"}>
            <Button
              size="sm"
              startIcon={<DeleteForever />}
              title={t("Orders.OrderCollection.button.delete")}
              onClick={handleOnClickButtonDelete}
            />
          </PermissionGate>
        ) : null} */}
        {/* {order.state === OrderState.REQUESTED ? (
          <PermissionGate element={"OrderButtonDelete"}>
            <Button
              size="sm"
              startIcon={<CancelIcon />}
              title={t("Orders.OrderCollection.button.cancel")}
            />
          </PermissionGate>
        ) : null} */}
        {order.state < OrderState.REQUESTED ? (
          <PermissionGate element={"OrderButtonNew"}>
            <Button
              size="sm"
              startIcon={<AddIcon />}
              onClick={onButtonClickCreateSubOrder}
              title={t("Orders.OrderCollection.button.new")}
            />
          </PermissionGate>
        ) : null}
        {/* {order.state === OrderState.DRAFT ? (
          <PermissionGate element={"OrderButtonManufacturerSelection"}>
            <Button
              size="sm"
              startIcon={<FactoryIcon />}
              to="checkout"
              title={t("Orders.OrderCollection.button.manufacturer")}
            />
          </PermissionGate>
        ) : null} */}
        {order.state === OrderState.CONTRACTOR_SELECTED ? (
          <PermissionGate element={"OrderButtonVerify"}>
            <Button
              size="sm"
              startIcon={<PolicyIcon />}
              to="checkout"
              title={t("Orders.OrderCollection.button.verified")}
            />
          </PermissionGate>
        ) : null}
        {order.state === OrderState.VERIFIED ? (
          <PermissionGate element={"OrderButtonRequest"}>
            <Button
              size="sm"
              startIcon={<SendIcon />}
              to="checkout"
              title={t("Orders.OrderCollection.button.request")}
            />
          </PermissionGate>
        ) : null}
        {order.state === OrderState.COMPLETED ? (
          <PermissionGate element={"OrderButtonReOrder"}>
            <Button
              size="sm"
              startIcon={<ReplayIcon />}
              onClick={handleOnClickButtonReOrder}
              title={t("Orders.OrderCollection.button.reOrder")}
            />
          </PermissionGate>
        ) : null}
      </>
    );
  };

  const renderContractorButtons = () => {
    return (
      <>
        {order.state === OrderState.REQUESTED ? (
          <PermissionGate element={"OrderButtonConfirm"}>
            <Button
              size="sm"
              startIcon={<CheckIcon />}
              onClick={handleOnClickButtonConfirm}
              title={t("Orders.OrderCollection.button.confirm")}
            />
          </PermissionGate>
        ) : null}
        {order.state === OrderState.REQUESTED ||
        order.state === OrderState.CLARIFICATION ? (
          <>
            <PermissionGate element={"OrderButtonReject"}>
              <Button
                size="sm"
                startIcon={<CancelIcon />}
                onClick={handleOnClickButtonReject}
                title={t("Orders.OrderCollection.button.reject")}
              />
            </PermissionGate>
            <PermissionGate element={"OrderButtonVerify"}>
              <Button
                size="sm"
                startIcon={<QuestionMarkIcon />}
                onClick={handleOnClickButtonVerify}
                title={t("Orders.OrderCollection.button.verify")}
              />
            </PermissionGate>
          </>
        ) : null}
      </>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {user === undefined ? renderClientButtons() : null}
      {user !== undefined &&
      (user.organizations.includes(order.client) ||
        user.hashedID === order.client)
        ? renderClientButtons()
        : renderContractorButtons()}
    </div>
  );
};

export default OrderButtons;
