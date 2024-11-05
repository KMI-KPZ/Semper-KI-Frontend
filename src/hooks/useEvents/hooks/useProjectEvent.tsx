import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";
import { Event, ProcessEvent, ProjectEvent } from "../EventTypes";
import { useMemo } from "react";

interface ReturnProps {
  handleNewProjectEvent: (newEvent: ProjectEvent) => void;
  totalProjectEventCount: number;
  getProjectEvents: (projectID: string) => ProjectEvent[];
  getTotalProjectEventCount: (projectID: string) => number;
}

const useProjectEvent = (events: Event[]): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const handleNewProjectEvent = (newProjectEvent: ProjectEvent) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProjects"]);

    if (newProjectEvent.triggerEvent === true) {
      toast(
        t("hooks.useProjectEvent.toast.status"),
        `/projects/${newProjectEvent.eventData.projectID}`
      );
    }
  };

  const getTotalProjectEventCount = useMemo(() => {
    return (projectID: string): number => {
      return events
        .filter(
          (event): event is ProjectEvent | ProcessEvent =>
            event.eventType === "projectEvent" ||
            event.eventType === "processEvent"
        )
        .filter((event) => event.eventData.projectID === projectID).length;
    };
  }, [events]);

  const getProjectEvents = useMemo(() => {
    return (projectID: string): ProjectEvent[] => {
      return events
        .filter(
          (event): event is ProjectEvent => event.eventType === "projectEvent"
        )
        .filter((event) => event.eventData.projectID === projectID);
    };
  }, [events]);

  const totalProjectEventCount = useMemo((): number => {
    return events.filter(
      (event): event is ProjectEvent | ProcessEvent =>
        event.eventType === "projectEvent" || event.eventType === "processEvent"
    ).length;
  }, [events]);

  return {
    totalProjectEventCount,
    handleNewProjectEvent,
    getTotalProjectEventCount,
    getProjectEvents,
  };
};

export default useProjectEvent;
