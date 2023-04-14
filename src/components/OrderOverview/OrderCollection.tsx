import React from "react";
import { EOrderState } from "../../interface/enums";
import { IOrderCollection } from "../../interface/Interface";
import Button from "../General/Button";
import OrderItem from "./OrderItem";

interface Props {
  orderCollection: IOrderCollection;
}

const OrderCollection: React.FC<Props> = (props) => {
  const { orderCollection } = props;

  return (
    <div className="flex flex-col justify-start items-start bg-white w-full gap-5 p-5">
      <div className="flex flex-col md:flex-row w-full gap-5 items-start md:items-center justify-start md:justify-between">
        <h2>Id: {orderCollection.id}</h2>
        <h2>Status: {EOrderState[orderCollection.state]}</h2>
        <h2>Datum: {orderCollection.date}</h2>
      </div>
      {orderCollection.orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
        <Button active={false}>Stonieren</Button>
        <Button>Bestellung widerhohlen</Button>
      </div>
    </div>
  );
};

export default OrderCollection;
