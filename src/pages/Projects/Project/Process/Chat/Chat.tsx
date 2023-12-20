import React, { ChangeEvent, useState } from "react";
import { Button } from "@component-library/Button";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { AuthorizedUserProps, UserProps } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/Typography";
import logger from "@/hooks/useLogger";
import useProcess, {
  ChatMessageProps,
} from "@/pages/Projects/hooks/useProcess";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";

interface ProcessChatProps {
  closeMenu(): void;
  chat: ChatMessageProps[];
  user: AuthorizedUserProps;
  projectID: string;
  processID: string;
}

interface State {
  height?: number;
  messageText?: string;
}

const ProcessChat: React.FC<ProcessChatProps> = (props) => {
  const { t } = useTranslation();
  const { chat, user, closeMenu, projectID, processID } = props;
  const [state, setState] = useState<State>({});
  const { height, messageText } = state;
  const { updateProcess } = useGeneralProcess();

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      height: e.target.scrollHeight,
      messageText: e.target.value,
    }));
  };

  const handleOnClickButtonSend = () => {
    if (messageText !== undefined && messageText !== "")
      updateProcess(
        {
          processIDs: [processID],
          updates: {
            changes: {
              messages: {
                date: new Date().toISOString(),
                text: messageText,
                userID: user.hashedID,
                userName: user.name,
              },
            },
          },
        },
        {
          onSuccess(data, variables, context) {
            setState((prevState) => ({
              ...prevState,
              messageText: "",
              height: undefined,
            }));
          },
        }
      );
  };

  const handleOnClickButtonClose = () => {
    closeMenu();
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      handleOnClickButtonSend();
    }
    if (e.code == "Enter" && e.shiftKey == true) {
      e.preventDefault();
      setState((prevState) => ({
        ...prevState,
        messageText: prevState.messageText + "\n",
      }));
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-start gap-5 bg-slate-100 md:max-h-[80vh] md:max-w-2xl md:bg-transparent">
      <div className="flex h-full w-full flex-col-reverse items-center justify-start gap-5 overflow-auto bg-white p-5">
        {chat.length > 0 ? (
          [...chat]
            .reverse()
            .map((chatMessage: ChatMessageProps, index: number) => (
              <div
                key={index}
                className={`flex w-full flex-col gap-3 ${
                  chatMessage.userID === user?.hashedID
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <span>{chatMessage.userName}:</span>
                <div
                  className={`flex w-full items-end justify-start gap-3 rounded-full bg-slate-100 p-3 ${
                    chatMessage.userID === user?.hashedID
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <span>{chatMessage.text}</span>
                  <span className="text-xs">
                    {new Date(chatMessage.date).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
        ) : (
          <Text variant="body">
            {t("Projects.Project.Process.components.Chat.noMessages")}
          </Text>
        )}
        <Heading variant="h1">
          {t("Projects.Project.Process.components.Chat.title")}
        </Heading>
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-3 md:flex-row">
        <textarea
          // type="text"
          className={`w-full resize-none rounded-md border-2 px-4 ${
            height !== undefined && height > 72 ? "" : "h-fit"
          }`}
          style={
            height !== undefined && height > 72
              ? { height: `${height + 4}px` }
              : {}
          }
          value={messageText}
          placeholder={t(
            "Projects.Project.Process.components.Chat.placeholder"
          )}
          onChange={handleOnChangeTextArea}
          onKeyDown={onEnterPress}
        />
        <Button
          children={<SendIcon />}
          onClick={handleOnClickButtonSend}
          title={t("Projects.Project.Process.components.Chat.button.send")}
        />
      </div>
    </div>
  );
};

export default ProcessChat;
