import { getModelURI } from "@/services/utils";
import { LoadingAnimation } from "@component-library/Loading";
import React from "react";
import { useTranslation } from "react-i18next";
import { IProcessItem } from "../..";
import { IRequestState } from "../hooks/useCheckout";

type Props = {
  process: IProcessItem;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
};

const CheckoutItem: React.FC<Props> = (props) => {
  const { process, logistics, price, printable } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-white p-2 sm:basis-[48%] md:basis-[32%]">
      <h2 className="text-center">{process.title}</h2>
      <img
        src={getModelURI(process.model!)}
        className="max-h-40 w-full max-w-[200px] object-cover md:max-h-80 md:max-w-xs"
      />
      <div className="flex w-full flex-row items-center justify-between px-5">
        <h3>{t("CheckoutItem.printable")}:</h3>
        {printable.loading === true ? <LoadingAnimation text /> : null}
        {printable.loading === false &&
        printable.error === false &&
        printable.data !== "" ? (
          <h3>{printable.data}</h3>
        ) : null}
        {printable.error === true ? <h3>Fehler</h3> : null}
        {printable.loading === false &&
        printable.error === false &&
        printable.data === ""
          ? "?"
          : null}
      </div>
      <div className="flex w-full flex-row items-center justify-between px-5">
        <h3>{t("CheckoutItem.logistics")}:</h3>
        {logistics.loading === true ? <LoadingAnimation text /> : null}
        {logistics.loading === false &&
        logistics.error === false &&
        logistics.data !== "" ? (
          <h3>{logistics.data}</h3>
        ) : null}
        {logistics.error === true ? <h3>Fehler</h3> : null}
        {logistics.loading === false &&
        logistics.error === false &&
        logistics.data === ""
          ? "?"
          : null}
      </div>
      <div className="flex w-full flex-row items-center justify-between px-5">
        <h3>{t("CheckoutItem.price")}:</h3>
        {price.loading === true ? <LoadingAnimation text /> : null}
        {price.loading === false &&
        price.error === false &&
        price.data !== "" ? (
          <h3>{price.data}</h3>
        ) : null}
        {price.error === true ? <h3>Fehler</h3> : null}
        {price.loading === false && price.error === false && price.data === ""
          ? "?"
          : null}
      </div>
    </div>
  );
};

export default CheckoutItem;
