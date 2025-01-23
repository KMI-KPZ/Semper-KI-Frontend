import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import useProcess from "@/hooks/Process/useProcess";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";

interface ProcessTextInputProps {
  origin: ProcessOrigin;
}

const ProcessTextInput: React.FC<ProcessTextInputProps> = (props) => {
  const { origin } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { user } = useAuthorizedUser();
  const [message, setMessage] = useState<string>();
  const updateProcess = useUpdateProcess();

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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
                origin: origin,
              },
            },
          },
        },
        {
          onSuccess() {
            setMessage("");
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
        className={`min-h-[68px] w-full resize-y rounded-md border-2 px-4 py-2`}
        value={message}
        placeholder={t(
          "components.Process.Messages.components.TextInput.placeholder"
        )}
        onChange={handleOnChangeTextArea}
        onKeyDown={onEnterPress}
      />
      <Button
        // endIcon={<SendIcon />}
        size="sm"
        variant="primary"
        onClick={handleOnClickButtonSend}
        title={t(
          "components.Process.Messages.components.TextInput.button.send"
        )}
      />
    </Container>
  );
};

export default ProcessTextInput;
