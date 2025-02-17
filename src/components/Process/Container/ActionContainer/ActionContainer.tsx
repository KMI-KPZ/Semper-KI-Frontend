import { Button, Container } from "@component-library/index";
import useStatusButtons, {
  StatusButtonProps,
} from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ActionContainerWarpper, {
  isProcessFailed,
} from "./components/FailedContainer";
import ActionStatusCard from "../../ActionStatusCard";
import logger from "@/hooks/useLogger";
import ActionContainerTodos from "./components/Todos";

interface ActionContainerProps {
  start: ProcessStatus;
  end?: ProcessStatus;
}

const ActionContainer: React.FC<ActionContainerProps> = (props) => {
  const { end, start } = props;
  const { process } = useProcess();
  const { getStatusButtons, handleOnClickButton } = useStatusButtons();
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const handleOnClickButtonError = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const handleOnClickButtonIntercept = (
    button: StatusButtonProps,
    processID: string
  ) => {
    if (
      button.action.type === "request" &&
      button.action.data.type === "deleteProcess"
    ) {
      window.confirm(
        t("components.Process.Container.ActionContainer.deleteConfirm")
      ) === true
        ? handleOnClickButton(button, processID)
        : logger("delete canceled");
    } else {
      handleOnClickButton(button, processID);
    }
  };

  const showDependingOnProcessStatus =
    process.processStatus >= start &&
    ((end !== undefined && process.processStatus <= end) || end === undefined);

  const statusButtons = getStatusButtons(
    process,
    process.actionStatus !== "ACTION_REQUIRED"
  );

  if (showDependingOnProcessStatus)
    return (
      <ActionContainerWarpper failed={isProcessFailed(process)}>
        <ActionContainerTodos process={process} error={error} />
        {statusButtons.length > 0 ? (
          <Container width="full" direction="row" wrap="wrap">
            {statusButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.buttonVariant}
                size="sm"
                startIcon={
                  button.iconPosition === "left" ? button.icon : undefined
                }
                endIcon={
                  button.iconPosition === "right" ? button.icon : undefined
                }
                onClick={() =>
                  handleOnClickButtonIntercept(button, process.processID)
                }
                onClickError={() => handleOnClickButtonError()}
                title={button.title}
                active={button.active}
              />
            ))}
          </Container>
        ) : process.processStatus !== ProcessStatus.DRAFT ? (
          <ActionStatusCard process={process} className="w-fit" />
        ) : null}
      </ActionContainerWarpper>
    );
  return null;
};

export default ActionContainer;
