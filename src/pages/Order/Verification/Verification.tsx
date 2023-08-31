import React, { useEffect, useState } from "react";
import useVerification from "./hooks/useVerification";
import SubOrderVerificationItem from "./components/Item";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import useSubOrder, {
  SubOrderProps,
} from "@/pages/Order/SubOrder/hooks/useSubOrder";
import { OrderState, useOrder } from "@/pages/Order/hooks/useOrder";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import { queryByTestId } from "@testing-library/react";

interface Props {}
export interface VerifyFormData {
  suborders: { suborder: SubOrderProps; checked: boolean }[];
}

const SubOrderVerification: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { verifyOrder } = useVerification();

  const { orderQuery } = useOrder();
  const subOrders: SubOrderProps[] =
    orderQuery.data === undefined
      ? []
      : orderQuery.data.subOrders.filter(
          (suborder) => suborder.state === OrderState.CONTRACTOR_SELECTED
        );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    defaultValues: async () => ({
      suborders: subOrders.map((suborder) => ({ suborder, checked: true })),
    }),
  });

  const navigate = useNavigate();

  const handleOnClickButtonVerify = (data: VerifyFormData) => {
    if (orderQuery.data !== undefined) {
      verifyOrder.mutate({
        orderID: orderQuery.data.orderID,
        suborderIDs: data.suborders
          .filter((suborder) => suborder.checked === true)
          .map((subOrder) => subOrder.suborder.subOrderID),
        send: false,
      });
    }
  };

  const handleOnClickButtonRequest = (data: VerifyFormData) => {
    if (orderQuery.data !== undefined) {
      verifyOrder.mutate({
        orderID: orderQuery.data.orderID,
        suborderIDs: data.suborders
          .filter((suborder) => suborder.checked === true)
          .map((subOrder) => subOrder.suborder.subOrderID),
        send: true,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Heading variant="h1">
        {t("AfterProcess.Checkout.Checkout.title")}
      </Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 md:flex-row">
        <Button
          onClick={handleSubmit(handleOnClickButtonVerify)}
          endIcon={<AssignmentTurnedInIcon fontSize="large" />}
          title={t("AfterProcess.Checkout.Checkout.button.verify")}
        />
        <Button
          onClick={handleSubmit(handleOnClickButtonRequest)}
          endIcon={<ScheduleSendIcon fontSize="large" />}
          title={t("AfterProcess.Checkout.Checkout.button.request")}
        />
      </div>

      <div
        className="flex w-full flex-col items-center justify-center gap-5
      gap-y-3 sm:flex-row sm:flex-wrap sm:items-start"
      >
        {subOrders.length > 0 ? (
          subOrders.map((item, index) => (
            <SubOrderVerificationItem
              key={index}
              suborder={item}
              register={register}
              index={index}
            />
          ))
        ) : (
          <Heading variant="h2">
            {t("AfterProcess.Checkout.Checkout.error.no-items")}
          </Heading>
        )}
      </div>
    </div>
  );
};

export default SubOrderVerification;
