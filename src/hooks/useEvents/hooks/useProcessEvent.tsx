import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";
import { Event, ProcessEvent } from "../EventTypes";
import { useMemo } from "react";

interface ReturnProps {
  handleNewProcessEvent: (newEvent: ProcessEvent) => void;
  totalProcessEventCount: number;
  getProcessEventCount: (projectID: string, processID: string) => number;
  getProcessEvent: (
    projectID: string,
    processID: string
  ) => ProcessEvent | undefined;
}

const useProcessEvent = (events: Event[]): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const handleNewProcessEvent = (newProcessEvent: ProcessEvent) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProcesss"]);

    if (newProcessEvent.triggerEvent === true) {
      toast(
        t("App.hooks.useEvents.hooks.useProjectEvent.toast.status"),
        `/projects/${newProcessEvent.eventData.projectID}/${newProcessEvent.eventData.processID}#newest`
      );
    }
  };

  const totalProcessEventCount = useMemo((): number => {
    return events
      .filter(
        (event): event is ProcessEvent => event.eventType === "projectEvent"
      )
      .reduce((count, event) => {
        return (
          count +
          event.processEvents.reduce((processCount, processEvent) => {
            return (
              processCount +
              (processEvent.files ?? 0) +
              (processEvent.messages ?? 0) +
              (processEvent.processStatus ?? 0)
            );
          }, 0)
        );
      }, 0);
  }, [events]);

  const getProcessEventCount = useMemo(() => {
    return (projectID: string): number => {
      let count = 0;
      events
        .filter(
          (event): event is ProcessEvent => event.eventType === "projectEvent"
        )
        .filter((event) => event.projectID === projectID)
        .forEach((event: ProcessEvent) => {
          event.processEvents.forEach((processEvents) => {
            count +=
              (processEvents.files ?? 0) +
              (processEvents.messages ?? 0) +
              (processEvents.processStatus ?? 0);
          });
        });
      return count > 0 ? count : 0;
    };
  }, [events]);

  const getProcessEventCount = useMemo(() => {
    return (projectID: string, processID: string): number => {
      let count = 0;
      events
        .filter(
          (event): event is ProcessEvent => event.eventType === "projectEvent"
        )
        .filter((event) => event.projectID === projectID)
        .forEach((event: ProcessEvent) => {
          event.processEvents
            .filter((processEvent) => processEvent.processID === processID)
            .forEach((processEvents) => {
              count +=
                (processEvents.files ?? 0) +
                (processEvents.messages ?? 0) +
                (processEvents.processStatus ?? 0);
            });
        });
      return count > 0 ? count : 0;
    };
  }, [events]);

  const getProcessEvent = useMemo(() => {
    return (projectID: string, processID: string): ProcessEvent | undefined => {
      let processEvent: ProcessEvent | undefined = undefined;
      events
        .filter(
          (event): event is ProcessEvent => event.eventType === "projectEvent"
        )
        .filter((event) => event.projectID === projectID)
        .forEach((event: ProcessEvent) => {
          event.processEvents
            .filter((processEvent) => processEvent.processID === processID)
            .forEach((processEvents) => {
              processEvent = processEvents;
            });
        });
      return processEvent;
    };
  }, [events]);

  return {
    totalProcessEventCount,
    handleNewProcessEvent,
    getProcessEventCount,
    getProcessEventCount,
    getProcessEvent,
  };
};

export default useProcessEvent;
