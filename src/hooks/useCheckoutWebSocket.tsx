import { useEffect, useRef, useState } from "react";

interface ReturnProps {
  socket: WebSocket | null;
  state: WebSocketState;
}

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

export const useCheckoutWebSocket = (): ReturnProps => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>("disconnected");

  useEffect(() => {
    setState("connecting");
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_API_URL}/public/testWebsocket/`
    );

    ws.onopen = () => setState("connected");
    ws.onerror = () => setState("error");
    ws.onclose = () => setState("disconnected");

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
      setState("disconnected");
    };
  }, []);

  return { socket, state };
};
