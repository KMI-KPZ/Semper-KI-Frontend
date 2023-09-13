import {
  DeleteEvent,
  DeleteOrderEvent,
  DeleteOrgaEvent,
  Event,
  OrderEvent,
  OrderEventType,
  OrgaEvent,
} from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useMissedEvent from "./hooks/useMissedEvent";
import { useTranslation } from "react-i18next";
import { toast } from "../useToast";
import { UserProps, UserType } from "@/hooks/useUser/types";
import useOrderEvent from "./hooks/useOrderEvent";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { useWebsocket } from "./hooks/useWebsocket";

interface ReturnProps {
  deleteEvent: (event: DeleteEvent) => void;
  socket: WebSocket | null;
  events: Event[];
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
  isLoggedIn: boolean,
  user: UserProps | undefined,
  reloadPermissions: () => void
): ReturnProps => {
  const [events, setEvents] = useState<Event[]>([]);
  const queryClient = useQueryClient();
  const { hydrateOrderEvents, deleteOrderEvent } = useOrderEvent();
  const { hydrateOrgaEvents, deleteOrgaEvent } = useOrgaEvent();
  const { t } = useTranslation();

  const onLoadMissedEvents = (missedEvents: Event[]) => {
    if (missedEvents.length > 0) {
      setEvents(missedEvents);
    }
  };

  useMissedEvent({
    isLoggedIn,
    onLoadMissedEvents,
  });

  const invalidateQueries = (event: Event) => {
    switch (event.eventType) {
      case "orderEvent":
        queryClient.invalidateQueries(["order"]);
        queryClient.invalidateQueries(["flatOrders"]);
        break;
      case "orgaEvent":
        queryClient.invalidateQueries(["organizations"]);
        break;
      case "permissionEvent":
        queryClient.invalidateQueries(["permissions"]);
        queryClient.invalidateQueries(["organizations", "users"]);
        reloadPermissions();
        break;
    }
  };

  const isParseableJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined && isParseableJSON(event.data)) {
      const newEvent: Event = JSON.parse(event.data);
      if (newEvent) {
        invalidateQueries(newEvent);
        hydrateEvents(newEvent);
        switch (newEvent.eventType) {
          case "orderEvent":
            const orderEvent = newEvent as OrderEvent;
            if (orderEvent.orders[0].messages > 0) {
              toast(
                t("toast.orderEvent.message"),
                user?.usertype === UserType.USER ? "/orders" : "/contracts"
              );
            }
            if (orderEvent.orders[0].status > 0) {
              toast(
                t("toast.orderEvent.status"),
                user?.usertype === UserType.USER ? "/orders" : "/contracts"
              );
            }
            break;
          case "orgaEvent":
            toast(t("toast.orgaEvent"), "/organization");
            break;
          case "permissionEvent":
            toast(t("toast.permissionEvent"), "/organization");
            break;
        }
      }
    }
  };

  const { socket } = useWebsocket(onWebsocktEvent, isLoggedIn, user);

  const hydrateEvents = (newEvent: Event): void => {
    setEvents((prevState) => {
      let newMissedEvents: Event[] = prevState;
      switch (newEvent.eventType) {
        case "orderEvent":
          newMissedEvents = hydrateOrderEvents(
            newEvent as OrderEvent,
            prevState
          );
          break;
        case "orgaEvent":
          newMissedEvents = hydrateOrgaEvents(newEvent as OrgaEvent, prevState);
          break;
        case "permissionEvent":
          newMissedEvents.push(newEvent);
      }
      return newMissedEvents;
    });
  };

  const deleteEvent = (event: DeleteEvent) => {
    switch (event.eventType) {
      case "orderEvent":
        setEvents((prevState) =>
          deleteOrderEvent(event as DeleteOrderEvent, prevState)
        );

        break;
      case "orgaEvent":
        setEvents((prevState) =>
          deleteOrgaEvent(event as DeleteOrgaEvent, prevState)
        );
        break;
    }
  };

  return { socket, deleteEvent, events };
};

export default useEvents;
