import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

interface ClarifyTextInputProps {}

const ClarifyTextInput: React.FC<ClarifyTextInputProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const { user } = useAuthorizedUser();
  const [message, setMessage] = useState<string>();
  const updateProcess = useUpdateProcess();
  const navigate = useNavigate();

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prevState) => e.target.value);
  };

  const handleOnClickButtonSend = () => {
    if (message !== undefined && message !== "")
      updateProcess.mutate(
        {
          processIDs: [process.processID],
          updates: {
            changes: {
              messages: {
                date: new Date().toISOString(),
                text: message,
                userID: user.hashedID,
                userName: user.name,
              },
            },
          },
        },
        {
          onSuccess(data, variables, context) {
            setMessage((prevState) => "");
          },
        }
      );
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      handleOnClickButtonSend();
    }
    if (e.code == "Enter" && e.shiftKey == true) {
      e.preventDefault();
      setMessage((prevState) => prevState + "\n");
    }
  };

  return (
    <Container width="full" direction="row" className="">
      <textarea
        className={`min-h-[68px] w-full resize-y rounded-xl border-2 px-4 py-2`}
        value={message}
        placeholder={t("Projects.Project.Process.components.Chat.placeholder")}
        onChange={handleOnChangeTextArea}
        onKeyDown={onEnterPress}
      />
      <Button
        // endIcon={<SendIcon />}
        size="sm"
        variant="primary"
        onClick={handleOnClickButtonSend}
        title={t("Projects.Project.Process.components.Chat.button.send")}
      />
    </Container>
  );
};

export default ClarifyTextInput;
