import { Button } from "@mui/material";
import React from "react";
import { IManufacturer, IOrder, IProcess } from "../../interface/Interface";

interface Props {
  order: IOrder;
}

const Order: React.FC<Props> = (props) => {
  const { order } = props;
  const calcManufacturer = (): IManufacturer[] => {
    let manufacturerList: IManufacturer[] = [];
    order.processList.forEach((process: IProcess) => {
      const manufacturer = process.manufacturer;
      if (manufacturer !== undefined) {
        manufacturerList.push(manufacturer);
      }
    });
    return manufacturerList;
  };

  const manufacturerList = calcManufacturer();

  return (
    <li className="order">
      <section className="order-section header">
        <h2>Bestellung: {order.orderId}</h2>
        <h2>Datum: {new Date().getDate()}</h2>
        <h2>Status: {order.orderState}</h2>
      </section>
      <hr />
      <section className="order-section models">
        <h2>Artikel : {order.processList.length}</h2>
        <div className="order-process-list">
          {order.processList.map((process: IProcess, index: number) => (
            <div key={index} className="order-process-item">
              <img
                className="order-process-item-img"
                src={require("../../assets/images/model_placeholder.png")}
                alt="Model"
              />
              {process.model === undefined
                ? index
                : process.model.name === undefined
                ? "process.model.name"
                : process.model.name}
            </div>
          ))}
        </div>
      </section>
      <hr />
      <section className="order-section manufacturer">
        <h2>Hersteller: {manufacturerList.length}</h2>
        <div className="order-manufacturer-list">
          {manufacturerList.map(
            (manufacturer: IManufacturer, index: number) => (
              <div key={index} className="order-manufacturer-item">
                <img
                  className="order-manufacturer-item-img"
                  src={require("../../assets/images/firm_logo_placeholder.png")}
                  alt="Model"
                />
                {manufacturer.name}
              </div>
            )
          )}
        </div>
      </section>
      <hr />
      <section className="order-section buttons">
        <Button variant="contained">Auftrag Stonieren</Button>
        <Button variant="contained">Nachrichten</Button>
        <Button variant="contained">Auftrag nochmal bestellen</Button>
      </section>
    </li>
  );
};

export default Order;
