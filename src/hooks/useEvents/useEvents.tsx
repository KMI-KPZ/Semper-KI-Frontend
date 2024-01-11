import {
  DeleteEvent,
  Event,
  ProcessEventItem,
  ProjectEventItem,
  ProjectEvents,
} from "@/pages/App/types";
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
import Project from "@/pages/Projects/Project/Project";

interface ReturnProps {
  deleteEvent: (event: DeleteEvent) => void;
  socket: WebSocket | null;
  events: Event[];
  getProjectEventItem: (projectID: string) => ProjectEventItem | undefined;
  getProjectEventCount: (projectID: string) => number;
  getProcessEventItem: (
    projectID: string,
    processID: string
  ) => ProcessEventItem | undefined;
  getProcessEventItemCount: (
    projectID: string,
    processID: string,
    type: "messages" | "processStatus"
  ) => number;
}

const useEvents = (): ReturnProps => {
  const { events, socket, setEvents } = useContext(EventContext);
  const { reloadPermissions } = usePermissions();

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
    logger("useEvents | deleteEvent | event", event);
    switch (event.eventType) {
      case "projectEvent":
        setEvents((prevState) => deleteProjectEvent(event, prevState));
        break;
      case "orgaEvent":
        setEvents((prevState) => deleteOrgaEvent(event, prevState));
        break;
    }
  };

  const getProjectEventItem = (
    projectID: string
  ): ProjectEventItem | undefined => {
    const projectEvent = events.find(
      (event) => event.eventType === "projectEvent"
    ) as ProjectEvents;
    if (projectEvent === undefined) return undefined;

    const projectEventItem = projectEvent.events.find(
      (event) => event.projectID === projectID
    );
    if (projectEventItem === undefined) return undefined;
    return projectEventItem;
  };

  const getProjectEventCount = (projectID: string): number => {
    const projectEvent = getProjectEventItem(projectID);
    if (projectEvent === undefined) return 0;
    let count = 0;
    projectEvent.processes.forEach((process) => {
      count +=
        (process.messages !== undefined ? process.messages : 0) +
        (process.processStatus !== undefined ? process.processStatus : 0);
    });
    return count;
  };

  const getProcessEventItem = (
    projectID: string,
    processID: string
  ): ProcessEventItem | undefined => {
    const projectEvent = getProjectEventItem(projectID);
    if (projectEvent === undefined) return undefined;
    const processEventItem = projectEvent.processes.find(
      (process) => process.processID === processID
    );
    if (processEventItem === undefined) return undefined;
    return processEventItem;
  };

  const getProcessEventItemCount = (
    projectID: string,
    processID: string,
    type: "messages" | "processStatus"
  ): number => {
    const processEventItem = getProcessEventItem(projectID, processID);
    if (processEventItem === undefined) return 0;
    return type === "messages"
      ? processEventItem.messages !== undefined
        ? processEventItem.messages
        : 0
      : processEventItem.processStatus !== undefined
      ? processEventItem.processStatus
      : 0;
  };

  return {
    socket,
    deleteEvent,
    events,
    getProjectEventItem,
    getProjectEventCount,
    getProcessEventItem,
    getProcessEventItemCount,
  };
};

export default useEvents;
