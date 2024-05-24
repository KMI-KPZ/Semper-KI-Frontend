import { Button } from "@component-library/index";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface ProcessStatusButtonsProps {
  process: Process;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
      {getProcessStatusButtons(process).map((button, index) => (
        <PermissionGate
          element={
            button.action.type === "function" &&
            button.action.function.type === "deleteProcess"
              ? "ProjectButtonDelete"
              : `ProjectStatusButtons`
          }
          key={index}
        >
          <Button
            key={index}
            variant={button.buttonVariant}
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button, process.processID)}
            title={button.title}
          />
        </PermissionGate>
      ))}
    </div>
  );
};

export default ProcessStatusButtons;
