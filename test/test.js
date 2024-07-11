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