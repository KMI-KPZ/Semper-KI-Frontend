import React from "react";
import { IOrderCollection } from "../../interface/Interface";
import Button from "../General/Button";
import OrderView from "./OrderView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import { useOrders } from "../../hooks/useOrders";

interface Props {
  orderCollection: IOrderCollection;
}

const OrderCollection: React.FC<Props> = (props) => {
  const { orderCollection } = props;
  const { deleteOrderCollection } = useOrders();
  const handleOnClickButtonCancel = () => {
    if (window.confirm("Gesamten Auftrag wirklich stonieren?")) {
      deleteOrderCollection.mutate(orderCollection.id);
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm("Gesamten Auftrag wirklich erneut Bestellen?")) {
      console.log("//TODO ReOrder");
    }
  };

  return (
    <div className="flex flex-col justify-start items-start bg-white w-full gap-5 p-5">
      <div className="flex flex-col md:flex-row w-full gap-5 items-start md:items-center justify-start md:justify-between">
        <h2 className="break-words">Id: {orderCollection.id}</h2>
        <h2>Status: {orderCollection.state}</h2>
        <h2>Datum: {new Date(orderCollection.date).toLocaleString()}</h2>
      </div>
      {orderCollection.orders.map((order, index) => (
        <OrderView key={index} order={order} />
      ))}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
        <Button
          size="small"
          icon={<CancelIcon />}
          onClick={handleOnClickButtonCancel}
        >
          Gesamten Auftrag Stornieren
        </Button>
        <Button
          size="small"
          icon={<ReplayIcon />}
          onClick={handleOnClickButtonReOrder}
        >
          Gesamten Auftrag erneut Bestellen
        </Button>
      </div>
    </div>
  );
};

export default OrderCollection;
