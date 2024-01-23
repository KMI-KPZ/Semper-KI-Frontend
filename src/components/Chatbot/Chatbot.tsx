import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = (props) => {
  const {} = props;
  //   useEffect(() => {
  //     const script = document.createElement("script");

  //     // URL des Scripts setzen
  //     script.src =
  //       "https://dev.semper-ki.org:39080/kbot-widget/bots/preview/VYK27sy7BYTr5IEV5NpNrd-EWU5NT4ZPQJGx_STuZjM=/widget.js";

  //     // Optional: Weitere Attribute setzen, z.B. async oder defer
  //     script.async = true;

  //     // Script-Element zum Dokument hinzufügen
  //     document.body.appendChild(script);
  //   }, []);

  return (
    <script src="https://dev.semper-ki.org:39080/kbot-widget/bots/preview/VYK27sy7BYTr5IEV5NpNrd-EWU5NT4ZPQJGx_STuZjM=/widget.js"></script>
  );
};

export default Chatbot;
