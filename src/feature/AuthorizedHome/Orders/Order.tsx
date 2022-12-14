import React from "react";
import { IManufacturer, IOrder, IProcess } from "../../../interface/Interface";

interface Props {
  order: IOrder;
}

const Order = ({ order }: Props) => {
  // const calcManufacturer = (): IManufacturer[] => {
  //   let manufacturerList: IManufacturer[] = [];
  //   order.processList.forEach((process: IProcess) => {
  //     const manufacturer = process.manufacturer;
  //     if (manufacturer !== undefined) {
  //       if (manufacturerList.find(manufacturer) !== undefined) {
  //         manufacturerList.push(manufacturer);
  //       }
  //     }
  //   });
  //   return manufacturerList;
  // };

  return (
    <li className="order">
      <section className="order-section header">
        <h2>Bestellung: {order.orderId}</h2>
        <h2>Datum: {new Date().getDate()}</h2>
        <h2>Status: {order.orderState}</h2>
      </section>
      <section>
        <h2>Artikel : {order.processList.length}</h2>
        <hr />
      </section>
      <section>
        <h2>Hersteller: {}</h2>
      </section>
    </li>
  );
};

export default Order;
