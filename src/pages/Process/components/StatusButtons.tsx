import { Button, Container, Divider } from "@component-library/index";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";

interface ProcessStatusButtonsProps {
  start: ProcessStatus;
  end: ProcessStatus;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { end, start } = props;
  const { process } = useProcess();
  const { t } = useTranslation();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();

  const show = process.processStatus >= start && process.processStatus < end;

  return show && getProcessStatusButtons(process).length > 0 ? (
    <Container width="full" direction="col">
      <Divider />
      <Container width="full" direction="row">
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
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button, process.processID)}
            title={button.title}
          />
          // </PermissionGate>
        ))}
      </Container>
    </Container>
  ) : null;
};

export default ProcessStatusButtons;
