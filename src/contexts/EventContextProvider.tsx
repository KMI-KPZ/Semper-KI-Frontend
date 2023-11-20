import useEventsQuerys from "@/api/Events/useEventsQuerys";
import { useEventsWebsocket } from "@/api/Events/useEventsWebsocket";
import useEvents from "@/hooks/useEvents/useEvents";
import logger from "@/hooks/useLogger";
import { DeleteEvent, Event } from "@/pages/App/types";
import React, { PropsWithChildren } from "react";

interface EventContextProviderProps {}

export type EventContext = {
  socket: WebSocket | null;
  deleteEvent: (event: DeleteEvent) => void;
  events: Event[];
};

export const EventContext = React.createContext<EventContext>({
  socket: null,
  deleteEvent: () => {},
  events: [],
});

const EventContextProvider: React.FC<
  PropsWithChildren<EventContextProviderProps>
> = (props) => {
  const { children } = props;
  const { missedEventsQuery } = useEventsQuerys();
  const { socket: testSocket } = useEventsWebsocket(() => [{}]);

  if (testSocket !== null) {
    testSocket.onmessage = (event: MessageEvent) => {
      logger("testSocket | onmessage", event);
    };
    console.log("testSocket");
  }

  const { socket, deleteEvent, events } = useEvents();

  return (
    <EventContext.Provider value={{ socket, deleteEvent, events }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
