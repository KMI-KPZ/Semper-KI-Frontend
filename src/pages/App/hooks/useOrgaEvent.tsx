import { DeleteOrgaEvent, Event, OrgaEvent } from "@/pages/App/types";

interface ReturnProps {
  hydrateOrgaEvents: (newOrderEvent: OrgaEvent, events: Event[]) => Event[];
  deleteOrgaEvent: (event: DeleteOrgaEvent, events: Event[]) => Event[];
}

const useOrgaEvent = (): ReturnProps => {
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
  return { deleteOrgaEvent, hydrateOrgaEvents };
};

export default useOrgaEvent;
