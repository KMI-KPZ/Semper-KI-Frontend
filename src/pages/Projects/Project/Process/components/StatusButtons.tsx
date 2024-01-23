import { Button } from "@component-library/index";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import React from "react";
import useStatusButtons from "../../hooks/useStatusButtons";

interface ProcessStatusButtonsProps {
  process: ProcessProps;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { getProcessStatusButtons, handleOnClickButton } = useStatusButtons();

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
      {getProcessStatusButtons(process).map((button, index) => (
        <PermissionGate element={`ProjectButton${button.title}`} key={index}>
          <Button
            key={index}
            variant={button.priority}
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button, process.processID)}
            title={`${t(
              `Projects.Project.hooks.useStatusButtons.${button.title}`
            )}`}
          />
        </PermissionGate>
      ))}
    </div>
  );
};

export default ProcessStatusButtons;
