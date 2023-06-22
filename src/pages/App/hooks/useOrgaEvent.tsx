import { DeleteOrgaEvent, Event, OrgaEvent } from "@/pages/App/hooks/types";

interface ReturnProps {
  hydrateOrgaEvents: (events: Event[], newOrderEvent: OrgaEvent) => Event[];
  deleteOrgaEvent: (event: DeleteOrgaEvent) => void;
}

const useOrgaEvent = (): ReturnProps => {
  const hydrateOrgaEvents = (
    events: Event[],
    newOrderEvent: OrgaEvent
  ): Event[] => {
    const noneOrgaEvents: Event[] = events.filter(
      (event) => event.eventType !== "orderEvent"
    );
    const orgaEvents: OrgaEvent[] = events.filter(
      (event) => event.eventType === "orderEvent"
    ) as OrgaEvent[];
    return [...orgaEvents];
  };
  const deleteOrgaEvent = (event: DeleteOrgaEvent) => {};
  return { deleteOrgaEvent, hydrateOrgaEvents };
};

export default useOrgaEvent;
