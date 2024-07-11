import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = (props) => {
  const {} = props;

  const isChatbotEnabled = process.env.NODE_ENV === "production";
  useEffect(() => {
    if (isChatbotEnabled) {
      const script = document.createElement("script");

      script.src =
        "https://chat.semper-ki.org/kbot-widget/bots/preview/Uf50Hf6LKvI3iE88WxT7Hysp8n50N0BU0ih9AsnlLvQ=/widget.js";

      script.async = true;

      document.body.appendChild(script);

      // const iframe = document.getElementById(
      //   "USUChatbotIframe"
      // ) as HTMLIFrameElement;
      // if (iframe) {
      //   const iframeDocument = iframe.contentWindow?.document;
      //   if (iframeDocument) {
      //     const tooltipElement =
      //       iframeDocument.getElementById("usuChatbotTooltip");
      //     if (tooltipElement) {
      //       tooltipElement.style.height = "fit-content";
      //     }
      //   }
      // }
    }
  }, []);

  return (
    <></>
    // <script src="https://chat.semper-ki.org/kbot-widget/bots/preview/Uf50Hf6LKvI3iE88WxT7Hysp8n50N0BU0ih9AsnlLvQ=/widget.js"></script>
  );
};

export default Chatbot;
