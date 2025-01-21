import { Button, Container, Heading, Text } from "@component-library/index";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useEffect, useState } from "react";
import ProcessConditionItem from "./ConditionItem";
import { useTranslation } from "react-i18next";
import useUser, { UserType } from "@/hooks/useUser";
import ProcessFailed, { isProcessFailed } from "./Failed";

interface ActionContainerProps {
  start: ProcessStatus;
  end?: ProcessStatus;
}

const ActionContainer: React.FC<ActionContainerProps> = (props) => {
  const { end, start } = props;
  const { process } = useProcess();
  const { user } = useUser();
  const { getStatusButtons: getProcessStatusButtons, handleOnClickButton } =
    useStatusButtons();
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

  if (showDependingOnProcessStatus && isProcessFailed(process))
    return <ProcessFailed />;
  return showDependingOnProcessStatus &&
    getProcessStatusButtons(process).length > 0 ? (
    <Container width="full" direction="col" className="bg-white p-5">
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
      <Container width="full" direction="row" wrap="wrap">
        {getProcessStatusButtons(process).map((button, index) => (
          // <PermissionGate
          //   element={
          //     button.action.type === "function" &&
          //     button.action.function.type === "deleteProcess"
          //       ? "ProjectButtonDelete"
          //       : `ProjectStatusButtons`
          //   }
          //   key={index}
          // >
          <Button
            key={index}
            variant={button.buttonVariant}
            size="sm"
            startIcon={
              button.buttonVariant === "secondary" ? (
                <ArrowBackOutlinedIcon />
              ) : undefined
            }
            endIcon={
              button.buttonVariant === "primary" ? (
                <ArrowForwardOutlinedIcon />
              ) : undefined
            }
            onClick={() => handleOnClickButton(button, process.processID)}
            onClickError={() => handleOnClickButtonError()}
            title={button.title}
            active={button.active}
          />
          // </PermissionGate>
        ))}
      </Container>
    </Container>
  ) : showDependingOnProcessStatus ? (
    <Container width="full" direction="col" className="bg-white p-5">
      <Text className=" rounded-md border-2 border-green-500 p-5">
        {t(
          `components.Process.Container.ActionContainer.${
            user.usertype === UserType.ANONYM ||
            (user.usertype === UserType.USER &&
              user.hashedID === process.client) ||
            (user.usertype === UserType.ORGANIZATION &&
              user.organization === process.client)
              ? "noButtonsClient"
              : process.processStatus === ProcessStatus.COMPLETED
              ? "finished"
              : "noButtonsContractor"
          }`
        )}
      </Text>
    </Container>
  ) : null;
};

export default ActionContainer;
