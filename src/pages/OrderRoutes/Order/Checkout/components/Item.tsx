import { LoadingAnimation } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { IRequestState } from "../hooks/useCheckout";
import { SubOrderProps } from "@/pages/OrderRoutes/hooks/useSubOrder";
import { ServiceType } from "@/pages/OrderRoutes/Service/hooks/useService";

type Props = {
  suborder: SubOrderProps;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
};

const OrderCheckoutItem: React.FC<Props> = (props) => {
  const { suborder, logistics, price, printable } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 sm:basis-[48%] md:basis-[32%]">
      <Heading variant="h2">{ServiceType[suborder.service.type]}</Heading>
      <div className="flex w-full flex-row items-center justify-between px-5">
        <Heading variant="h3">{t("CheckoutItem.printable")}:</Heading>
        {printable.loading === true ? <LoadingAnimation text /> : null}
        {printable.loading === false &&
        printable.error === false &&
        printable.data !== "" ? (
          <Heading variant="h3">{printable.data}</Heading>
        ) : null}
        {printable.error === true ? (
          <Heading variant="h3">Fehler</Heading>
        ) : null}
        {printable.loading === false &&
        printable.error === false &&
        printable.data === ""
          ? "?"
          : null}
      </div>
      <div className="flex w-full flex-row items-center justify-between px-5">
        <Heading variant="h3">{t("CheckoutItem.logistics")}:</Heading>
        {logistics.loading === true ? <LoadingAnimation text /> : null}
        {logistics.loading === false &&
        logistics.error === false &&
        logistics.data !== "" ? (
          <Heading variant="h3">{logistics.data}</Heading>
        ) : null}
        {logistics.error === true ? (
          <Heading variant="h3">Fehler</Heading>
        ) : null}
        {logistics.loading === false &&
        logistics.error === false &&
        logistics.data === ""
          ? "?"
          : null}
      </div>
      <div className="flex w-full flex-row items-center justify-between px-5">
        <Heading variant="h3">{t("CheckoutItem.price")}:</Heading>
        {price.loading === true ? <LoadingAnimation text /> : null}
        {price.loading === false &&
        price.error === false &&
        price.data !== "" ? (
          <Heading variant="h3">{price.data}</Heading>
        ) : null}
        {price.error === true ? <Heading variant="h3">Fehler</Heading> : null}
        {price.loading === false && price.error === false && price.data === ""
          ? "?"
          : null}
      </div>
    </div>
  );
};

export default OrderCheckoutItem;
