import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import logger from "@/hooks/useLogger";
import ClarifyTextInput from "./components/TextInput";
import ClarifyMessage from "./components/Message";

interface ProcessClarifyProps {}

const ProcessClarify: React.FC<ProcessClarifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <ProcessContainer
      id="clarification"
      menuButtonTitle={t("Process.components.Clarify.Clarify.button.menu")}
      pageTitle={`${t("Process.components.Clarify.Clarify.title")}:`}
      start={ProcessStatus.REQUESTED}
      end={ProcessStatus.CLARIFICATION}
    >
      {process.messages.length === 0 ? (
        <Container width="full" direction="col" className="card">
          <Text>{t("Process.components.Clarify.Clarify.noMessages")}</Text>
        </Container>
      ) : (
        <Container
          width="full"
          direction="col"
          justify="start"
          className={`max-h-96 flex-col-reverse overflow-x-auto p-5`}
        >
          {[...process.messages]
            .reverse()
            .map((message, index, allMessages) => (
              <ClarifyMessage
                key={index}
                message={message}
                sameAuthor={
                  allMessages[index + 1] !== undefined &&
                  allMessages[index + 1].userName === message.userName
                }
              />
            ))}
        </Container>
      )}
      <ClarifyTextInput />
    </ProcessContainer>
  );
};

export default ProcessClarify;
