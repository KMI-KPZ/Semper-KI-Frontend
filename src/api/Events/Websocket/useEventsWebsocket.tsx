import { useEffect, useRef, useState } from "react";
import useUser, { UserType } from "@/hooks/useUser";
import logger from "@/hooks/useLogger";
import { useQueryClient } from "@tanstack/react-query";

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
    const queryClient = useQueryClient();

    useEffect(() => {
      const createWebSocket = () => {
        try {
          const ws = new WebSocket(
            `${process.env.VITE_WS_API_URL}/ws/generalWebsocket/`
          );
          ws.onopen = () => {
            setState("connected");
            logger("useEventsWebsocket | connected");
          };

          ws.onmessage = () => {
            queryClient.invalidateQueries(["events"]);
          };

          ws.onerror = () => {
            setState("error");
            logger("useEventsWebsocket | error");
            // Attempt to reconnect after a delay
            scheduleReconnect();
          };

          ws.onclose = () => {
            setState("disconnected");
            logger("useEventsWebsocket | disconnected");
            // Attempt to reconnect after a delay
            scheduleReconnect();
          };

          setSocket(ws);
        } catch (error) {
          return;
        }
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
