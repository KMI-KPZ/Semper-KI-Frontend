import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = (props) => {
  const {} = props;

  const isChatbotEnabled = false;
  useEffect(() => {
    if (true || isChatbotEnabled) {
      const script = document.createElement("script");

      script.src =
        "http://localhost:38080/kbot-widget/bots/preview/w4_MnnyqE2tAZJPHr_0jTB0ZfJaI77N6_GAgnVr_1FQ=/widget.js";

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

  window.addEventListener('message', (e) => {
    try {
      const chatbotResponse = JSON.parse(e.data);
      console.log(chatbotResponse)
      if (chatbotResponse.eventType === 'responseFromChatbot') {
        const userRequest = chatbotResponse.request.request.payload.text;
        console.log(userRequest)
      }
    } catch {
    }
  })

  const getHeadersText = () => {
    const headers = [];
    const h1Elements = document.getElementsByTagName('h1');
    const h2Elements = document.getElementsByTagName('h2');

    for(let i = 0; i < h1Elements.length; i++) {
      headers.push(h1Elements[i].innerText);
    }

    for(let i = 0; i < h2Elements.length; i++) {
      headers.push(h2Elements[i].innerText);
    }

    // as strin

    return headers.join(',');
  };

  console.log("Überschriften: " + getHeadersText());

  // obtain ChatbotIframe from global browser window object
  const bot = window.ChatbotIframe;
  if(bot !== undefined) {
    bot.eventsBus.emit('openChatbot', {query: '__[++ (Seitenthemen: ' + getHeadersText() + ')]__'});
    console.log("query: '__[++ (Seitenthemen: " + getHeadersText() + ")]__'");
    }

  return (
    <></>
    // <script src="https://chat.semper-ki.org/kbot-widget/bots/preview/Uf50Hf6LKvI3iE88WxT7Hysp8n50N0BU0ih9AsnlLvQ=/widget.js"></script>
  );
};

export default Chatbot;
