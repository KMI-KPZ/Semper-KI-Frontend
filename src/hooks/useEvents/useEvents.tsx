import { useContext, useMemo } from "react";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { JSONIsParseable, JSONSafeParse } from "@/services/utils";
import logger from "@/hooks/useLogger";
import useProjectEvent from "./hooks/useProjectEvent";
import { EventContext } from "@/contexts/EventContextProvider";
import { Event, ProcessEvent } from "./EventTypes";

interface ReturnProps {
  socket: WebSocket | null;
  events: Event[];
  totalEventCount: number;
  totalProjectEventCount: number;
  totalOrgaEventCount: number;
  getEvent: (eventID: string) => Event | undefined;
  getProjectEventCount: (projectID: string) => number;
  getProcessEventCount: (projectID: string, processID: string) => number;
  getProcessEvent: (
    projectID: string,
    processID: string
  ) => ProcessEvent | undefined;
}

const useEvents = (): ReturnProps => {
  const { events, socket } = useContext(EventContext);

  const {
    handleNewProjectEvent,
    getProjectEventCount,
    getProcessEvent,
    getProcessEventCount,
    totalProjectEventCount,
  } = useProjectEvent(events);
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
    }
  };

  const totalEventCount = totalProjectEventCount + totalOrgaEventCount;

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
    getEvent,
    getProcessEvent,
    getProcessEventCount,
    getProjectEventCount,
  };
};

export default useEvents;
