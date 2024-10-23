import { Button, Container } from "@component-library/index";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { ReactNode, useEffect, useState } from "react";

interface ProcessStatusButtonsProps {
  start: ProcessStatus;
  end: ProcessStatus;
  condition?: ReactNode;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { end, start, condition } = props;
  const { process } = useProcess();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();
  const [error, setError] = useState(false);

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
      {condition === undefined ? null : (
        <Container
          direction="col"
          align="center"
          className={`gap-0 rounded-md border-2 px-10 md:min-w-[500px] ${
            error ? "border-red-500" : ""
          }`}
        >
          {condition}
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
