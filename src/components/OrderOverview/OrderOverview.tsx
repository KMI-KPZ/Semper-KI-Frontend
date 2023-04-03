import React from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import OrderItem from "./OrderItem";
import { EOrderState } from "../../interface/enums";
import { useOrders } from "../../hooks/useOrders";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { IconX } from "../../config/Icons";

interface Props {}

const testOrders: IOrder[] = [
  {
    date: new Date(),
    orderState: EOrderState.requested,
    processList: [],
    bill: undefined,
    orderId: 0,
  },
];

const OrderOverview: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useOrders();

  return (
    <div className="flex flex-col items-center w-full gap-5 overflow-x-auto overflow-y-hidden p-3">
      <h1 className="bg-white w-full py-3 text-center">
        {t("orderview.headline")}
      </h1>
      {isLoading ? (
        <div className="flex flex-col gap-5 justify-center items-center bg-white w-full h-full p-5">
          <h2 className="text-5xl">Laden</h2>
          <LoadingAnimation />
        </div>
      ) : null}
      {error ? (
        <div className="flex flex-col gap-5 justify-center items-center bg-white w-full h-full p-5">
          <h2 className="text-5xl">Fehler</h2>
          <h3 className="text-4xl">{error.message}</h3>
          <img src={IconX} />
        </div>
      ) : null}
      {!isLoading && !error && data ? (
        <ul className="w-full gap-5 flex flex-col">
          {testOrders.length > 0 ? (
            testOrders.map((order: IOrder, index: number) => (
              <OrderItem order={order} key={index} />
            ))
          ) : (
            <li className="w-full text-center p-3">
              keine vorhandenen Bestellungen
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default OrderOverview;
