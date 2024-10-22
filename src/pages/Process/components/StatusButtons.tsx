import { Button, Container, Divider } from "@component-library/index";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

interface ProcessStatusButtonsProps {
  start: ProcessStatus;
  end: ProcessStatus;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { end, start } = props;
  const { process } = useProcess();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();

  const show = process.processStatus >= start && process.processStatus <= end;

  return show && getProcessStatusButtons(process).length > 0 ? (
    <Container width="full" direction="col" className="bg-white p-5">
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
