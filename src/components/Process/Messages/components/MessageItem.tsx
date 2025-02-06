import React from "react";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { ChatMessageProps } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";

interface ProcessMessageItemProps {
  message: ChatMessageProps;
  sameAuthor?: boolean;
}

const ProcessMessageItem: React.FC<ProcessMessageItemProps> = (props) => {
  const { message, sameAuthor = false } = props;
  const { user } = useAuthorizedUser();

  return (
    <Container
      direction="col"
      width="full"
      gap={3}
      align={message.userID === user?.hashedID ? "end" : "start"}
      className="min-w-[200px] "
    >
      <Container
        width="fit"
        direction="col"
        align="end"
        className=" rounded-md bg-white p-3"
      >
        {sameAuthor ? null : <span className="px-2">{message.userName}</span>}
        <Container
          direction="row"
          className={`
          card  bg-white p-3
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
    </Container>
  );
};

export default ProcessMessageItem;
