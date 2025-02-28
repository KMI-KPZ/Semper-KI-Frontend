import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import {
  ChatMessageProps,
  ProcessOrigin,
} from "@/api/Process/Querys/useGetProcess";
import ProcessMessageItem from "@/components/Process/Messages/components/MessageItem";
import ProcessTextInput from "@/components/Process/Messages/components/TextInput";

interface ProcessMessagesProps {
  messages: ChatMessageProps[] | undefined;
  origin: ProcessOrigin;
}

const ProcessMessages: React.FC<ProcessMessagesProps> = (props) => {
  const { messages = [], origin } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      {messages.length === 0 ? (
        <Container width="full" direction="col" className="card bg-white">
          <Text>{t("components.Process.Messages.noMessages")}</Text>
        </Container>
      ) : (
        <Container
          width="full"
          direction="col"
          justify="start"
          className={`max-h-96 flex-col-reverse overflow-x-auto p-5`}
        >
          {[...messages].reverse().map((message, index, allMessages) => (
            <ProcessMessageItem
              key={index}
              message={message}
              sameAuthor={
                allMessages[index + 1] !== undefined &&
                allMessages[index + 1].userName === message.userName
              }
            />
          ))}
        </Container>
      )}
      <ProcessTextInput origin={origin} />
    </Container>
  );
};

export default ProcessMessages;
