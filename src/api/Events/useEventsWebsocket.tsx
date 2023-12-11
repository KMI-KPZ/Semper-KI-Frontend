import { useEffect, useRef, useState } from "react";
import logger from "@/hooks/useLogger";
import useUser, { UserType } from "@/hooks/useUser";

interface useEventsWebsocketReturnProps {
  sendMessage(message: string): void;
  socket: WebSocket | null;
  state: WebSocketState;
}

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

export const useEventsWebsocket =
  (): // onMessage: (event: MessageEvent) => void
  useEventsWebsocketReturnProps => {
    const { user } = useUser();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [state, setState] = useState<WebSocketState>("disconnected");
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const createWebSocket = () => {
        const ws = new WebSocket(
          `${process.env.VITE_WS_API_URL}/ws/generalWebsocket/`
        );

        ws.onopen = () => {
          setState("connected");
          logger("useEventsWebsocket |  connected");
        };

        ws.onerror = () => {
          setState("error");
          logger("useEventsWebsocket |  error");
          // Attempt to reconnect after a delay
          scheduleReconnect();
        };

        ws.onclose = () => {
          setState("disconnected");
          logger("useEventsWebsocket |  disconnected");
          // Attempt to reconnect after a delay
          scheduleReconnect();
        };

        // ws.onmessage = (event: MessageEvent) => {
        //   // logger("useEventsWebsocket |  onmessage", event);
        //   onMessage(event);
        // };

        setSocket(ws);
      };

      const scheduleReconnect = () => {
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
        }

        // Retry connecting after a delay (e.g., 5 seconds)
        reconnectTimeout.current = setTimeout(() => {
          createWebSocket();
        }, 5000); // Adjust the delay as needed
      };

      if (state !== "connected" && user.usertype !== UserType.ANONYM) {
        setState("connecting");
        createWebSocket();
      }

      return () => {
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
        }

        if (socket) {
          socket.close();
          setSocket(null);
          setState("disconnected");
        }
      };
    }, [user]);

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
