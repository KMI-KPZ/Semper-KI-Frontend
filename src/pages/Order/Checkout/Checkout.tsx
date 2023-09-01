import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { OrderState, useOrder } from "../hooks/useOrder";
import { SubOrderProps } from "../SubOrder/hooks/useSubOrder";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import SendIcon from "@mui/icons-material/Send";
import useCheckout from "./hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import OrderCheckoutItem from "./components/Item";
import logger from "@/hooks/useLogger";

interface OrderCheckoutProps {}

export interface CheckoutFormData {
  suborders: { suborder: SubOrderProps; checked: boolean }[];
}

const OrderCheckout: React.FC<OrderCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { sendOrder } = useCheckout();

  const { orderQuery } = useOrder();
  const subOrders: SubOrderProps[] =
    orderQuery.data !== undefined &&
    orderQuery.data.subOrders.filter(
      (suborder) => suborder.state === OrderState.VERIFIED
    ).length > 0
      ? orderQuery.data.subOrders.filter(
          (suborder) => suborder.state === OrderState.VERIFIED
        )
      : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: async () => ({
      suborders: subOrders.map((suborder) => ({ suborder, checked: true })),
    }),
  });

  const navigate = useNavigate();

  const handleOnClickButtonSend = (data: CheckoutFormData) => {
    if (orderQuery.data !== undefined) {
      sendOrder.mutate({
        orderID: orderQuery.data.orderID,
        suborderIDs: data.suborders
          .filter((suborder) => suborder.checked === true)
          .map((subOrder) => subOrder.suborder.subOrderID),
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Heading variant="h1">{t("Checkout.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 md:flex-row">
        <Button
          onClick={handleSubmit(handleOnClickButtonSend)}
          endIcon={<SendIcon fontSize="large" />}
          title={t("Checkout.button.send")}
        />
      </div>
      <div
        className="flex w-full flex-col items-center justify-center gap-5
      gap-y-3 sm:flex-row sm:flex-wrap sm:items-start"
      >
        {subOrders.length > 0 ? (
          subOrders.map((item, index) => (
            <OrderCheckoutItem
              key={index}
              suborder={item}
              register={register}
              index={index}
            />
          ))
        ) : (
          <Heading variant="h2">{t("Checkout.error.no-items")}</Heading>
        )}
      </div>
    </div>
  );
};

export default OrderCheckout;
