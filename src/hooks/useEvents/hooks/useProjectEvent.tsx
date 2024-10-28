import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";
import { Event, ProjectEvent } from "../EventTypes";
import { useMemo } from "react";

interface ReturnProps {
  handleNewProjectEvent: (newEvent: ProjectEvent) => void;
  totalProjectEventCount: number;
  getProjectEventCount: (projectID: string) => number;
}

const useProjectEvent = (events: Event[]): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const handleNewProjectEvent = (newProjectEvent: ProjectEvent) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProjects"]);

    if (newProjectEvent.triggerEvent === true) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.status"),
        `/projects/${newProjectEvent.eventData.projectID}`
      );
    }
  };

  const getProjectEventCount = useMemo(() => {
    return (projectID: string): number => {
      let count = 0;
      events
        .filter(
          (event): event is ProjectEvent => event.eventType === "projectEvent"
        )
        .filter((event) => event.eventData.projectID === projectID)
        .forEach((_: ProjectEvent) => {
          count += 1;
        });

      return count > 0 ? count : 0;
    };
  }, [events]);

  const totalProjectEventCount = useMemo((): number => {
    return events
      .filter(
        (event): event is ProjectEvent => event.eventType === "projectEvent"
      )
      .reduce((count, event) => {
        return getProjectEventCount(event.eventData.projectID) + count;
      }, 0);
  }, [events]);

  return {
    totalProjectEventCount,
    handleNewProjectEvent,
    getProjectEventCount,
  };
};

export default useProjectEvent;
