import {
  DeleteEvent,
  DeleteOrderEvent,
  DeleteOrgaEvent,
  Event,
  OrderEvent,
  OrderEventItem,
  OrderEventType,
  OrgaEvent,
} from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AppState } from "..";
import useMissedEvent from "./useMissedEvent";
import useOrderEvent from "./useOrderEvent";
import useOrgaEvent from "./useOrgaEvent";
import { useWebsocket } from "./useWebsocket";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  hydrateEvents: (
    missedEvents: Event[],
    newOrderCollectionEvent: Event
  ) => Event[];
  deleteEvent: (event: DeleteEvent) => void;
}

export const getOrderEventAmount = (
  events: Event[] | undefined,
  type?: OrderEventType
) => {
  if (events === undefined) return undefined;
  let count = 0;
  events
    .filter((event) => event.eventType === "orderEvent")
    .forEach((_orderEvent) => {
      const orderEvent = _orderEvent as OrderEvent;
      orderEvent.orders.forEach((orderEvent) => {
        if (
          orderEvent.messages !== undefined &&
          orderEvent.messages > 0 &&
          (type === "message" || type === undefined)
        )
          count += orderEvent.messages;
        if (
          orderEvent.status !== undefined &&
          orderEvent.status > 0 &&
          (type === "status" || type === undefined)
        )
          count += orderEvent.status;
      });
    });
  return count > 0 ? count : undefined;
};

const useEvents = (
  setState: Dispatch<SetStateAction<AppState>>,
  isLoggedIn: boolean
): ReturnProps => {
  const queryClient = useQueryClient();
  const { hydrateOrderEvents, deleteOrderEvent } = useOrderEvent(setState);
  const { hydrateOrgaEvents, deleteOrgaEvent } = useOrgaEvent();

  const onLoadMissedEvents = (missedEvents: Event[]) => {
    if (missedEvents.length > 0) {
      setState((prevState) => ({
        ...prevState,
        missedEvents: missedEvents,
      }));
    }
  };

  useMissedEvent({
    isLoggedIn,
    onLoadMissedEvents,
  });

  const invalidateQueries = (event: Event) => {
    switch (event.eventType) {
      case "orderEvent":
        queryClient.invalidateQueries(["orders"]);
        break;
      case "orgaEvent":
        queryClient.invalidateQueries(["organizations"]);
        break;
    }
  };

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined) {
      const newEvent: Event = JSON.parse(event.data);
      // logger("useEvent | onWebsocktEvent ", newEvent);
      if (newEvent) {
        setState((prevState) => {
          return {
            ...prevState,
            missedEvents: hydrateEvents(prevState.missedEvents, newEvent),
          };
        });
        invalidateQueries(newEvent);
      }
    }
  };

  useWebsocket(onWebsocktEvent, isLoggedIn);

  const hydrateEvents = (events: Event[], newEvent: Event): Event[] => {
    switch (newEvent.eventType) {
      case "orderEvent":
        return hydrateOrderEvents(events, newEvent as OrderEvent);
      case "orgaEvent":
        return hydrateOrgaEvents(events, newEvent as OrgaEvent);
    }
  };

  const deleteEvent = (event: DeleteEvent) => {
    switch (event.eventType) {
      case "orderEvent":
        deleteOrderEvent(event as DeleteOrderEvent);
        break;
      case "orgaEvent":
        deleteOrgaEvent(event as DeleteOrgaEvent);
        break;
    }
  };

  return { hydrateEvents, deleteEvent };
};

export default useEvents;
