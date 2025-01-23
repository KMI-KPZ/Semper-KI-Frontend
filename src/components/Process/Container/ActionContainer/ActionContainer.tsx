import { Button, Container, Heading } from "@component-library/index";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import { useEffect, useState } from "react";
import ProcessConditionItem from "./components/ConditionItem";
import { useTranslation } from "react-i18next";
import ActionContainerWarpper, {
  isProcessFailed,
} from "./components/FailedContainer";
import ActionStatusCard from "../../ActionStatusCard";

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
        {process.processErrors === undefined ||
        process.processErrors.length === 0 ? null : (
          <Container
            align="center"
            direction="col"
            wrap="wrap"
            className={`gap-5 rounded-md border-2 px-10 py-5 md:min-w-[500px] ${
              error ? "border-red-500" : ""
            }`}
          >
            <Heading variant="h2">
              {t("components.Process.Container.ActionContainer.heading")}
            </Heading>
            {process.processErrors.map((error, index) => (
              <ProcessConditionItem key={index} error={error} />
            ))}
          </Container>
        )}
        {process.actionStatus !== "ACTION_REQUIRED" &&
        statusButtons.length > 0 ? (
          <ActionStatusCard process={process} className="w-fit" />
        ) : null}
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
                onClick={() => handleOnClickButton(button, process.processID)}
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
