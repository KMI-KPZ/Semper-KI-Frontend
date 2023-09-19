import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SubOrder from "./SubOrder/SubOrder";
import { UserProps, UserType } from "@/hooks/useUser/types";
import { OrderEvent, OrderEventItem } from "@/pages/App/types";
import { Heading, Text } from "@component-library/Typography";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  LoadingAnimation,
  LoadingSuspense,
} from "@component-library/index";
import OrderButtons from "./components/Buttons";
import { OrderProps, OrderState, useOrder } from "./hooks/useOrder";
import Container from "@component-library/Container";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import AddIcon from "@mui/icons-material/Add";
import useSubOrder from "./SubOrder/hooks/useSubOrder";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderTitleForm from "./components/TitleForm";
import InfoIcon from "@mui/icons-material/Info";
import OrderInfo from "./components/Info";
import Modal from "@component-library/Modal";
import useCheckedSubOrders from "./hooks/useCheckedSubOrders";

interface Props {
  user: UserProps | undefined;
  event?: OrderEvent;
}

const Order: React.FC<Props> = (props) => {
  const { user, event: orderCollectionEvent } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderQuery, deleteOrder, updateOrder } = useOrder();
  const { createSubOrder } = useSubOrder();
  const {
    checkedSubOrders,
    handleOnChangeCheckboxSelect,
    handleOnChangeCheckboxSelectAll,
  } = useCheckedSubOrders(orderQuery.data);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const order: OrderProps | undefined = orderQuery.data;

  const handleOnClickDelete = () => {
    if (
      window.confirm(t("Orders.OrderCollection.confirm.delete")) &&
      order !== undefined
    ) {
      deleteOrder.mutate(order.orderID, {
        onSuccess: () => navigate("/orders"),
      });
    }
  };

  const onButtonClickCreateSubOrder = () => {
    createSubOrder.mutate();
  };

  const getOrderEventItemByID = (
    orderID: string
  ): OrderEventItem | undefined => {
    if (
      orderCollectionEvent === undefined ||
      orderCollectionEvent.subOrders.length < 1
    )
      return undefined;
    return orderCollectionEvent.subOrders.find(
      (orderEvent) => orderEvent.subOrderID === orderID
    );
  };

  const updateOrderTitle = (title: string) => {
    if (order === undefined) return;
    updateOrder.mutate({
      changes: {
        details: {
          title,
        },
      },
    });
  };

  const handleOnClickButtonInfo = () => {
    setInfoOpen(true);
  };

  const closeInfo = () => {
    setInfoOpen(false);
  };

  return (
    <LoadingSuspense query={orderQuery}>
      {order === undefined ||
      (order !== undefined && order.orderID === undefined) ? (
        <LoadingAnimation />
      ) : (
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Container width="full" justify="between">
            <Container direction="col" align="start">
              <OrderTitleForm
                headerType="h1"
                title={
                  order.details.title === undefined
                    ? t("Orders.OrderCollection.title")
                    : order.details.title
                }
                updateTitle={updateOrderTitle}
              />
            </Container>
            <Text variant="body">
              {t("Orders.OrderCollection.state.title")}
              {": "}
              {t(`Orders.OrderCollection.state.${OrderState[order.state]}`)}
            </Text>
            <Container direction="row" wrap="wrap">
              <Button
                variant="icon"
                width="fit"
                size="sm"
                children={<InfoIcon />}
                onClick={handleOnClickButtonInfo}
                title={t("Orders.OrderView.button.info")}
              />
              <PermissionGate element={"OrderButtonDelete"}>
                <Button
                  width="fit"
                  variant="icon"
                  size="sm"
                  children={<DeleteIcon />}
                  title={t("Orders.OrderCollection.button.delete")}
                  onClick={handleOnClickDelete}
                />
              </PermissionGate>
            </Container>
          </Container>
          <Divider />
          <Container width="full" justify="between">
            <Heading variant="h2">
              {t("Orders.OrderCollection.subOrders")}
              {":"}
            </Heading>
            <PermissionGate element={"OrderButtonNew"}>
              <Button
                width="fit"
                variant="icon"
                size="sm"
                startIcon={<AddIcon />}
                onClick={onButtonClickCreateSubOrder}
                title={t("Orders.OrderCollection.button.new")}
              />
            </PermissionGate>
          </Container>
          {order.subOrders.length > 0 ? (
            <Container justify="between" width="full">
              <Container direction="row" wrap="wrap">
                <label className="flex flex-row items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="h-8 w-8"
                    onChange={handleOnChangeCheckboxSelectAll}
                    checked={checkedSubOrders.length === order.subOrders.length}
                  />
                  <Text variant="body" className="whitespace-nowrap">
                    {t("Orders.OrderCollection.selectAll")}
                  </Text>
                </label>
                {checkedSubOrders.length > 0 ? (
                  <Text variant="body" className="whitespace-nowrap">
                    {t("Orders.OrderCollection.selected", {
                      count: checkedSubOrders.length,
                    })}
                  </Text>
                ) : null}
              </Container>
              <OrderButtons
                order={order}
                user={user}
                checkedSubOrders={checkedSubOrders}
              />
            </Container>
          ) : null}
          {order.subOrders.length === 0 ? (
            <Heading variant="h2">
              {t("Orders.OrderCollection.noSubOrders")}
            </Heading>
          ) : (
            order.subOrders
              .sort((subOrderA, subOrderB) =>
                subOrderA.created < subOrderB.created ? -1 : 1
              )
              .map((subOrder, index) => (
                <SubOrder
                  key={index}
                  subOrder={subOrder}
                  orderID={order.orderID}
                  user={user}
                  orderEvent={getOrderEventItemByID(subOrder.subOrderID)}
                  checked={checkedSubOrders.includes(subOrder.subOrderID)}
                  handleOnChangeCheckboxSelect={handleOnChangeCheckboxSelect}
                />
              ))
          )}
          <Modal
            open={infoOpen}
            closeModal={closeInfo}
            className="flex w-full flex-col"
          >
            <OrderInfo order={order} />
          </Modal>
        </div>
      )}
    </LoadingSuspense>
  );
};

export default Order;
