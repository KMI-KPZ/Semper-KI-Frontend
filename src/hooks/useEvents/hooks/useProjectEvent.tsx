import {
  DeleteProjectEvent,
  Event,
  ProjectEvents,
  ProjectEventItem,
  ProjectEventType,
  ProcessEventItem,
} from "@/pages/App/types";
import { splitArray, splitFindArray } from "@/services/utils";
import { Dispatch, SetStateAction, useContext } from "react";
import logger from "@/hooks/useLogger";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import useUser, { UserDetailsProps, UserType } from "@/hooks/useUser";
import { AppContext } from "@/pages/App/App";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "@/hooks/useToast";

export const getProjectEventAmount = (
  events: Event[] | undefined,
  type?: ProjectEventType
) => {
  if (events === undefined) return undefined;
  let count = 0;
  events
    .filter((event) => event.eventType === "projectEvent")
    .forEach((_projectEvent) => {
      const projectEvent = _projectEvent as ProjectEvents;
      projectEvent.events.forEach((projectEventItem) => {
        projectEventItem.processes.forEach((processEventItem) => {
          if (type === undefined) {
            count +=
              (processEventItem.messages !== undefined
                ? processEventItem.messages
                : 0) +
              (processEventItem.processStatus
                ? processEventItem.processStatus
                : 0);
          } else {
            if (type === "message") {
              count +=
                processEventItem.messages !== undefined
                  ? processEventItem.messages
                  : 0;
            }
            if (type === "status") {
              count +=
                processEventItem.processStatus !== undefined
                  ? processEventItem.processStatus
                  : 0;
            }
          }
        });
      });
    });
  return count > 0 ? count : undefined;
};

interface ReturnProps {
  handleNewProjectEvent: (
    newEvent: ProjectEvents,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => void;
  deleteProjectEvent: (event: DeleteProjectEvent, events: Event[]) => Event[];
}

const useProjectEvent = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const hydrateProjectEvents = (
    inputProjectEvent: ProjectEvents,
    events: Event[]
  ): Event[] => {
    logger("useProjectEvent | hydrateProjectEvents", inputProjectEvent, events);
    const inputProjectEventItem = inputProjectEvent.events[0];
    const inputProcessEventItem = inputProjectEvent.events[0].processes[0];

    const noneProjectEvents: Event[] = events.filter(
      (event) => event.eventType !== "projectEvent"
    );
    const projectEvents: ProjectEvents | undefined = events.find(
      (event) => event.eventType === "projectEvent"
    ) as ProjectEvents | undefined;

    const existingProjectEventItem = projectEvents?.events.find(
      (projectEventItem) =>
        projectEventItem.projectID === inputProjectEventItem.projectID
    );

    const existingProcessEventItem = existingProjectEventItem?.processes.find(
      (processEventItem) =>
        processEventItem.processID === inputProcessEventItem.processID
    );

    const newMessageCount: number =
      (inputProcessEventItem.messages !== undefined
        ? inputProcessEventItem.messages
        : 0) +
      (existingProcessEventItem !== undefined &&
      existingProcessEventItem.messages !== undefined
        ? existingProcessEventItem.messages
        : 0);
    const newStatusCount: number =
      (inputProcessEventItem.processStatus !== undefined
        ? inputProcessEventItem.processStatus
        : 0) +
      (existingProcessEventItem !== undefined &&
      existingProcessEventItem.processStatus !== undefined
        ? existingProcessEventItem.processStatus
        : 0);

    logger(
      "useProjectEvent | hydrateProjectEvents | newMessageCount",
      inputProjectEvent
    );

    const newProcessEventItem: ProcessEventItem = {
      processID: inputProcessEventItem.processID,
      messages: newMessageCount,
      processStatus: newStatusCount,
    };

    const newProjectEventItem: ProjectEventItem = {
      projectID: inputProjectEventItem.projectID,
      processes:
        existingProjectEventItem !== undefined
          ? [
              ...existingProjectEventItem.processes.filter(
                (processEventItem) =>
                  processEventItem.processID !== processEventItem.processID
              ),
              newProcessEventItem,
            ]
          : [newProcessEventItem],
    };

    const newProjectEvents: ProjectEvents = {
      eventType: "projectEvent",
      events:
        projectEvents === undefined
          ? [newProjectEventItem]
          : [
              ...projectEvents.events.filter(
                (event) => event.projectID !== newProjectEventItem.projectID
              ),
              newProjectEventItem,
            ],
    };

    return [...noneProjectEvents, newProjectEvents];
  };

  const deleteProjectEvent = (
    event: DeleteProjectEvent,
    events: Event[]
  ): Event[] => {
    // logger("useProjectEvent | deleteProjectEvent", event);
    const { processID, projectID, type } = event;

    const noneProjectEvents: Event[] = events.filter(
      (event) => event.eventType !== "projectEvent"
    );
    const projectEvents: ProjectEvents | undefined = events.find(
      (event) => event.eventType === "projectEvent"
    ) as ProjectEvents | undefined;

    const existingProjectEventItem = projectEvents?.events.find(
      (projectEventItem) => projectEventItem.projectID === projectID
    );
    const existingProcessEventItem = existingProjectEventItem?.processes.find(
      (processEventItem) => processEventItem.processID === processID
    );

    const newProcessEventItem: ProcessEventItem | undefined =
      existingProcessEventItem === undefined
        ? undefined
        : {
            processID,
            messages: Math.max(
              0,
              (existingProcessEventItem.messages !== undefined
                ? existingProcessEventItem.messages
                : 0) - (type === "message" ? 1 : 0)
            ),
            processStatus: Math.max(
              0,
              (existingProcessEventItem.processStatus !== undefined
                ? existingProcessEventItem.processStatus
                : 0) - (type === "status" ? 1 : 0)
            ),
          };

    const newProjectEventItem: ProjectEventItem | undefined =
      existingProjectEventItem === undefined
        ? undefined
        : {
            projectID,
            processes:
              newProcessEventItem !== undefined &&
              ((newProcessEventItem.messages !== undefined &&
                newProcessEventItem.messages > 0) ||
                (newProcessEventItem.processStatus !== undefined &&
                  newProcessEventItem.processStatus > 0))
                ? [
                    ...existingProjectEventItem.processes.filter(
                      (processEventItem) =>
                        processEventItem.processID !== processID
                    ),
                    newProcessEventItem,
                  ]
                : existingProjectEventItem.processes.filter(
                    (processEventItem) =>
                      processEventItem.processID !== processID
                  ),
          };

    const newProjectEvents: ProjectEvents | undefined =
      projectEvents === undefined
        ? undefined
        : {
            eventType: "projectEvent",
            events:
              newProjectEventItem !== undefined
                ? [
                    ...projectEvents.events.filter(
                      (event) => event.projectID !== projectID
                    ),
                    newProjectEventItem,
                  ]
                : projectEvents.events.filter(
                    (event) => event.projectID !== projectID
                  ),
          };

    return newProjectEvents === undefined
      ? noneProjectEvents
      : [...noneProjectEvents, newProjectEvents];
  };

  const handleNewProjectEvent = (
    newEvent: ProjectEvents,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProjects"]);
    setEvents(hydrateProjectEvents(newEvent, events));
    const projectEvent = newEvent;
    const projectEventItem = projectEvent.events[0];
    const processEventItem = projectEventItem.processes[0];
    if (
      processEventItem.messages !== undefined &&
      processEventItem.messages > 0
    ) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.message"),
        `/projects/${projectEventItem.projectID}/${processEventItem.processID}/chat`
      );
    }
    if (
      processEventItem.processStatus !== undefined &&
      processEventItem.processStatus > 0
    ) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.status"),
        `/projects/${projectEventItem.projectID}/${processEventItem.processID}`
      );
    }
  };

  return { handleNewProjectEvent, deleteProjectEvent };
};

export default useProjectEvent;
