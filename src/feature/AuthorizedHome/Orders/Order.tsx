import React from "react";
import { IOrder } from "../../../interface/Interface";

interface Props {
  order: IOrder;
}

const Order = ({ order }: Props) => {
  return (
    <li className="order-list-item">
      <ul className="order">
        <section>
          <h2>Bestellung: {order.orderId}</h2>
          <h2>Datum: {new Date().getDate()}</h2>
          <h2>Status: {order.orderState}</h2>
        </section>
      </ul>
    </li>
  );
};

export default Order;
