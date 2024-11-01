import useGetEvents from "@/api/Events/Querys/useGetEvents";
import { useEventsWebsocket } from "@/api/Events/Websocket/useEventsWebsocket";
import useUser, { UserType } from "@/hooks/useUser";
import { Event } from "@/hooks/useEvents/EventTypes";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren } from "react";

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
