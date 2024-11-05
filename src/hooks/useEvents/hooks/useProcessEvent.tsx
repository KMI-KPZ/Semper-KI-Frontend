import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/useToast";
import { Event, ProcessEvent } from "../EventTypes";
import { useMemo } from "react";

interface ReturnProps {
  handleNewProcessEvent: (newEvent: ProcessEvent) => void;
  totalProcessEventCount: number;
  getProcessEvents: (processID: string) => ProcessEvent[];
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

        `/projects/${newProcessEvent.eventData.projectID}/${
          newProcessEvent.eventData.processID
        }#${
          newProcessEvent.eventData.additionalInformation === undefined
            ? "newest"
            : newProcessEvent.eventData.additionalInformation.origin
        }`
      );
    }
  };

  const totalProcessEventCount = useMemo((): number => {
    return events.filter(
      (event): event is ProcessEvent => event.eventType === "processEvent"
    ).length;
  }, [events]);

  const getProcessEvents = useMemo(() => {
    return (processID: string): ProcessEvent[] => {
      return events
        .filter(
          (event): event is ProcessEvent => event.eventType === "processEvent"
        )
        .filter((event) => event.eventData.processID === processID);
    };
  }, [events]);

  return {
    totalProcessEventCount,
    handleNewProcessEvent,
    getProcessEvents,
  };
};

export default useProcessEvent;
