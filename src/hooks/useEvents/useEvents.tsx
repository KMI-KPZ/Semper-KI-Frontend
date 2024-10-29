import { useContext, useMemo } from "react";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { JSONIsParseable, JSONSafeParse } from "@/services/utils";
import logger from "@/hooks/useLogger";
import useProjectEvent from "./hooks/useProjectEvent";
import { EventContext } from "@/contexts/EventContextProvider";
import { Event, ProcessEvent, ProjectEvent } from "./EventTypes";
import useProcessEvent from "./hooks/useProcessEvent";

interface ReturnProps {
  socket: WebSocket | null;
  events: Event[];
  totalEventCount: number;
  totalProjectEventCount: number;
  totalOrgaEventCount: number;
  totalProcessEventCount: number;
  getEvent: (eventID: string) => Event | undefined;
  getProjectEventCount: (projectID: string) => number;
  getProcessEventCount: (processID: string) => number;
  getProcessEvent: (processID: string) => ProcessEvent | undefined;
  getProjectEvent: (projectID: string) => ProjectEvent | undefined;
}

const useEvents = (): ReturnProps => {
  const { events, socket } = useContext(EventContext);

  const {
    handleNewProjectEvent,
    getProjectEventCount,
    totalProjectEventCount,
    getProjectEvent,
  } = useProjectEvent(events);
  const {
    getProcessEvent,
    getProcessEventCount,
    handleNewProcessEvent,
    totalProcessEventCount,
  } = useProcessEvent(events);
  const { handleNewOrgaEvent, totalOrgaEventCount } = useOrgaEvent(events);

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
        handleNewProjectEvent(newEvent);
        break;
      case "orgaEvent":
        handleNewOrgaEvent(newEvent);
        break;
      case "processEvent":
        handleNewProcessEvent(newEvent);
        break;
    }
  };

  const totalEventCount =
    totalProjectEventCount + totalOrgaEventCount + totalProcessEventCount;

  const getEvent = useMemo(() => {
    return (eventID: string) =>
      events.find((event) => event.eventID === eventID);
  }, [events]);

  return {
    socket,
    events,
    totalEventCount,
    totalProjectEventCount,
    totalOrgaEventCount,
    totalProcessEventCount,
    getEvent,
    getProcessEvent,
    getProcessEventCount,
    getProjectEvent,
    getProjectEventCount,
  };
};

export default useEvents;
