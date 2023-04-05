import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import { EOrderState } from "../../interface/enums";
import { IOrdersResponse, useOrders } from "../../hooks/useOrders";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { IconX } from "../../config/Icons";
import { isKey } from "../../services/utils";
import { IProcessItem } from "../../interface/Interface";
import OrderItem from "./OrderItem";

interface Props {}

export interface IOrderTest {
  orderId: string;
  userOrders: { cart: IProcessItem[] };
  orderStatus: string;
  userCommunication: any[];
  files: any[];
  dates: { created: string; updated: string };
}

enum EOrderDataTypes {
  "userOrders",
  "orderStatus",
  "userCommunication",
  "files",
  "dates",
}

const testOrders: IOrder[] = [
  {
    date: new Date(),
    orderState: EOrderState.requested,
    processList: [],
    files: [],
    orderId: "rgehtgefwehterher",
  },
];

const OrderOverview: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useOrders();

  const getOrderDataKey = (dataTypeIndex: number) => {
    return EOrderDataTypes[dataTypeIndex].toString();
  };

  const generateOrders = (data: IOrdersResponse) => {
    let orders: IOrderTest[] = [];
    data.forEach((dataObject: object, dataTypeIndex) => {
      Object.keys(dataObject).forEach((orderId) => {
        if (orders.filter((order) => order.orderId === orderId).length === 0)
          orders.push({
            orderId: orderId,
            dates: { created: "", updated: "" },
            files: [],
            orderStatus: "",
            userCommunication: [],
            userOrders: { cart: [] },
          });
        if (isKey(dataObject, orderId)) {
          {
            let mutateOrder: IOrderTest | undefined = orders
              .filter((order) => order.orderId === orderId)
              .pop();
            if (mutateOrder !== undefined) {
              console.log(EOrderDataTypes[dataTypeIndex], dataObject[orderId]);
              const orderKey = EOrderDataTypes[dataTypeIndex];
              if (isKey(mutateOrder, orderKey)) {
                mutateOrder[orderKey] = dataObject[orderId];
              }
              orders = [
                ...orders.filter((_order) => _order.orderId !== orderId),
                mutateOrder,
              ];
            }
          }
        }
      });
    });
    return orders;
  };

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
      {!isLoading && !error && data.length > 0 ? (
        <ul className="w-full gap-5 flex flex-col">
          {data.length > 0 ? (
            generateOrders(data).map((order: IOrderTest, index: number) => (
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
