import { useEffect, useRef, useState } from "react";

interface ReturnProps {
  sendMessage(message: string): void;
  socket: WebSocket | null;
  state: WebSocketState;
}

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

export const useCheckoutWebSocket = (
  onMessage: (event: MessageEvent) => void
): ReturnProps => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>("disconnected");

  useEffect(() => {
    setState("connecting");
    const ws = new WebSocket(
      `${process.env.REACT_APP_WS_API_URL}/ws/testWebsocket/`
    );

    ws.onopen = () => setState("connected");
    ws.onerror = () => setState("error");
    ws.onclose = () => setState("disconnected");
    ws.onmessage = onMessage;

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
      setState("disconnected");
    };
  }, []);

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
