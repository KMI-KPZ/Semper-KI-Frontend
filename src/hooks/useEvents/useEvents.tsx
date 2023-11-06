import { DeleteEvent, Event } from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useMissedEvent from "./hooks/useMissedEvent";
import { useTranslation } from "react-i18next";
import { UserProps } from "@/hooks/useUser";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { useWebsocket } from "./hooks/useWebsocket";
import { JSONIsParseable, JSONSafeParse } from "@/services/utils";
import logger from "@/hooks/useLogger";
import useProjectEvent from "./hooks/useProjectEvent";
import { UserContext } from "@/contexts/UserContextProvider";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { toast } from "@/hooks/useToast";

interface ReturnProps {
  deleteEvent: (event: DeleteEvent) => void;
  socket: WebSocket | null;
  events: Event[];
}

const useEvents = (): ReturnProps => {
  const { user } = useContext(UserContext);
  const { reloadPermissions } = useContext(PermissionContext);

  const [events, setEvents] = useState<Event[]>([]);
  const queryClient = useQueryClient();
  const { handleNewProjectEvent, deleteProjectEvent } = useProjectEvent();
  const { handleNewOrgaEvent, deleteOrgaEvent } = useOrgaEvent();
  const { t } = useTranslation();
  const onLoadMissedEvents = (missedEvents: Event[]) => {
    if (missedEvents.length > 0) {
      setEvents(missedEvents);
    }
  };
  useMissedEvent({
    onLoadMissedEvents,
  });

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined && JSONIsParseable(event.data)) {
      const newEvent = JSONSafeParse<Event>(event.data);
      logger(
        "useEvents | onWebsocktEvent | ",
        newEvent !== undefined
          ? newEvent
          : `JSONSafeParse failed | ${event.data}`
      );
      if (newEvent !== undefined) {
        handleNewEvent(newEvent);
      }
    } else {
      logger(
        "useEvents | onWebsocktEvent | JSONIsParseable failed",
        event.data
      );
    }
  };

  const handleNewEvent = (newEvent: Event) => {
    switch (newEvent.eventType) {
      case "projectEvent":
        handleNewProjectEvent(newEvent, events, setEvents);
        break;
      case "orgaEvent":
        handleNewOrgaEvent(newEvent, events, setEvents);
        break;
      case "permissionEvent":
        queryClient.invalidateQueries(["organizations", "users"]);
        reloadPermissions();
        toast(
          t("App.hooks.useEvents.useEvents.toast.permission"),
          "/organization"
        );
        break;
    }
  };

  const { socket } = useWebsocket(onWebsocktEvent);

  const deleteEvent = (event: DeleteEvent) => {
    switch (event.eventType) {
      case "projectEvent":
        setEvents((prevState) => deleteProjectEvent(event, prevState));
        break;
      case "orgaEvent":
        setEvents((prevState) => deleteOrgaEvent(event, prevState));
        break;
    }
  };

  return { socket, deleteEvent, events };
};

export default useEvents;
