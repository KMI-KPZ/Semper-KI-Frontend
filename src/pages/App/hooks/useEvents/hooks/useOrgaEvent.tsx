import { DeleteOrgaEvent, Event, OrgaEvent } from "@/pages/App/types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "../../useToast";

interface ReturnProps {
  handleNewOrgaEvent: (
    newEvent: OrgaEvent,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => void;
  deleteOrgaEvent: (event: DeleteOrgaEvent, events: Event[]) => Event[];
}

const useOrgaEvent = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const hydrateOrgaEvents = (
    newOrderEvent: OrgaEvent,
    events: Event[]
  ): Event[] => {
    const noneOrgaEvents: Event[] = events.filter(
      (event) => event.eventType !== "orderEvent"
    );
    const orgaEvents: OrgaEvent[] = events.filter(
      (event) => event.eventType === "orderEvent"
    ) as OrgaEvent[];
    return [...orgaEvents];
  };
  const deleteOrgaEvent = (event: DeleteOrgaEvent, events: Event[]) => {
    return events;
  };
  const handleNewOrgaEvent = (
    newEvent: OrgaEvent,
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>
  ) => {
    queryClient.invalidateQueries(["organizations"]);
    setEvents(hydrateOrgaEvents(newEvent, events));
    toast(t("toast.orgaEvent"), "/organization");
  };
  return { deleteOrgaEvent, handleNewOrgaEvent };
};

export default useOrgaEvent;
