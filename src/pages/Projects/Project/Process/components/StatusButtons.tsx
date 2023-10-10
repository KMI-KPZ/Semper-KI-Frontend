import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import useService from "@/pages/Service/hooks/useService";
import EditIcon from "@mui/icons-material/Edit";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { ProcessState } from "@/pages/Projects/hooks/useProcess";

interface ProcessStatusButtonsProps {
  processID: string;
  state: ProcessState;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { state, processID } = props;
  const { t } = useTranslation();
  const { isServiceComplete } = useService();

  const renderButtons = () => {
    if (state === ProcessState.DRAFT)
      return (
        <>
          <PermissionGate element="ProcessButtonEdit">
            <Button
              variant="icon"
              startIcon={<EditIcon />}
              title={t("ProjectRoutes.Process.components.StateButton.edit")}
              to={`process/${processID}`}
            />
          </PermissionGate>

          <PermissionGate element="ProcessButtonContractorSelection">
            <Button
              variant="icon"
              startIcon={<FactoryIcon />}
              title={t(
                "ProjectRoutes.Process.components.StateButton.selectContractor"
              )}
              to={`process/${processID}/contractorSelection`}
              active={isServiceComplete(processID)}
            />
          </PermissionGate>
        </>
      );
    else if (state === ProcessState.CONTRACTOR_SELECTED)
      return (
        <PermissionGate element="ProcessButtonVerify">
          <Button
            variant="icon"
            startIcon={<PolicyIcon />}
            title={t("ProjectRoutes.Process.components.StateButton.verify")}
            to={`process/${processID}/verification`}
          />
        </PermissionGate>
      );
    else if (state === ProcessState.VERIFIED)
      return (
        <PermissionGate element="ProcessButtonRequest">
          <Button
            variant="icon"
            startIcon={<SendIcon />}
            title={t("ProjectRoutes.Process.components.StateButton.request")}
            to={`process/${processID}/checkout`}
          />
        </PermissionGate>
      );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {renderButtons()}
    </div>
  );
};

export default ProcessStatusButtons;
