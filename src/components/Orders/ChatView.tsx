import React, { ChangeEvent, useContext, useState } from "react";
import { IChatMessage, IUser } from "../../interface/Interface";
import Button from "../General/Button";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useOrders } from "../../hooks/useOrders";
import { useTranslation } from "react-i18next";

interface Props {
  closeMenu(): void;
  chat: IChatMessage[];
  user?: IUser;
  orderCollectionID: string;
  orderID: string;
}

interface State {
  chat: IChatMessage[];
  height?: number;
  messageText?: string;
}

const ChatView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { chat: _chat, user, closeMenu, orderCollectionID, orderID } = props;
  const [state, setState] = useState<State>({
    chat: _chat,
  });
  const { height, messageText, chat } = state;
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
              chat: [...prevState.chat, variables.chat!],
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
    <div className="flex flex-col w-screen md:max-w-2xl h-screen md:max-h-[80vh] justify-start items-center gap-5 relative bg-slate-100 md:bg-transparent">
      <div className="absolute top-1 right-1 md:hidden">
        <Button icon={<CloseIcon />} onClick={handleOnClickButtonClose} />
      </div>
      <div className="flex flex-col-reverse w-full h-full bg-white justify-start items-center p-5 gap-5 overflow-auto">
        {chat
          .slice(0)
          .reverse()
          .map((chatMessage: IChatMessage, index: number) => (
            <div
              key={index}
              className={`flex flex-col gap-3 w-full ${
                chatMessage.userID === user?.hashedID
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <span>{chatMessage.userName}:</span>
              <div
                className={`flex justify-start w-full p-3 gap-3 items-end rounded-full bg-slate-100 ${
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
        <h1>{t("Orders.ChatView.header")}</h1>
      </div>
      <div className="flex flex-col md:flex-row w-full h-fit bg-white justify-start items-center p-3 gap-5">
        <textarea
          // type="text"
          className={`w-full border-2 px-4 rounded-md resize-none ${
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
          link="sendOrders"
          icon={<SendIcon />}
          onClick={handleOnClickButtonSend}
        />
      </div>
    </div>
  );
};

export default ChatView;
