import useGetMissedEvents from "@/api/Events/Querys/useGetMissedEvents";
import { useEventsWebsocket } from "@/api/Events/Websocket/useEventsWebsocket";
import useUser, { UserType } from "@/hooks/useUser";
import { Event } from "@/pages/App/types";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren, useState } from "react";

interface ChatbotContextProviderProps {}

export type ChatbotContext = {
  setTopics(topics: string[]):void,
  topics: string[],
};

export const ChatbotContext = React.createContext<ChatbotContext>({
  topics: [],
  setTopics: () => {},
});

const ChatbotContextProvider: React.FC<
  PropsWithChildren<ChatbotContextProviderProps>
> = (props) => {
  const { children } = props;
  const [topics, setTopics] = useState<String[]>([]);

  return (
      <ChatbotContext.Provider
          value={{topics, setTopic: setTopics}}
        >
        {children}
      </ChatbotContext.Provider>
    );
};

export default ChatbotContextProvider
