// import Chatbot

class Chatbot {
  chatbot: object;
  topics: string[] = [];

  constructor() {
    this.chatbot = window.ChatbotIframe;
  }

  init() {}

  addTopic(topic: string) {
    this.topics.push(topic);
  }

  removeTopic(topic: string) {
    this.topics.filter((t) => t !== topic);
  }
}

export default Chatbot;
