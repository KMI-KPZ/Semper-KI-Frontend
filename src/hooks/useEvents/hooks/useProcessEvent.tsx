import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";
import { Event, ProcessEvent } from "../EventTypes";
import { useMemo } from "react";
import useEvents from "../useEvents";

interface ReturnProps {
  handleNewProcessEvent: (newEvent: ProcessEvent) => void;
  totalProcessEventCount: number;
  getProcessEventCount: (processID: string) => number;
  getProcessEvent: (processID: string) => ProcessEvent | undefined;
}

const useProcessEvent = (events: Event[]): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const handleNewProcessEvent = (newProcessEvent: ProcessEvent) => {
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["flatProcesss"]);

    if (newProcessEvent.triggerEvent === true) {
      toast(
        t(`types.EventDataReason.${newProcessEvent.eventData.reason}`),
        `/projects/${newProcessEvent.eventData.projectID}/${newProcessEvent.eventData.processID}#newest`
      );
    }
  };

  const totalProcessEventCount = useMemo((): number => {
    return events.filter(
      (event): event is ProcessEvent => event.eventType === "processEvent"
    ).length;
  }, [events]);

  const getProcessEventCount = useMemo(() => {
    return (processID: string): number => {
      return events
        .filter(
          (event): event is ProcessEvent => event.eventType === "processEvent"
        )
        .filter((event) => event.eventData.processID === processID).length;
    };
  }, [events]);

  const getProcessEvent = useMemo(() => {
    return (processID: string): ProcessEvent | undefined => {
      return events
        .filter(
          (event): event is ProcessEvent => event.eventType === "processEvent"
        )
        .find((event) => event.eventData.processID === processID);
    };
  }, [events]);

  return {
    totalProcessEventCount,
    handleNewProcessEvent,
    getProcessEventCount,
    getProcessEvent,
  };
};

export default useProcessEvent;
