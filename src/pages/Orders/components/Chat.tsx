import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { IChatMessage, useOrders } from "../hooks/useOrders";
import { User } from "@/hooks/useUser";
import { Heading } from "@component-library/Typography";

interface Props {
  closeMenu(): void;
  chat: IChatMessage[];
  user?: User;
  orderCollectionID: string;
  orderID: string;
}

interface State {
  height?: number;
  messageText?: string;
}

const ChatView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { chat, user, closeMenu, orderCollectionID, orderID } = props;
  const [state, setState] = useState<State>({});
  const { height, messageText } = state;
  const { updateOrder } = useOrders();

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      height: e.target.scrollHeight,
      messageText: e.target.value,
    }));
  };

  const handleOnClickButtonSend = () => {
    if (messageText !== undefined && messageText !== "")
      updateOrder.mutate(
        {
          orderCollectionID: orderCollectionID,
          orderID: orderID,
          chat: {
            date: new Date().toISOString(),
            text: messageText,
            userID: user!.hashedID,
            userName: user!.name,
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

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-start gap-5 bg-slate-100 md:max-h-[80vh] md:max-w-2xl md:bg-transparent">
      <div className="absolute right-1 top-1 md:hidden">
        <Button icon={<CloseIcon />} onClick={handleOnClickButtonClose} />
      </div>
      <div className="flex h-full w-full flex-col-reverse items-center justify-start gap-5 overflow-auto bg-white p-5">
        {chat
          .slice(0)
          .reverse()
          .map((chatMessage: IChatMessage, index: number) => (
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
          ))}
        <Heading variant="h1">{t("Orders.ChatView.header")}</Heading>
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
          placeholder={t("Orders.ChatView.placeholder")}
          onChange={handleOnChangeTextArea}
        />
        <Button
          hrefText="sendOrders"
          icon={<SendIcon />}
          onClick={handleOnClickButtonSend}
        />
      </div>
    </div>
  );
};

export default ChatView;
