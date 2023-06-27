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
import { useTranslation } from "react-i18next";
import { toast } from "./useToast";
import { UserType } from "@/hooks/useUser/types";

interface ReturnProps {
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
  isLoggedIn: boolean,
  userType: UserType
): ReturnProps => {
  const queryClient = useQueryClient();
  const { hydrateOrderEvents, deleteOrderEvent } = useOrderEvent(setState);
  const { hydrateOrgaEvents, deleteOrgaEvent } = useOrgaEvent();
  const { t } = useTranslation();

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
      case "permissionEvent":
        queryClient.invalidateQueries(["permission"]);
        break;
    }
  };

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined) {
      const newEvent: Event = JSON.parse(event.data);
      if (newEvent) {
        switch (newEvent.eventType) {
          case "orderEvent":
            hydrateEvents(newEvent);
            toast(
              t("toast.orderEvent"),
              userType === UserType.client ? "/orders" : "/contracts"
            );
            break;
          case "orgaEvent":
            hydrateEvents(newEvent);
            toast(t("toast.orgaEvent"), "/organization");
            break;
          case "permissionEvent":
            toast(t("toast.permissionEvent"), "/organization");
            break;
        }
        invalidateQueries(newEvent);
      }
    }
  };

  useWebsocket(onWebsocktEvent, isLoggedIn, userType);

  const hydrateEvents = (newEvent: Event): void => {
    setState((prevState) => {
      let newMissedEvent: Event[] = prevState.missedEvents;
      switch (newEvent.eventType) {
        case "orderEvent":
          newMissedEvent = hydrateOrderEvents(
            prevState.missedEvents,
            newEvent as OrderEvent
          );
          break;
        case "orgaEvent":
          newMissedEvent = hydrateOrgaEvents(
            prevState.missedEvents,
            newEvent as OrgaEvent
          );
          break;
        default:
          break;
      }
      return {
        ...prevState,
        missedEvents: newMissedEvent,
      };
    });
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

  return { deleteEvent };
};

export default useEvents;
