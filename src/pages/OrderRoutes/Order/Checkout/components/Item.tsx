import { getModelURI } from "@/services/utils";
import { LoadingAnimation } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { IRequestState } from "../hooks/useCheckout";
import { IProcessItem } from "@/pages/OrderRoutes/Service/Manufacturing/types";

type Props = {
  process: IProcessItem;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
};

const OrderCheckoutItem: React.FC<Props> = (props) => {
  const { process, logistics, price, printable } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 sm:basis-[48%] md:basis-[32%]">
      <Heading variant="h2">{process.title}</Heading>
      <img
        src={getModelURI(process.model!)}
        className="max-h-40 w-full max-w-[200px] object-cover md:max-h-80 md:max-w-xs"
      />
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
