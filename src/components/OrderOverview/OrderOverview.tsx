import React from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import OrderItem from "./OrderItem";

interface Props {
  orderList: IOrder[];
}

const OrderOverview: React.FC<Props> = (props) => {
  const { orderList } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center w-full gap-5 overflow-x-scroll overflow-y-hidden p-3">
      <h1 className="bg-white w-full py-3 text-center">
        {t("orders.headline")}
      </h1>
      <ul className="w-full gap-5 flex flex-col">
        {orderList.length > 0 ? (
          orderList.map((order: IOrder, index: number) => (
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
