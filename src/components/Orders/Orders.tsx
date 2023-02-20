import React from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../interface/Interface";
import Order from "./Order";
import "./Orders.scss";

interface Props {
  orderList: IOrder[];
}

const Orders: React.FC<Props> = (props) => {
  const { orderList } = props;
  const { t } = useTranslation();

  return (
    <div className="orders">
      <h1 className="orders-headline">{t("orders.headline")}</h1>
      <ul className="order-list">
        {orderList.length > 0 ? (
          orderList.map((order: IOrder, index: number) => (
            <Order order={order} key={index} />
          ))
        ) : (
          <li className="order empty">keine vorhandenen Bestellungen</li>
        )}
      </ul>
    </div>
  );
};

export default Orders;
