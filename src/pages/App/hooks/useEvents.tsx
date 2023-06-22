import {
  DeleteEvent,
  DeleteOrderEvent,
  DeleteOrgaEvent,
  Event,
  OrderEvent,
  OrderEventItem,
  OrgaEvent,
} from "@/hooks/useUser/types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AppState } from "..";
import useMissedEvent from "./useMissedEvent";
import useOrderEvent from "./useOrderEvent";
import useOrgaEvent from "./useOrgaEvent";
import { useWebsocket } from "./useWebsocket";

interface ReturnProps {
  hydrateEvents: (
    missedEvents: Event[],
    newOrderCollectionEvent: Event
  ) => Event[];
  deleteEvent: (event: DeleteEvent) => void;
}

const useEvents = (
  setState: Dispatch<SetStateAction<AppState>>,
  isLoggedIn: boolean
): ReturnProps => {
  const queryClient = useQueryClient();
  const { hydrateOrderEvents, deleteOrderEvent } = useOrderEvent(setState);
  const { hydrateOrgaEvents, deleteOrgaEvent } = useOrgaEvent();

  const onLoadMissedEvents = (missedEvents: Event[]) => {
    setState((prevState) => ({
      ...prevState,
      missedEvents: missedEvents,
    }));
  };

  useMissedEvent({
    isLoggedIn,
    onLoadMissedEvents,
  });

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined) {
      const newEvent: Event = JSON.parse(event.data);
      console.log("useEvent | onWebsocktEvent ", newEvent);
      if (newEvent) {
        setState((prevState) => ({
          ...prevState,
          missedEvents: hydrateEvents(prevState.missedEvents, newEvent),
        }));
        // queryClient.invalidateQueries(["orders"]);
      }
    }
  };

  const {
    sendMessage,
    socket: websocket,
    state: webSocketState,
  } = useWebsocket(onWebsocktEvent, isLoggedIn);

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
