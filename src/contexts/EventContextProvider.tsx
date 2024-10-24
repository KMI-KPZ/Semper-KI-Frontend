import useGetMissedEvents from "@/api/Events/Querys/useGetMissedEvents";
import { useEventsWebsocket } from "@/api/Events/Websocket/useEventsWebsocket";
import useUser, { UserType } from "@/hooks/useUser";
import { Event } from "@/pages/App/types";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren, useState } from "react";

interface EventContextProviderProps {}

export type EventContext = {
  socket: WebSocket | null;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

export const EventContext = React.createContext<EventContext>({
  socket: null,
  events: [],
  setEvents: () => {},
});

const EventContextProvider: React.FC<
  PropsWithChildren<EventContextProviderProps>
> = (props) => {
  const { children } = props;
  const { user } = useUser();
  const missedEventsQuery = useGetMissedEvents();
  const { socket } = useEventsWebsocket();
  const [events, setEvents] = useState<Event[]>(
    missedEventsQuery.data !== undefined ? missedEventsQuery.data : []
  );

  if (user.usertype !== UserType.ANONYM || user.usertype === UserType.ANONYM) {
    return (
      <EventContext.Provider
        value={{
          socket,
          events,
          setEvents,
        }}
      >
        {children}
      </EventContext.Provider>
    );
  } else return <AppLoadingSuspense />;
};

export default EventContextProvider;
