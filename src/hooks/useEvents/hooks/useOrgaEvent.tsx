import { toast } from "@/hooks/useToast";
import { Event } from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ReturnProps {
  handleNewOrgaEvent: (
    newEvent: OrgaEvents,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => void;
  deleteOrgaEvent: (event: DeleteOrgaEvent, events: Event[]) => Event[];
}

export const getOrgaEventAmount = (events: Event[] | undefined) => {
  if (events === undefined) return undefined;
  let count = 0;
  events
    .filter((event) => event.eventType === "orgaEvent")
    .forEach((_) => {
      count += 1;
    });
  return count > 0 ? count : undefined;
};

const useOrgaEvent = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const hydrateOrgaEvents = (
    newProjectEvent: OrgaEvents,
    events: Event[]
  ): Event[] => {
    const orgaEvents: OrgaEvents[] = events.filter(
      (event) => event.eventType === "projectEvent"
    ) as OrgaEvents[];
    return [...orgaEvents, newProjectEvent];
  };

  const deleteOrgaEvent = (event: DeleteOrgaEvent, events: Event[]) => {
    return events.filter((e) => e.eventType !== event.eventType);
  };

  const handleNewOrgaEvent = (
    newEvent: OrgaEvents,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => {
    queryClient.invalidateQueries(["organizations"]);
    setEvents(hydrateOrgaEvents(newEvent, events));
    toast(t("App.hooks.useEvents.hooks.useOrgaEvent.toast"), "/organization");
  };
  return { deleteOrgaEvent, handleNewOrgaEvent };
};

export default useOrgaEvent;
