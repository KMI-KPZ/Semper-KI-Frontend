import { AppContext } from "@/pages/App/App";
import { DeleteOrderEvent, Event } from "@/pages/App/types";
import { useContext, useEffect } from "react";
import { SubOrder } from "./useOrders";

interface ReturnProps {
  getDeleteOrderEvent: (type: "status" | "message") => Event;
}

const useOrderEventChange = (
  subOrder: SubOrder,
  orderCollectionID: string,
  chatOpen: boolean
): ReturnProps => {
  const { deleteEvent } = useContext(AppContext);

  const getDeleteOrderEvent = (type: "status" | "message"): Event => {
    const deleteOrderEvent: DeleteOrderEvent = {
      eventType: "orderEvent",
      orderCollectionID: orderCollectionID,
      orderID: subOrder.id,
      type: type,
    };
    return deleteOrderEvent as Event;
  };

  useEffect(() => {
    deleteEvent(getDeleteOrderEvent("status"));
    if (chatOpen) deleteEvent(getDeleteOrderEvent("message"));
  }, [subOrder]);

  return { getDeleteOrderEvent };
};

export default useOrderEventChange;
