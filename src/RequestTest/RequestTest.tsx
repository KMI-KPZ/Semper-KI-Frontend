import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/App/App";
import Button from "../components/General/Button";
import { useWebsocket } from "../hooks/useWebsocket";
import { IUser } from "../interface/Interface";

interface Props {
  user: IUser | undefined;
}
export const RequestTest: React.FC<Props> = (props) => {
  const { user } = props;
  const [chat, setChat] = useState<{ send: boolean; title: string }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 100);
  }, []);

  const handleOnEventMessage = (event: MessageEvent) => {
    setChat((prevState) => [...prevState, { title: event.data, send: false }]);
  };

  const { sendMessage, socket, state } = useWebsocket(
    handleOnEventMessage,
    user !== undefined && load
  );

  const handleOnChangeMessageInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputMessage(e.currentTarget.value);
  };

  const handleOnClickSendMessage = () => {
    sendMessage(inputMessage);
    setChat((prevState) => [
      ...prevState,
      { title: inputMessage === "" ? "---" : inputMessage, send: true },
    ]);
    setInputMessage("");
  };

  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center">
      <div className="w-full bg-white p-5 gap-5 flex flex-col justify-center items-center">
        {chat.length > 0 ? (
          <div className="flex flex-col gap-1 items-center justify-center bg-slate-300 w-2/3 p-5">
            <h2>Chat:</h2>
            {chat.map(({ send, title }, index) => (
              <div
                key={index}
                className={`flex flex-row w-full items-center ${
                  send ? "justify-end" : "justify-start"
                }`}
              >
                <h3>{title}</h3>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-row gap-5 justify-around items-center">
          <h3>{state}</h3>
          <input
            value={inputMessage}
            type="text"
            className="border-2"
            onChange={handleOnChangeMessageInput}
          />
          <Button onClick={handleOnClickSendMessage}>
            Send Message To WebSocket
          </Button>
        </div>
      </div>
    </div>
  );
};
