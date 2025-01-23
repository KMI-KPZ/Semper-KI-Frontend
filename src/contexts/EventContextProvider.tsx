import useGetEvents from "@/api/Events/Querys/useGetEvents";
import { useEventsWebsocket } from "@/api/Events/Websocket/useEventsWebsocket";
import useUser, { UserType } from "@/hooks/useUser";
import { Event } from "@/hooks/useEvents/EventTypes";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren, useEffect } from "react";
import useOrgaEvent from "@/hooks/useEvents/hooks/useOrgaEvent";
import useProcessEvent from "@/hooks/useEvents/hooks/useProcessEvent";
import useProjectEvent from "@/hooks/useEvents/hooks/useProjectEvent";

interface EventContextProviderProps {}

export type EventContext = {
  socket: WebSocket | null;
  events: Event[];
};

export const EventContext = React.createContext<EventContext>({
  socket: null,
  events: [],
});

const EventContextProvider: React.FC<
  PropsWithChildren<EventContextProviderProps>
> = (props) => {
  const { children } = props;
  const { user } = useUser();
  const events = useGetEvents(user.usertype !== UserType.ANONYM);
  const { socket } = useEventsWebsocket();
  const [triggedEvents, setTriggeredEvents] = React.useState<string[]>([]);

  const { handleNewProjectEvent } = useProjectEvent([]);
  const { handleNewProcessEvent } = useProcessEvent([]);
  const { handleNewOrgaEvent } = useOrgaEvent([]);

  const handleNewEvent = (newEvent: Event) => {
    switch (newEvent.eventType) {
      case "projectEvent":
        handleNewProjectEvent(newEvent);
        break;
      case "orgaEvent":
        handleNewOrgaEvent(newEvent);
        break;
      case "processEvent":
        handleNewProcessEvent(newEvent);
        break;
    }
  };

  useEffect(() => {
    if (events.data !== undefined && events.data.length > 0) {
      events.data.forEach((event) => {
        if (event.triggerEvent && !triggedEvents.includes(event.eventID)) {
          handleNewEvent(event);
          setTriggeredEvents((prev) => [...prev, event.eventID]);
        }
      });
    }
  }, [events.data]);

  if (user.usertype === UserType.ANONYM) return children;
  if (events.isFetched && events.data !== undefined) {
    return (
      <EventContext.Provider
        value={{
          socket,
          events: events.data,
        }}
      >
        {children}
      </EventContext.Provider>
    );
  } else return <AppLoadingSuspense />;
};

export default EventContextProvider;
