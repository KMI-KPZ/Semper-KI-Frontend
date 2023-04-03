import React from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import OrderItem from "./OrderItem";
import { EOrderState } from "../../interface/enums";
import { useOrders } from "../../hooks/useOrders";

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
  console.log(data, isLoading, error);

  return (
    <div className="flex flex-col items-center w-full gap-5 overflow-x-scroll overflow-y-hidden p-3">
      <h1 className="bg-white w-full py-3 text-center">
        {t("orderview.headline")}
      </h1>
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
    </div>
  );
};

export default OrderOverview;
