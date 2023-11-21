import { DeleteEvent, Event } from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { JSONIsParseable, JSONSafeParse } from "@/services/utils";
import logger from "@/hooks/useLogger";
import useProjectEvent from "./hooks/useProjectEvent";
import { toast } from "@/hooks/useToast";
import usePermissions from "../usePermissions";
import { EventContext } from "@/contexts/EventContextProvider";

interface ReturnProps {
  deleteEvent: (event: DeleteEvent) => void;
  socket: WebSocket | null;
  events: Event[];
}

const useEvents = (): ReturnProps => {
  const { missedEvents, socket } = useContext(EventContext);
  const { reloadPermissions } = usePermissions();

  const [events, setEvents] = useState<Event[]>(missedEvents);
  const queryClient = useQueryClient();
  const { handleNewProjectEvent, deleteProjectEvent } = useProjectEvent();
  const { handleNewOrgaEvent, deleteOrgaEvent } = useOrgaEvent();
  const { t } = useTranslation();

  if (socket !== null) {
    socket.onmessage = (event) => {
      onWebsocktEvent(event);
    };
  }

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
