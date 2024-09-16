import React, {useEffect, useRef} from "react";
import {useTopics} from "@/contexts/ChatbotContextProvider";
import {Button} from "@component-library/index";
import {MessageSharp} from "@mui/icons-material";

interface ChatbotProps {
}

function decodeHTMLEntities(text: string): string {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || "";
}

// function formatTopics(topics: Map<string, string>): Array<{ key: string, help_intro: string }> {
//     const formattedTopics: Array<{ key: string, help_intro: string }> = [];
//     topics.forEach((value, key) => {
//         formattedTopics.push({key, help_intro: value});
//     });
//     return formattedTopics;
// }

function formatTopicsToJSON(topics: Map<string, string>): string {
    const formattedTopics: Array<{ key: string, help_intro: string }> = [];
    topics.forEach((value, key) => {
        formattedTopics.push({key, help_intro: value});
    });
    return JSON.stringify(formattedTopics);

}

function extractAndParseJSON(input: string): any {
    // Extrahiere den JSON-Teil zwischen  <pre><code>##JSON{&quot;more_help&quot;: &quot;semper-ki&quot;}##</code></pre>
    const jsonMatch = input.match(/##JSON{(.+)}##/);
    if (jsonMatch && jsonMatch[1]) {
        const jsonString = `{${jsonMatch[1]}}`;
        // Dekodiere HTML-Entities
        const decodedString = decodeHTMLEntities(jsonString);
        // Parse JSON
        return JSON.parse(decodedString);
    }
    return { "empty": true };
}

function formatDynamicPrompt(topics: Map<string, string>, maintopic: string, choices: object,): object {
    return {query: '__[++ {topics: "' + formatTopicsToJSON(topics) + '", maintopic: {"' + maintopic + '"}}, currentChoices: ' + JSON.stringify(choices) + ']__'}
}

const Chatbot: React.FC<ChatbotProps> = (props) => {
    const {} = props;
    const {
        topics,
        maintopic,
        response,
        choices,
        userChoice,
        setTopics,
        setUserChoice,
        closeChatbot,
        removeTopics,
        detailedHelp
    } = useTopics();
    let lastAnswer = useRef("");
    let botAlreadyLoaded = useRef(false);
    let botAlreadyOpenend = useRef(false);
    let eventListenerAttached: boolean = false;
    const detailedHelpRef = useRef(detailedHelp);

    const sendDetailedHelp = (helpKey: string) => {
        debugger;
        helpKey = helpKey.trim().toLowerCase();
        const bot = window.ChatbotIframe;
        if (bot == undefined || ! botAlreadyOpenend.current) {
            return;
        }
        const helpText = detailedHelpRef.current.get(helpKey);
        if (helpText) {
            if (bot !== undefined && botAlreadyOpenend.current) {
                bot.eventsBus.emit('askChatbot', {query: '__[detailed help for topic "' + helpKey + '": ' + helpText + ']__'});
            }
            return
        }

        if (bot !== undefined && botAlreadyOpenend.current) {
            bot.eventsBus.emit('askChatbot', {query: '__[no detailed help for topic "' + helpKey + '"]__'});
        }
    }

    const isChatbotEnabled = true;
    // process.env.NODE_ENV === "production";
    useEffect(() => {

        detailedHelpRef.current = detailedHelp;

        if (isChatbotEnabled && !botAlreadyLoaded.current) {
            const script = document.createElement("script");
            botAlreadyLoaded.current = true;
            console.log("Chatbot will be loaded")
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

        if (topics) {
            console.log("topics for chatbot: " + formatTopicsToJSON(topics));
            const bot = window.ChatbotIframe;
            if (bot !== undefined && botAlreadyOpenend.current) {
                alert("Chatbot is already open");
                // bot.eventsBus.emit('openChatbot', {query: '__[++ {topics: "' + topics.join(",") + '", maintopic: {"' + maintopic+ '"}}, currentChoices: '+ JSON.stringify(choices)+ ']__'});

                bot.eventsBus.emit('askChatbot', formatDynamicPrompt(topics, maintopic, choices));
                console.log("query: ", '__[++ {topics: "' + formatTopicsToJSON(topics) + '", maintopic: {"' + maintopic + '"}}, currentChoices: ' + JSON.stringify(choices) + '__');
            }

            if (closeChatbot === true) {
                bot.eventsBus.emit('closeChatbot');
            }
        }


    }, [topics, closeChatbot, setTopics, maintopic, choices, detailedHelp]);

    window.addEventListener('message', (e) => {
        // console.log("Message received: "); console.log(e.data);
        try {
            const chatbotResponse = JSON.parse(e.data);
            console.log("Chatbotresponse: ", chatbotResponse);

            if (chatbotResponse.eventType === 'responseFromChatbot') {
                if (chatbotResponse.action === 'runCommand' && chatbotResponse.response?.response?.shouldEndSession === true) {
                    botAlreadyOpenend.current = false;
                    console.log("Chatbot session ended");
                }

                const botResponse = chatbotResponse.response;
                console.log("Chatbot things: ", botResponse.response?.payload?.[0]?.conversation?.bubbles?.[0]?.content);
                try {
                    const parsedObject = extractAndParseJSON(botResponse.response?.payload?.[0]?.conversation?.bubbles?.[0]?.content);
                    console.log("Chatbot JSON", parsedObject);

                    if(parsedObject.empty)  {
                        lastAnswer.current = "";
                    }
                    if(parsedObject.decision){
                        setUserChoice(parsedObject.decision);
                    }
                    if(parsedObject.more_help && parsedObject.more_help !== lastAnswer.current){
                        lastAnswer.current = parsedObject.more_help;
                        sendDetailedHelp(parsedObject.more_help);
                    }
                } catch (error) {
                    // console.log("Chatbot JSON parsing error: ", error);
                }
            }

            if (chatbotResponse.eventType === 'startSession') {
                console.log("Chatbot session started");
                // bot.eventsBus.emit('openChatbot', {query: '__[++ {topics: "' + topics.join(",") + '", maintopic: {"' + maintopic+ '"}}, currentChoices: '+ JSON.stringify(choices)+ ']__'});
            }
        } catch {
        }
    })

    // const getHeadersText = () => {
    //   const headers = [];
    //   const h1Elements = document.getElementsByTagName('h1');
    //   const h2Elements = document.getElementsByTagName('h2');
    //
    //   for(let i = 0; i < h1Elements.length; i++) {
    //     headers.push(h1Elements[i].innerText);
    //   }
    //
    //   for(let i = 0; i < h2Elements.length; i++) {
    //     headers.push(h2Elements[i].innerText);
    //   }
    //
    //   // as strin
    //
    //   return headers.join(',');
    // };

    // console.log("Überschriften: " + getHeadersText());

    // obtain ChatbotIframe from global browser window object

    const handleOnClickButton = () => {
        const bot = window.ChatbotIframe;
        if (bot !== undefined && !botAlreadyOpenend.current) {
            bot.eventsBus.emit('openChatbot', {query: '__[++ {topics: "' + formatTopicsToJSON(topics) + '", maintopic: {"' + maintopic + '"}}, currentChoices: ' + JSON.stringify(choices) + ']__'});
            botAlreadyOpenend.current = true;
            console.log("query: '__[++ (Seitenthemen: " + formatTopicsToJSON(topics) + ")]__'");
        }
        if (bot !== undefined && botAlreadyOpenend.current) {
            bot.eventsBus.emit('askChatbot', {query: '__[++ {topics: "' + formatTopicsToJSON(topics) + '", maintopic: {"' + maintopic + '"}}, currentChoices: ' + JSON.stringify(choices) + ']__'});
        }
    }


    return (
        <div className="fixed bottom-4 right-4 z-50 bg-white">
            <Button
                width="fit"
                title={"CHATBOT"}
                variant="text"
                onClick={handleOnClickButton}
                startIcon={<MessageSharp fontSize="large"/>}
            />
        </div>
    );
    // <script src="https://chat.semper-ki.org/kbot-widget/bots/preview/Uf50Hf6LKvI3iE88WxT7Hysp8n50N0BU0ih9AsnlLvQ=/widget.js"></script>
};

export default Chatbot;
