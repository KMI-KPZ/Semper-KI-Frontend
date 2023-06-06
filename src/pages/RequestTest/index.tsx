import { useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import { useWebsocket } from "@/hooks/useWebsocket";
import { User } from "@/hooks/useUser";
import { Heading } from "@component-library/Typography";

interface Props {
  user: User | undefined;
}
export const RequestTest: React.FC<Props> = (props) => {
  const { user } = props;
  const [chat, setChat] = useState<{ send: boolean; data: any }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 100);
  }, []);

  const handleOnEventMessage = (event: MessageEvent) => {
    setChat((prevState) => [...prevState, { data: event.data, send: false }]);
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
      { data: inputMessage === "" ? "---" : inputMessage, send: true },
    ]);
    setInputMessage("");
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
        {chat.length > 0 ? (
          <div className="flex w-2/3 flex-col items-center justify-center gap-1 bg-slate-300 p-5">
            <Heading variant="h2">Chat:</Heading>
            {chat.map(({ send, data }, index) => (
              <div
                key={index}
                className={`flex w-full flex-row items-center ${
                  send ? "justify-end" : "justify-start"
                }`}
              >
                <h3>{JSON.stringify(JSON.parse(data))}</h3>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-row items-center justify-around gap-5">
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
