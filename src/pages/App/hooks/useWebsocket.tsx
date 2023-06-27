import { useEffect, useRef, useState } from "react";
import logger from "@/hooks/useLogger";
import { UserType } from "@/hooks/useUser/types";

interface ReturnProps {
  sendMessage(message: string): void;
  socket: WebSocket | null;
  state: WebSocketState;
}

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

export const useWebsocket = (
  onMessage: (event: MessageEvent) => void,
  load: boolean,
  userType: UserType
): ReturnProps => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>("disconnected");

  useEffect(() => {
    if (
      load === true &&
      state !== "connected" &&
      userType !== UserType.anonym
    ) {
      setState("connecting");
      const ws = new WebSocket(
        `${import.meta.env.VITE_WS_API_URL}/ws/generalWebsocket/`
      );

      ws.onopen = () => {
        setState("connected");
        logger("useWebsocket | connected");
      };
      ws.onerror = () => {
        setState("error");
        logger("useWebsocket | error");
      };
      ws.onclose = () => {
        setState("disconnected");
        logger("useWebsocket | disconnected");
      };
      ws.onmessage = (event: MessageEvent) => {
        onMessage(event);
      };

      setSocket(ws);

      return () => {
        ws.close();
        setSocket(null);
        setState("disconnected");
      };
    }
  }, [load, userType]);

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
