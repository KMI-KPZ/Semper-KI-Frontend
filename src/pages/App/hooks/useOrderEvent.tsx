import {
  DeleteOrderEvent,
  Event,
  OrderEvent,
  OrderEventItem,
} from "@/hooks/useUser/types";
import { splitArray, splitFindArray } from "@/services/utils";
import { Dispatch, SetStateAction } from "react";
import { AppState } from "..";

const addOrderEventItemMessages = (
  oldEvent: OrderEventItem | undefined,
  newEvent: OrderEventItem | undefined
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
const addOrderEventItemStatus = (
  oldEvent: OrderEventItem | undefined,
  newEvent: OrderEventItem | undefined
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
    console.log("useOrderEvent | hydrateOrderEvents", events, newOrderEvent);
    const noneOrderEvents: Event[] = events.filter(
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
    console.log("useOrderEvent | deleteOrderEvent", event);
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
          messages: type === "message" ? undefined : orderEventItem.messages,
          status: type === "status" ? undefined : orderEventItem.status,
        };
        if (
          orderEventItem.messages === undefined &&
          orderEventItem.status === undefined
        ) {
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
