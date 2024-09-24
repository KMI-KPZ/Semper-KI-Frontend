import { UserContext } from "@/contexts/UserContextProvider";
import { UseMutationResult } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import Chatbot

class Chatbot {

  chatbot : object;
  topics : string[] = [];

    constructor() {
        this.chatbot = window.ChatbotIframe;
    }

    init() {

    }

    addTopic(topic: string) {
        this.topics.push(topic);
    }

    removeTopic(topic: string) {
        this.topics.filter((t) => t !== topic);
    }
}

export default Chatbot;
