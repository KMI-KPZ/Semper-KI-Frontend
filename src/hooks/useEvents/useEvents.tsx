import { useContext, useEffect, useMemo } from "react";
import useOrgaEvent from "./hooks/useOrgaEvent";
import { JSONIsParseable, JSONSafeParse } from "@/services/utils";
import logger from "@/hooks/useLogger";
import useProjectEvent from "./hooks/useProjectEvent";
import { EventContext } from "@/contexts/EventContextProvider";
import { Event, ProcessEvent, ProjectEvent } from "./EventTypes";
import useProcessEvent from "./hooks/useProcessEvent";
import { parseEvent } from "@/api/Events/Querys/useGetEvent";
import { useQueryClient } from "@tanstack/react-query";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { useTranslation } from "react-i18next";

interface ReturnProps {
  socket: WebSocket | null;
  events: Event[];
  totalEventCount: number;
  totalProjectEventCount: number;
  totalOrgaEventCount: number;
  totalProcessEventCount: number;
  getEvent: (eventID: string) => Event | undefined;
  getEventContent: (event: Event) => string;
  getProcessEvents: (processID: string) => ProcessEvent[];
  getProjectEvents: (projectID: string) => ProjectEvent[];
  getTotalProjectEventCount: (projectID: string) => number;
}

const useEvents = (): ReturnProps => {
  const { events, socket } = useContext(EventContext);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    totalProjectEventCount,
    handleNewProjectEvent,
    getProjectEvents,
    getTotalProjectEventCount,
  } = useProjectEvent(events);
  const { getProcessEvents, handleNewProcessEvent, totalProcessEventCount } =
    useProcessEvent(events);
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
      const parsedEvent = parseEvent(newEvent);
      if (newEvent !== undefined && parsedEvent !== undefined) {
        handleNewEvent(parsedEvent);
      }
    } else {
      logger(
        "useEvents | onWebsocktEvent | JSONIsParseable failed",
        event.data
      );
    }
  };

  const handleNewEvent = (newEvent: Event) => {
    queryClient.invalidateQueries(["events"]);
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

  useEffect(() => {
    if (events.length > 0) {
      events.forEach((event) => {
        if (event.triggerEvent) handleNewEvent(event);
      });
    }
  }, []);

  const totalEventCount = totalProjectEventCount + totalOrgaEventCount;

  const getEvent = useMemo(() => {
    return (eventID: string) =>
      events.find((event) => event.eventID === eventID);
  }, [events]);

  const getEventContent = (event: Event): string => {
    switch (event.eventData.reason) {
      case "test":
        return event.eventData.content;
      case "file":
        return event.eventData.content;
      case "files":
        return event.eventData.content;
      case "messages":
        return `"` + event.eventData.content + `"`;
      case "serviceDetails":
        return event.eventData.content;
      case "serviceType":
        return event.eventData.content;
      case "serviceStatus":
        return event.eventData.content;
      case "processDetails":
        return event.eventData.content;
      case "processStatus":
        return t(
          `enum.ProcessStatus.${
            ProcessStatus[
              Number(event.eventData.content)
            ] as keyof typeof ProcessStatus
          }`
        );
      case "provisionalContractor":
        return event.eventData.content;
      case "dependenciesIn":
        return event.eventData.content;
      case "dependenciesOut":
        return event.eventData.content;
      case "roleChanged":
        return event.eventData.content;
      case "userDeleted":
        return event.eventData.content;
    }
  };

  return {
    socket,
    events,
    totalEventCount,
    totalProjectEventCount,
    totalOrgaEventCount,
    totalProcessEventCount,
    getEvent,
    getEventContent,
    getProcessEvents,
    getProjectEvents,
    getTotalProjectEventCount,
  };
};

export default useEvents;
