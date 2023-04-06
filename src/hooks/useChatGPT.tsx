import { useEffect, useRef, useState } from "react";

type ChatGPTWebSocketHookResult = {
  messages: string[];
  sendMessage: (message: string) => void;
  state: WebSocketState;
};

type WebSocketState = "connecting" | "connected" | "disconnected" | "error";

const useChatGPTWebSocket = (): ChatGPTWebSocketHookResult => {
  const apiKey = "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";
  const [messages, setMessages] = useState<string[]>([]);
  const [state, setState] = useState<WebSocketState>("disconnected");
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    setState("connecting");
    const ws = new WebSocket("wss://api.openai.com/websocket/v1");
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setState("connected");
      // Send authentication message to ChatGPT API
      ws.send(
        JSON.stringify({
          type: "authenticate",
          api_key: apiKey,
        })
      );
    });

    ws.addEventListener("message", (event: MessageEvent) => {
      const response = JSON.parse(event.data);

      if (response.type === "text") {
        setMessages((messages) => [...messages, response.data]);
      } else if (response.type === "error") {
        setState("error");
      }
    });

    ws.addEventListener("close", () => {
      setState("disconnected");
    });

    ws.addEventListener("error", () => {
      setState("error");
    });

    return () => {
      // Close the WebSocket connection when the component unmounts
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (state === "connected") {
      wsRef.current?.send(
        JSON.stringify({
          type: "text",
          data: message,
        })
      );
    }
  };

  return { messages, sendMessage, state };
};

export default useChatGPTWebSocket;
