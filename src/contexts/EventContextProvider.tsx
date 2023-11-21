import useEventsQuerys from "@/api/Events/useEventsQuerys";
import { useEventsWebsocket } from "@/api/Events/useEventsWebsocket";
import useEvents from "@/hooks/useEvents/useEvents";
import logger from "@/hooks/useLogger";
import useUser from "@/hooks/useUser";
import { DeleteEvent, Event } from "@/pages/App/types";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren } from "react";

interface EventContextProviderProps {}

export type EventContext = {
  socket: WebSocket | null;
  missedEvents: Event[];
};

export const EventContext = React.createContext<EventContext>({
  socket: null,
  missedEvents: [],
});

const EventContextProvider: React.FC<
  PropsWithChildren<EventContextProviderProps>
> = (props) => {
  const { children } = props;
  const { user } = useUser();
  const { missedEventsQuery } = useEventsQuerys();
  const { socket } = useEventsWebsocket();

  if (
    user === undefined ||
    (user !== undefined &&
      missedEventsQuery.isFetched &&
      missedEventsQuery.data !== undefined)
  ) {
    return (
      <EventContext.Provider
        value={{
          socket,
          missedEvents:
            missedEventsQuery.data === undefined ? [] : missedEventsQuery.data,
        }}
      >
        {children}
      </EventContext.Provider>
    );
  } else return <AppLoadingSuspense />;
};

export default EventContextProvider;
