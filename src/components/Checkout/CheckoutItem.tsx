import React, { useEffect } from "react";
import { IconX } from "../../config/Icons";
import useCheckout, { IRequestState } from "../../hooks/useCheckout";
import { IProcessItem } from "../../interface/Interface";
import { getModelURI } from "../../services/utils";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

type Props = {
  process: IProcessItem;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
};

const CheckoutItem: React.FC<Props> = (props) => {
  const { process, logistics, price, printable } = props;

  return (
    <div className="flex flex-col bg-white gap-2 p-2 w-full sm:basis-[48%] md:basis-[32%] justify-center items-center">
      <h2 className="text-center">{process.title}</h2>
      <img
        src={getModelURI(process.model!)}
        className="w-full max-h-40 object-cover max-w-[200px] md:max-h-80 md:max-w-xs"
      />
      <div className="flex flex-row w-full justify-between items-center px-5">
        <h3>Druckbar:</h3>
        {printable.loading === true ? <LoadingAnimation /> : null}
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
      <div className="flex flex-row w-full justify-between items-center px-5">
        <h3>Preis:</h3>
        {logistics.loading === true ? <LoadingAnimation /> : null}
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
      <div className="flex flex-row w-full justify-between items-center px-5">
        <h3>Lieferzeit:</h3>
        {price.loading === true ? <LoadingAnimation /> : null}
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
