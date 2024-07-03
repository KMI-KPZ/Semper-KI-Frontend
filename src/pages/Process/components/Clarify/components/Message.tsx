import React from "react";
import { useTranslation } from "react-i18next";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { ChatMessageProps } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";

interface ClarifyMessageProps {
  message: ChatMessageProps;
}

const ClarifyMessage: React.FC<ClarifyMessageProps> = (props) => {
  const { message } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();

  return (
    <Container
      direction="col"
      width="full"
      gap={3}
      align={message.userID === user?.hashedID ? "end" : "start"}
      className="min-w-[200px]"
    >
      <span className="px-2">{message.userName}</span>
      <Container
        direction="row"
        className={`
         card  p-3
         ${
           message.userID === user?.hashedID ? "flex-row-reverse" : "flex-row"
         }`}
      >
        <span>{message.text}</span>
        <span className="text-xs">
          {new Date(message.date).toLocaleString()}
        </span>
      </Container>
    </Container>
  );
};

export default ClarifyMessage;
