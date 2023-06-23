import {
  DeleteOrderEvent,
  Event,
  OrderEvent,
  OrderEventItem,
  OrderEventType,
} from "@/pages/App/types";
import { splitArray, splitFindArray } from "@/services/utils";
import { Dispatch, SetStateAction } from "react";
import { AppState } from "..";

const addOrderEventItemMessages = (
  oldEvent: OrderEventItem | undefined,
  newEvent: OrderEventItem | undefined
): number => {
  if (oldEvent === undefined && newEvent === undefined) return 0;
  if (oldEvent === undefined && newEvent !== undefined)
    return newEvent.messages;
  if (newEvent === undefined && oldEvent !== undefined)
    return oldEvent.messages;
  if (oldEvent !== undefined && newEvent !== undefined) {
    return oldEvent.messages + newEvent.messages;
  }
  return 0;
};
const addOrderEventItemStatus = (
  oldEvent: OrderEventItem | undefined,
  newEvent: OrderEventItem | undefined
): number => {
  if (oldEvent === undefined && newEvent === undefined) return 0;
  if (oldEvent === undefined && newEvent !== undefined) return newEvent.status;
  if (newEvent === undefined && oldEvent !== undefined) return oldEvent.status;
  if (oldEvent !== undefined && newEvent !== undefined) {
    return oldEvent.status + newEvent.status;
  }

  return 0;
};
const getExistingOrderEvent = (
  orderEvents: OrderEvent[],
  newOrderEvent: OrderEvent
): OrderEvent | undefined => {
  return orderEvents.find(
    (orderEvent) =>
      orderEvent.orderCollectionID === newOrderEvent.orderCollectionID
  );
};
const getOrderEventItemIDs = (orderEventItems: OrderEventItem[]): string[] => {
  return orderEventItems.map((orderEventItem) => orderEventItem.orderID);
};
const hydrateOrderEventItems = (
  existingOrderEvent: OrderEvent | undefined,
  newOrderEventItems: OrderEventItem[]
): OrderEventItem[] => {
  if (existingOrderEvent === undefined) return newOrderEventItems;
  const newItemIDs = getOrderEventItemIDs(newOrderEventItems);
  const existingItemIDs = getOrderEventItemIDs(existingOrderEvent.orders);
  const existingUntouchedItems: OrderEventItem[] =
    existingOrderEvent.orders.filter(
      (orderEventItem) => !newItemIDs.includes(orderEventItem.orderID)
    );
  const existingItems: OrderEventItem[] = existingOrderEvent.orders.filter(
    (orderEventItem) => newItemIDs.includes(orderEventItem.orderID)
  );
  const hydratedExistingItems = existingItems.map((existingOrderEventItem) => {
    const newItem = newOrderEventItems.find(
      (newOrderEventItem) =>
        newOrderEventItem.orderID === existingOrderEventItem.orderID
    );
    return {
      ...existingOrderEventItem,
      messages: addOrderEventItemMessages(existingOrderEventItem, newItem),
      status: addOrderEventItemStatus(existingOrderEventItem, newItem),
    };
  });
  const newUntouchedItems = newOrderEventItems.filter(
    (newOrderEventItem) => !existingItemIDs.includes(newOrderEventItem.orderID)
  );

  return [
    ...existingUntouchedItems,
    ...hydratedExistingItems,
    ...newUntouchedItems,
  ];
};

interface ReturnProps {
  hydrateOrderEvents: (events: Event[], newOrderEvent: OrderEvent) => Event[];
  deleteOrderEvent: (event: DeleteOrderEvent) => void;
}

const useOrderEvent = (
  setState: Dispatch<SetStateAction<AppState>>
): ReturnProps => {
  const hydrateOrderEvents = (
    events: Event[],
    newOrderEvent: OrderEvent
  ): Event[] => {
    const noneOrderEvents = events.filter(
      (event) => event.eventType !== "orderEvent"
    );
    const orderEvents: OrderEvent[] = events.filter(
      (event) => event.eventType === "orderEvent"
    ) as OrderEvent[];

    const existingOrderEvent = getExistingOrderEvent(
      orderEvents,
      newOrderEvent
    );
    const hydatedOrderEventItems = hydrateOrderEventItems(
      existingOrderEvent,
      newOrderEvent.orders
    );

    const newOrderEvents: OrderEvent[] = [
      ...orderEvents.filter(
        (orderEvent) =>
          orderEvent.orderCollectionID !== newOrderEvent.orderCollectionID
      ),
      existingOrderEvent === undefined
        ? newOrderEvent
        : {
            ...existingOrderEvent,
            orders: hydatedOrderEventItems,
          },
    ];
    return [...noneOrderEvents, ...newOrderEvents];
  };

  const deleteOrderEvent = (event: DeleteOrderEvent) => {
    // console.log("useOrderEvent | deleteOrderEvent", event);
    const { orderCollectionID, orderID, type } = event;
    setState((prevState) => {
      const { arrayTrue: _orderEvents, arrayFalse: otherEvents } = splitArray(
        prevState.missedEvents,
        (event) => event.eventType === "orderEvent"
      );
      const orderEvents = _orderEvents as OrderEvent[];
      const { otherArray: otherOrderEvents, item: orderEvent } = splitFindArray(
        orderEvents,
        (orderEvent) => orderEvent.orderCollectionID === orderCollectionID
      );
      let newOrderEventItems: OrderEventItem[] = [];
      let orderEventItem: OrderEventItem | undefined = undefined;
      if (orderEvent !== undefined) {
        const { otherArray: _otherOrderEventItems, item: _orderEventItem } =
          splitFindArray(
            orderEvent.orders,
            (orderEventItem) => orderEventItem.orderID === orderID
          );
        newOrderEventItems = _otherOrderEventItems;
        orderEventItem = _orderEventItem;
      }
      if (orderEventItem !== undefined) {
        orderEventItem = {
          ...orderEventItem,
          messages: type === "message" ? 0 : orderEventItem.messages,
          status: type === "status" ? 0 : orderEventItem.status,
        };
        if (orderEventItem.messages === 0 && orderEventItem.status === 0) {
          orderEventItem = undefined;
        } else {
          newOrderEventItems.push(orderEventItem);
        }
      }

      return {
        ...prevState,
        missedEvents:
          orderEvent !== undefined && newOrderEventItems.length > 0
            ? [
                ...otherEvents,
                ...otherOrderEvents,
                {
                  ...orderEvent,
                  orders: newOrderEventItems,
                },
              ]
            : [...otherEvents, ...otherOrderEvents],
      };
    });
  };

  return { hydrateOrderEvents, deleteOrderEvent };
};

export default useOrderEvent;
