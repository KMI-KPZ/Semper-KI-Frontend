import { OrderCollectionEvent, OrderEvent } from "@/hooks/useUser/types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AppState } from "..";
import useMissedEvent from "./useMissedEvent";
import { useWebsocket } from "./useWebsocket";

interface ReturnProps {
  hydrateEvents: (
    missedEvents: OrderCollectionEvent[],
    newOrderCollectionEvent: OrderCollectionEvent
  ) => OrderCollectionEvent[];
  deleteEvent: (
    orderCollectionID: string,
    orderID: string,
    type: "message" | "status"
  ) => void;
}

const useEvents = (
  setState: Dispatch<SetStateAction<AppState>>,
  isLoggedIn: boolean
): ReturnProps => {
  const { initialMissedEvents } = useMissedEvent({
    isLoggedIn,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialMissedEvents.length > 0)
      setState((prevState) => ({
        ...prevState,
        missedEvents: initialMissedEvents,
      }));
  }, [initialMissedEvents]);

  const onWebsocktEvent = (event: MessageEvent) => {
    console.log("useEvent | onWebsocktEvent ", event);

    if (event.data !== undefined) {
      const newOrderCollectionEvent: OrderCollectionEvent = JSON.parse(
        event.data
      );
      if (newOrderCollectionEvent) {
        setState((prevState) => ({
          ...prevState,
          missedEvents: hydrateEvents(
            prevState.missedEvents,
            newOrderCollectionEvent
          ),
        }));
        queryClient.invalidateQueries(["orders"]);
      }
    }
  };

  const {
    sendMessage,
    socket: websocket,
    state: webSocketState,
  } = useWebsocket(onWebsocktEvent, isLoggedIn);

  const getEventMessagesNumber = (
    oldEvent: OrderEvent | undefined,
    newEvent: OrderEvent | undefined
  ): number | undefined => {
    if (oldEvent === undefined && newEvent === undefined) return undefined;
    if (
      oldEvent === undefined &&
      newEvent !== undefined &&
      newEvent.messages !== undefined
    )
      return newEvent.messages > 0 ? newEvent.messages : undefined;
    if (
      newEvent === undefined &&
      oldEvent !== undefined &&
      oldEvent.messages !== undefined
    )
      return oldEvent.messages > 0 ? oldEvent.messages : undefined;
    if (
      oldEvent !== undefined &&
      newEvent !== undefined &&
      oldEvent.messages !== undefined &&
      newEvent.messages !== undefined
    ) {
      const result = oldEvent.messages + newEvent.messages;
      return result > 0 ? result : undefined;
    }

    return undefined;
  };

  const getEventStatusNumber = (
    oldEvent: OrderEvent | undefined,
    newEvent: OrderEvent | undefined
  ): number | undefined => {
    if (oldEvent === undefined && newEvent === undefined) return undefined;
    if (
      oldEvent === undefined &&
      newEvent !== undefined &&
      newEvent.status !== undefined
    )
      return newEvent.status > 0 ? newEvent.status : undefined;
    if (
      newEvent === undefined &&
      oldEvent !== undefined &&
      oldEvent.status !== undefined
    )
      return oldEvent.status > 0 ? oldEvent.status : undefined;
    if (
      oldEvent !== undefined &&
      newEvent !== undefined &&
      oldEvent.status !== undefined &&
      newEvent.status !== undefined
    ) {
      const result = oldEvent.status + newEvent.status;
      return result > 0 ? result : undefined;
    }

    return undefined;
  };

  const hydrateEvents = (
    missedEvents: OrderCollectionEvent[],
    newOrderCollectionEvent: OrderCollectionEvent
  ): OrderCollectionEvent[] => {
    const newOrderEvent = newOrderCollectionEvent.orders[0];
    const existingOrderCollecetionIDs: string[] = [];
    const existingOrderIDs: string[] = [];
    missedEvents.forEach((orderCollectionEvent) => {
      existingOrderCollecetionIDs.push(orderCollectionEvent.orderCollectionID);
      orderCollectionEvent.orders.forEach((orderEvent) => {
        existingOrderIDs.push(orderEvent.orderID);
      });
    });

    let hydratedMissedEvents = missedEvents;
    if (
      existingOrderCollecetionIDs.includes(
        newOrderCollectionEvent.orderCollectionID
      ) &&
      existingOrderIDs.includes(newOrderEvent.orderID)
    ) {
      const existingOrderCollectionEventsWithoutNew =
        hydratedMissedEvents.filter(
          (orderCollectionEvent) =>
            orderCollectionEvent.orderCollectionID !==
            newOrderCollectionEvent.orderCollectionID
        );
      const existingOrderCollectionEventNew = hydratedMissedEvents.find(
        (orderCollectionEvent) =>
          orderCollectionEvent.orderCollectionID ===
          newOrderCollectionEvent.orderCollectionID
      )!;
      const existingOrderEventNew = existingOrderCollectionEventNew.orders.find(
        (orderEvent) => orderEvent.orderID === newOrderEvent.orderID
      )!;
      hydratedMissedEvents = [
        ...existingOrderCollectionEventsWithoutNew,
        {
          orderCollectionID: newOrderCollectionEvent.orderCollectionID,
          orders: [
            ...existingOrderCollectionEventNew.orders.filter(
              (orderEvent) => orderEvent.orderID !== newOrderEvent.orderID
            ),
            {
              orderID: newOrderEvent.orderID,
              messages: getEventMessagesNumber(
                existingOrderEventNew,
                newOrderEvent
              ),
              status: getEventStatusNumber(
                existingOrderEventNew,
                newOrderEvent
              ),
            },
          ],
        },
      ];
    } else {
      hydratedMissedEvents.push(newOrderCollectionEvent);
    }
    return hydratedMissedEvents;
  };

  const deleteEvent = (
    orderCollectionID: string,
    orderID: string,
    type: "message" | "status"
  ) => {
    // console.log("deleteEvent", orderCollectionID, orderID, type);
    setState((prevState) => {
      const existingOrderCollectionEvent: OrderCollectionEvent | undefined =
        prevState.missedEvents.find(
          (event) => event.orderCollectionID === orderCollectionID
        );

      if (
        existingOrderCollectionEvent !== undefined &&
        existingOrderCollectionEvent.orders.length > 0
      ) {
        const existingOrderEvents: OrderEvent[] =
          existingOrderCollectionEvent.orders;
        const editedOrderEvents = existingOrderEvents.map(
          (orderEvent): OrderEvent => {
            return {
              orderID: orderEvent.orderID,
              messages:
                orderEvent.orderID === orderID && type === "message"
                  ? undefined
                  : orderEvent.messages,
              status:
                orderEvent.orderID === orderID && type === "status"
                  ? undefined
                  : orderEvent.status,
            };
          }
        );
        const editedOrderCollectionEvent: OrderCollectionEvent = {
          orderCollectionID: existingOrderCollectionEvent.orderCollectionID,
          orders: editedOrderEvents.filter(
            (orderEvent) =>
              orderEvent.messages !== undefined ||
              orderEvent.status !== undefined
          ),
        };
        const missedEventsWithout = prevState.missedEvents.filter(
          (orderCollectionEvent) =>
            orderCollectionEvent.orderCollectionID !== orderCollectionID
        );
        const missedEventsWith =
          missedEventsWithout.length > 0
            ? [...missedEventsWithout, editedOrderCollectionEvent]
            : [editedOrderCollectionEvent];
        return {
          ...prevState,
          missedEvents: missedEventsWith,
        };
      } else {
        const newMissedEvents = prevState.missedEvents.filter(
          (orderCollectionEvent) =>
            orderCollectionEvent.orderCollectionID !== orderCollectionID
        );
        return {
          ...prevState,
          missedEvents: newMissedEvents.length > 0 ? newMissedEvents : [],
        };
      }
    });
  };

  return { hydrateEvents, deleteEvent };
};

export default useEvents;
