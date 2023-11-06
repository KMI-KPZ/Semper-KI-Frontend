import {
  DeleteProjectEvent,
  Event,
  ProjectEvent,
  ProjectEventItem,
  ProjectEventType,
} from "@/pages/App/types";
import { splitArray, splitFindArray } from "@/services/utils";
import { Dispatch, SetStateAction, useContext } from "react";
import logger from "@/hooks/useLogger";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/hooks/useUser";
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
      const projectEvent = _projectEvent as ProjectEvent;
      projectEvent.processes.forEach((projectEvent) => {
        if (
          projectEvent.messages !== undefined &&
          projectEvent.messages > 0 &&
          (type === "message" || type === undefined)
        )
          count += projectEvent.messages;
        if (
          projectEvent.status !== undefined &&
          projectEvent.status > 0 &&
          (type === "status" || type === undefined)
        )
          count += projectEvent.status;
      });
    });
  return count > 0 ? count : undefined;
};

const addProjectEventItemMessages = (
  oldEvent: ProjectEventItem | undefined,
  newEvent: ProjectEventItem | undefined
): number => {
  if (oldEvent === undefined && newEvent === undefined) return 0;
  if (oldEvent === undefined && newEvent !== undefined)
    return newEvent.messages;
  if (newEvent === undefined && oldEvent !== undefined)
    return oldEvent.messages;
  if (oldEvent !== undefined && newEvent !== undefined) {
    return oldEvent.messages + newEvent.messages;
  }
  return 0;
};
const addProjectEventItemStatus = (
  oldEvent: ProjectEventItem | undefined,
  newEvent: ProjectEventItem | undefined
): number => {
  if (oldEvent === undefined && newEvent === undefined) return 0;
  if (oldEvent === undefined && newEvent !== undefined) return newEvent.status;
  if (newEvent === undefined && oldEvent !== undefined) return oldEvent.status;
  if (oldEvent !== undefined && newEvent !== undefined) {
    return oldEvent.status + newEvent.status;
  }

  return 0;
};
const getExistingProjectEvent = (
  projectEvents: ProjectEvent[],
  newProjectEvent: ProjectEvent
): ProjectEvent | undefined => {
  return projectEvents.find(
    (projectEvent) => projectEvent.projectID === newProjectEvent.projectID
  );
};
const getProjectEventItemIDs = (
  projectEventItems: ProjectEventItem[]
): string[] => {
  return projectEventItems.map(
    (projectEventItem) => projectEventItem.processID
  );
};
const hydrateProjectEventItems = (
  existingProjectEvent: ProjectEvent | undefined,
  newProjectEventItems: ProjectEventItem[]
): ProjectEventItem[] => {
  if (existingProjectEvent === undefined) return newProjectEventItems;
  const newItemIDs = getProjectEventItemIDs(newProjectEventItems);
  const existingItemIDs = getProjectEventItemIDs(
    existingProjectEvent.processes
  );
  const existingUntouchedItems: ProjectEventItem[] =
    existingProjectEvent.processes.filter(
      (projectEventItem) => !newItemIDs.includes(projectEventItem.processID)
    );
  const existingItems: ProjectEventItem[] =
    existingProjectEvent.processes.filter((projectEventItem) =>
      newItemIDs.includes(projectEventItem.processID)
    );
  const hydratedExistingItems = existingItems.map(
    (existingProjectEventItem) => {
      const newItem = newProjectEventItems.find(
        (newProjectEventItem) =>
          newProjectEventItem.processID === existingProjectEventItem.processID
      );
      return {
        ...existingProjectEventItem,
        messages: addProjectEventItemMessages(
          existingProjectEventItem,
          newItem
        ),
        status: addProjectEventItemStatus(existingProjectEventItem, newItem),
      };
    }
  );
  const newUntouchedItems = newProjectEventItems.filter(
    (newProjectEventItem) =>
      !existingItemIDs.includes(newProjectEventItem.processID)
  );

  return [
    ...existingUntouchedItems,
    ...hydratedExistingItems,
    ...newUntouchedItems,
  ];
};

interface ReturnProps {
  handleNewProjectEvent: (
    newEvent: ProjectEvent,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => void;
  deleteProjectEvent: (event: DeleteProjectEvent, events: Event[]) => Event[];
}

const useProjectEvent = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const hydrateProjectEvents = (
    newProjectEvent: ProjectEvent,
    events: Event[]
  ): Event[] => {
    const noneProjectEvents = events.filter(
      (event) => event.eventType !== "projectEvent"
    );
    const projectEvents: ProjectEvent[] = events.filter(
      (event) => event.eventType === "projectEvent"
    ) as ProjectEvent[];

    const existingProjectEvent = getExistingProjectEvent(
      projectEvents,
      newProjectEvent
    );
    const hydatedProjectEventItems = hydrateProjectEventItems(
      existingProjectEvent,
      newProjectEvent.processes
    );

    const newProjectEvents: ProjectEvent[] = [
      ...projectEvents.filter(
        (projectEvent) => projectEvent.projectID !== newProjectEvent.projectID
      ),
      existingProjectEvent === undefined
        ? newProjectEvent
        : {
            ...existingProjectEvent,
            processes: hydatedProjectEventItems,
          },
    ];
    return [...noneProjectEvents, ...newProjectEvents];
  };

  const deleteProjectEvent = (
    event: DeleteProjectEvent,
    events: Event[]
  ): Event[] => {
    // logger("useProjectEvent | deleteProjectEvent", event);
    const { processID, projectID, type } = event;

    const { arrayTrue: _projectEvents, arrayFalse: otherEvents } = splitArray(
      events,
      (event) => event.eventType === "projectEvent"
    );
    const projectEvents = _projectEvents as ProjectEvent[];
    const { otherArray: otherProjectEvents, item: projectEvent } =
      splitFindArray(
        projectEvents,
        (projectEvent) => projectEvent.projectID === projectID
      );
    let newProjectEventItems: ProjectEventItem[] = [];
    let projectEventItem: ProjectEventItem | undefined = undefined;
    if (projectEvent !== undefined) {
      const { otherArray: _otherProjectEventItems, item: _projectEventItem } =
        splitFindArray(
          projectEvent.processes,
          (projectEventItem) => projectEventItem.processID === projectID
        );
      newProjectEventItems = _otherProjectEventItems;
      projectEventItem = _projectEventItem;
    }
    if (projectEventItem !== undefined) {
      projectEventItem = {
        ...projectEventItem,
        messages: type === "message" ? 0 : projectEventItem.messages,
        status: type === "status" ? 0 : projectEventItem.status,
      };
      if (projectEventItem.messages === 0 && projectEventItem.status === 0) {
        projectEventItem = undefined;
      } else {
        newProjectEventItems.push(projectEventItem);
      }
    }
    return projectEvent !== undefined && newProjectEventItems.length > 0
      ? [
          ...otherEvents,
          ...otherProjectEvents,
          {
            ...projectEvent,
            processes: newProjectEventItems,
          },
        ]
      : [...otherEvents, ...otherProjectEvents];
  };

  const handleNewProjectEvent = (
    newEvent: ProjectEvent,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProjects"]);
    setEvents(hydrateProjectEvents(newEvent, events));
    const projectEvent = newEvent;
    if (projectEvent.processes[0].messages > 0) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.message"),
        `/projects/${newEvent.projectID}/${projectEvent.processes[0].processID}`
      );
    }
    if (projectEvent.processes[0].status > 0) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.status"),
        `/projects/${newEvent.projectID}/${projectEvent.processes[0].processID}`
      );
    }
  };

  return { handleNewProjectEvent, deleteProjectEvent };
};

export default useProjectEvent;
