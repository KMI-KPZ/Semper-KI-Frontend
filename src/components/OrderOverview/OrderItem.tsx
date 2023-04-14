import { ChangeEvent, useContext, useState } from "react";
import { IChatMessage, IOrder } from "../../interface/Interface";
import Button from "../General/Button";
import MailIcon from "@mui/icons-material/Mail";
import PopUp from "../PopUp/PopUp";
import { AppContext } from "../App/App";
import SendIcon from "@mui/icons-material/Send";
import useChat from "../../hooks/useChat";

interface Props {
  order: IOrder;
}

interface State {
  chat: IChatMessage[];
  chatOpen: boolean;
  height?: number;
  messageText?: string;
}

const OrderItem: React.FC<Props> = (props) => {
  const { order } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
    chat: order.chat,
  });
  const { chatOpen, height, messageText } = state;
  const { user } = useContext(AppContext);
  const { uploadChatMessage } = useChat();

  const handleOnClickButtonChat = () => {
    setState((prevState) => ({ ...prevState, chatOpen: true }));
  };
  const handleOnOutsideClickChat = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
      height: undefined,
    }));
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.scrollHeight);
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

  const renderChat = () => {
    return (
      <div className="flex flex-col w-screen md:max-w-2xl h-screen md:max-h-[80vh] justify-start items-center gap-5">
        <div className="flex flex-col w-full h-full bg-white justify-start items-center p-5 gap-5 overflow-auto">
          <h1>Nachrichten</h1>
          {order.chat.map((chatMessage: IChatMessage, index: number) => (
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
        <div className="flex flex-row w-full h-fit bg-white justify-start items-center p-3 gap-5">
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

  return (
    <div className="flex flex-col justify-start items-start gap-3 border-2 w-full p-3">
      <h3>Bestellung: {order.id}</h3>
      <PopUp open={chatOpen} onOutsideClick={handleOnOutsideClickChat}>
        {renderChat()}
      </PopUp>
      <Button icon={<MailIcon />} onClick={handleOnClickButtonChat}>
        Nachrichten
      </Button>
    </div>
  );
};

export default OrderItem;
