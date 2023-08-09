import React from "react";
import { useTranslation } from "react-i18next";
import { OrderProps, OrderState } from "../../hooks/useOrder";
import { Button } from "@component-library/Button";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import FactoryIcon from "@mui/icons-material/Factory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { User, UserType } from "@/hooks/useUser/types";

interface OrderButtonsProps {
  order: OrderProps;
  user: User | undefined;
}

const OrderButtons: React.FC<OrderButtonsProps> = (props) => {
  const { user, order } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickButtonCancel = () => {
    // if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
    //   deleteOrderCollection.mutate(orderCollection.id);
    // }
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

  const renderUserButtons = () => {
    return (
      <>
        {order.state < OrderState.REQUESTED ? (
          <Button
            size="sm"
            startIcon={<DeleteForever />}
            title={t("Orders.OrderCollection.button.delete")}
          />
        ) : null}
        {order.state === OrderState.REQUESTED ? (
          <Button
            size="sm"
            startIcon={<CancelIcon />}
            title={t("Orders.OrderCollection.button.cancel")}
          />
        ) : null}
        {order.state < OrderState.REQUESTED ? (
          <Button
            size="sm"
            startIcon={<EditIcon />}
            to="process/model"
            title={t("Orders.OrderCollection.button.edit")}
          />
        ) : null}
        {order.state === OrderState.DRAFT ? (
          <Button
            size="sm"
            startIcon={<FactoryIcon />}
            to="checkout"
            title={t("Orders.OrderCollection.button.manufacturer")}
          />
        ) : null}
        {order.state === OrderState.MANUFACTURER_SELECTED ? (
          <Button
            size="sm"
            startIcon={<PolicyIcon />}
            to="checkout"
            title={t("Orders.OrderCollection.button.verified")}
          />
        ) : null}
        {order.state === OrderState.VERIFIED ? (
          <Button
            size="sm"
            startIcon={<SendIcon />}
            to="checkout"
            title={t("Orders.OrderCollection.button.request")}
          />
        ) : null}
        {order.state === OrderState.COMPLETED ? (
          <Button
            size="sm"
            startIcon={<ReplayIcon />}
            onClick={handleOnClickButtonReOrder}
            title={t("Orders.OrderCollection.button.reOrder")}
          />
        ) : null}
      </>
    );
  };

  const renderOrganizationButtons = () => {
    return (
      <>
        {order.state === OrderState.REQUESTED ? (
          <Button
            size="sm"
            startIcon={<CheckIcon />}
            onClick={handleOnClickButtonConfirm}
            title={t("Orders.OrderCollection.button.confirm")}
          />
        ) : null}
        {order.state === OrderState.REQUESTED ||
        order.state === OrderState.CLARIFICATION ? (
          <>
            <Button
              size="sm"
              startIcon={<CancelIcon />}
              onClick={handleOnClickButtonReject}
              title={t("Orders.OrderCollection.button.reject")}
            />
            <Button
              size="sm"
              startIcon={<QuestionMarkIcon />}
              onClick={handleOnClickButtonVerify}
              title={t("Orders.OrderCollection.button.verify")}
            />
          </>
        ) : null}
      </>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {user === undefined ? renderUserButtons() : null}
      {user !== undefined && user.usertype === UserType.USER
        ? renderUserButtons()
        : null}
      {user !== undefined && user.usertype === UserType.ORGANIZATION
        ? renderOrganizationButtons()
        : null}
    </div>
  );
};

export default OrderButtons;
