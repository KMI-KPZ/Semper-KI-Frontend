import React, { ChangeEvent, useState } from "react";
import useChat from "../../hooks/useChat";
import { IChatMessage, IUser } from "../../interface/Interface";
import Button from "../General/Button";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  closeMenu(): void;
  chat: IChatMessage[];
  user?: IUser;
}

interface State {
  chat: IChatMessage[];

  height?: number;
  messageText?: string;
}

const ChatView: React.FC<Props> = (props) => {
  const { chat: _chat, user, closeMenu } = props;
  const [state, setState] = useState<State>({
    chat: _chat,
  });
  const { height, messageText, chat } = state;
  const { uploadChatMessage } = useChat();

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      height: e.target.scrollHeight,
      messageText: e.target.value,
    }));
  };

  const handleOnClickButtonSend = () => {
    if (messageText !== undefined && messageText !== "")
      uploadChatMessage.mutate(
        {
          date: new Date().toString(),
          text: messageText,
          userId: user!.name,
          userName: user!.name,
        },
        {
          onSuccess(data, variables, context) {
            setState((prevState) => ({
              ...prevState,
              chat: [...prevState.chat, variables],
              messageText: undefined,
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
      <div className="flex flex-col w-full h-full bg-white justify-start items-center p-5 gap-5 overflow-auto">
        <h1>Nachrichten</h1>
        {chat.map((chatMessage: IChatMessage, index: number) => (
          <div
            key={index}
            className={`flex flex-col gap-3 w-full ${
              chatMessage.userId === "agsdhnfjhzhtgefwegrhdtjzf"
                ? "items-end"
                : "items-start"
            }`}
          >
            <span>{chatMessage.userName}:</span>
            <div
              className={`flex justify-start w-full p-3 gap-3 items-end rounded-full bg-slate-100 ${
                chatMessage.userId === "agsdhnfjhzhtgefwegrhdtjzf"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <span>{chatMessage.text}</span>
              <span className="text-xs">{chatMessage.date}</span>
            </div>
          </div>
        ))}
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
          placeholder="Nachricht"
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
