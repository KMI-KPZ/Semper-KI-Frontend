import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import useService from "@/pages/Service/hooks/useService";
import EditIcon from "@mui/icons-material/Edit";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import useStatusButtons from "../hooks/useStatusButtons";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface ProcessStatusButtonsProps {
  projectID: string;
  processID: string;
  state: ProcessStatus;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { state, processID: manuelProcessID, projectID } = props;
  const { t } = useTranslation();
  const { isServiceComplete } = useService();
  const { processID } = useParams();
  const { updateStatus } = useStatusButtons();

  const calcPath = (path: string): string => {
    return processID !== undefined && processID !== manuelProcessID
      ? `../${manuelProcessID}/${path}`
      : processID === undefined
      ? `${manuelProcessID}/${path}`
      : `${path}`;
  };

  const onClickButton = (status: ProcessStatus) => {
    updateStatus.mutate({
      projectID: projectID,
      processID: manuelProcessID,
      status: status,
    });
  };

  const renderButtons = () => {
    switch (state) {
      case ProcessStatus.DRAFT:
        return (
          <>
            <PermissionGate element="ProcessButtonEdit">
              <Button
                variant="icon"
                startIcon={<EditIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.service"
                )}
                to={calcPath("service/edit")}
              />
            </PermissionGate>
            <PermissionGate element="ProcessButtonContractorSelection">
              <Button
                variant="icon"
                startIcon={<FactoryIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.selectContractor"
                )}
                to={calcPath("contractorSelection")}
                active={isServiceComplete(manuelProcessID)}
              />
            </PermissionGate>
          </>
        );
      case ProcessStatus.CONTRACTOR_SELECTED:
        return (
          <PermissionGate element="ProcessButtonVerify">
            <Button
              variant="icon"
              startIcon={<PolicyIcon />}
              title={t(
                "Projects.Project.Process.components.StatusButtons.verify"
              )}
              to={calcPath("verification")}
            />
          </PermissionGate>
        );
      case ProcessStatus.VERIFIED:
        return (
          <PermissionGate element="ProcessButtonRequest">
            <Button
              variant="icon"
              startIcon={<SendIcon />}
              title={t(
                "Projects.Project.Process.components.StatusButtons.request"
              )}
              to={calcPath("checkout")}
            />
          </PermissionGate>
        );
      case ProcessStatus.REQUESTED:
        return (
          <>
            <PermissionGate element="ProcessButtonClarification">
              <Button
                variant="icon"
                startIcon={<QuestionMarkIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.clarification"
                )}
                onClick={() => onClickButton(ProcessStatus.CLARIFICATION)}
              />
            </PermissionGate>
            <PermissionGate element="ProcessButtonRejectedByContractor">
              <Button
                variant="icon"
                startIcon={<ClearIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.reject"
                )}
                onClick={() =>
                  onClickButton(ProcessStatus.REJECTED_BY_CONTRACTOR)
                }
              />
            </PermissionGate>
            <PermissionGate element="ProcessButtonConfirmedByContractor">
              <Button
                variant="icon"
                startIcon={<DescriptionIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.confirmContractor"
                )}
                onClick={() =>
                  onClickButton(ProcessStatus.CONFIRMED_BY_CONTRACTOR)
                }
              />
            </PermissionGate>
          </>
        );
      case ProcessStatus.CLARIFICATION:
        return (
          <>
            <PermissionGate element="ProcessButtonRejectedByContractor">
              <Button
                variant="icon"
                startIcon={<ClearIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.reject"
                )}
                onClick={() =>
                  onClickButton(ProcessStatus.REJECTED_BY_CONTRACTOR)
                }
              />
            </PermissionGate>
            <PermissionGate element="ProcessButtonConfirmedByContractor">
              <Button
                variant="icon"
                startIcon={<DescriptionIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.confirmContractor"
                )}
                onClick={() =>
                  onClickButton(ProcessStatus.CONFIRMED_BY_CONTRACTOR)
                }
              />
            </PermissionGate>
          </>
        );
      case ProcessStatus.REJECTED_BY_CONTRACTOR:
        return;
      case ProcessStatus.CONFIRMED_BY_CONTRACTOR:
        return (
          <>
            <PermissionGate element="ProcessButtonRejectedByClient">
              <Button
                variant="icon"
                startIcon={<ClearIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.reject"
                )}
                onClick={() => onClickButton(ProcessStatus.REJECTED_BY_CLIENT)}
              />
            </PermissionGate>
            <PermissionGate element="ProcessButtonConfirmedByClient">
              <Button
                variant="icon"
                startIcon={<CheckIcon />}
                title={t(
                  "Projects.Project.Process.components.StatusButtons.confirm"
                )}
                onClick={() => onClickButton(ProcessStatus.CONFIRMED_BY_CLIENT)}
              />
            </PermissionGate>
          </>
        );
      case ProcessStatus.REJECTED_BY_CLIENT:
        return;
      case ProcessStatus.CONFIRMED_BY_CLIENT:
        return (
          <PermissionGate element="ProcessButtonProduction">
            <Button
              variant="icon"
              startIcon={<FactoryIcon />}
              title={t(
                "Projects.Project.Process.components.StatusButtons.production"
              )}
              onClick={() => onClickButton(ProcessStatus.PRODUCTION)}
            />
          </PermissionGate>
        );
      case ProcessStatus.PRODUCTION:
        return (
          <PermissionGate element="ProcessButtonDelivery">
            <Button
              variant="icon"
              startIcon={<LocalShippingIcon />}
              title={t(
                "Projects.Project.Process.components.StatusButtons.delivery"
              )}
              onClick={() => onClickButton(ProcessStatus.DELIVERY)}
            />
          </PermissionGate>
        );
      case ProcessStatus.DELIVERY:
        return (
          <PermissionGate element="ProcessButtonComplete">
            <Button
              variant="icon"
              startIcon={<DoneAllIcon />}
              title={t(
                "Projects.Project.Process.components.StatusButtons.complete"
              )}
              onClick={() => onClickButton(ProcessStatus.COMPLETED)}
            />
          </PermissionGate>
        );

      default:
        return;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {renderButtons()}
    </div>
  );
};

export default ProcessStatusButtons;
