import { Button, Container, Heading } from "@component-library/index";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useEffect, useState } from "react";
import ProcessConditionItem from "./ConditionItem";
import { useTranslation } from "react-i18next";

interface ProcessStatusButtonsProps {
  start: ProcessStatus;
  end: ProcessStatus;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { end, start } = props;
  const { process } = useProcess();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();
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

  const show = process.processStatus >= start && process.processStatus <= end;

  return show && getProcessStatusButtons(process).length > 0 ? (
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
            {t("Process.components.StatusButtons.heading")}
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
  ) : null;
};

export default ProcessStatusButtons;
