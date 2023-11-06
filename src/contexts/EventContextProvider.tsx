import useEvents from "@/pages/App/hooks/useEvents/useEvents";
import { DeleteEvent, Event } from "@/pages/App/types";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

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
  const { socket, deleteEvent, events } = useEvents();

  return (
    <EventContext.Provider value={{ socket, deleteEvent, events }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
