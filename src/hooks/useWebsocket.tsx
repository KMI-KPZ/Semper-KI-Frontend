import { useEffect, useRef, useState } from "react";

interface ReturnProps {
  sendMessage(message: string): void;
  socket: WebSocket | null;
  state: WebSocketState;
}

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

export const useWebsocket = (
  onMessage: (event: MessageEvent) => void,
  load: boolean
): ReturnProps => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>("disconnected");

  useEffect(() => {
    if (load === true && state !== "connected") {
      // console.log("useWebsocket | connecting");

      setState("connecting");
      const ws = new WebSocket(
        `${process.env.REACT_APP_WS_API_URL}/ws/generalWebsocket/`
      );

      ws.onopen = () => {
        setState("connected");
        console.log("useWebsocket | connected");
      };
      ws.onerror = () => {
        setState("error");
        console.log("useWebsocket | error");
      };
      ws.onclose = () => {
        setState("disconnected");
        console.log("useWebsocket | disconnected");
      };
      ws.onmessage = (event: MessageEvent) => {
        onMessage(event);
        console.log("useWebsocket | onmessage | ", event);
      };

      setSocket(ws);

      return () => {
        ws.close();
        setSocket(null);
        setState("disconnected");
      };
    }
  }, [load]);

  const sendMessage = (message: string) => {
    if (state === "connected") {
      socket?.send(
        JSON.stringify({
          type: "text",
          data: message,
        })
      );
    }
  };

  return { sendMessage, socket, state };
};
