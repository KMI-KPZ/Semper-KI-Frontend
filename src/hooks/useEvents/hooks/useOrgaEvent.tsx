import { toast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Event, OrgaEvent } from "../EventTypes";
import { useMemo } from "react";

interface ReturnProps {
  handleNewOrgaEvent: (newEvent: OrgaEvent) => void;
  totalOrgaEventCount: number;
}

const useOrgaEvent = (events: Event[]): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const handleNewOrgaEvent = (_: OrgaEvent) => {
    queryClient.invalidateQueries(["organizations"]);
    toast(t("App.hooks.useEvents.hooks.useOrgaEvent.toast"), "/organization");
  };

  const totalOrgaEventCount = useMemo(() => {
    return events.filter(
      (event): event is OrgaEvent => event.eventType === "orgaEvent"
    ).length;
  }, [events]);

  return { handleNewOrgaEvent, totalOrgaEventCount };
};

export default useOrgaEvent;
