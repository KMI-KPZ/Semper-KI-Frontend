import { UserProps, UserType } from "@/hooks/useUser/types";
import { Button } from "@component-library/Button";
import React, { Dispatch, SetStateAction, useContext } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { AppContext } from "@/pages/App/App";
import InfoIcon from "@mui/icons-material/Info";
import useProjectEventChange from "../../hooks/useProjectEventChange";
import { ProjectEventItem } from "@/pages/App/types";
import { Badge } from "@component-library/Badge";
import MailIcon from "@mui/icons-material/Mail";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "@/pages/Projects/hooks/useProcess";
import { ProcessComponentState } from "../Process";

interface ProcessButtonsProps {
  user: UserProps | undefined;
  projectID: string;
  process: ProcessProps;
  updateStatus: (status: ProcessStatus) => void;
  setState: Dispatch<SetStateAction<ProcessComponentState>>;
  projectEvent?: ProjectEventItem;
}

const ProcessButtons: React.FC<ProcessButtonsProps> = (props) => {
  const { projectID, process, user, updateStatus, setState, projectEvent } =
    props;
  const { t } = useTranslation();
  const { deleteEvent } = useContext(AppContext);
  const { deleteProcess, updateProcessWithProcessID } = useProcess();
  const { getDeleteProjectEvent } = useProjectEventChange(
    process,
    projectID,
    true
  ); // todo: check if this is correct

  const handleOnClickButtonCancel = () => {
    if (window.confirm(t("Projects.ProjectView.confirm.cancel"))) {
      deleteProcess.mutate(process.processID);
    }
  };
  const handleOnClickButtonReProject = () => {
    if (window.confirm(t("Projects.ProjectView.confirm.reProject"))) {
      logger("//TODO ReProject");
    }
  };
  const handleOnClickButtonReject = () => {
    if (window.confirm(t("Projects.ProjectView.confirm.reject"))) {
      updateStatus(ProcessStatus.REJECTED_BY_CONTRACTOR);
    }
  };
  const handleOnClickButtonConfirm = () => {
    // if (window.confirm(t("ProjectView.button.confirm") + "?")) {
    updateStatus(ProcessStatus.CONFIRMED_BY_CONTRACTOR);
    // }
  };
  const handleOnClickButtonVerify = () => {
    // if (window.confirm(t("ProjectView.button.verify") + "?")) {
    updateStatus(ProcessStatus.CLARIFICATION);
    // }
  };

  const handleOnClickButtonChat = () => {
    deleteEvent(getDeleteProjectEvent("message"));
    setState((prevState) => ({ ...prevState, chatOpen: true }));
  };

  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };
  const handleOnClickButtonInfo = () => {
    setState((prevState) => ({ ...prevState, infoOpen: true }));
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:flex-nowrap">
      <Button
        variant="icon"
        width="fit"
        size="sm"
        children={<InfoIcon />}
        onClick={handleOnClickButtonInfo}
        title={t("Projects.ProjectView.button.info")}
      />
      {user !== undefined ? (
        <PermissionGate element="ProcessButtonChat">
          {projectEvent !== undefined &&
          projectEvent.messages !== undefined &&
          projectEvent.messages > 0 ? (
            <Badge count={projectEvent.messages}>
              <Button
                variant="icon"
                width="fit"
                size="sm"
                children={<MailIcon />}
                onClick={handleOnClickButtonChat}
                title={t("Projects.ProjectView.button.chat")}
              />
            </Badge>
          ) : (
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<MailIcon />}
              onClick={handleOnClickButtonChat}
              title={t("Projects.ProjectView.button.chat")}
            />
          )}
        </PermissionGate>
      ) : null}
      {process.processStatus <= ProcessStatus.REQUESTED ? (
        <PermissionGate element="ProcessButtonDelete">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<DeleteIcon />}
            onClick={handleOnClickButtonCancel}
            title={t("Projects.ProjectView.button.cancel")}
          />
        </PermissionGate>
      ) : null}
      {process.processStatus === ProcessStatus.COMPLETED ? (
        <PermissionGate element="ProcessButtonReProject">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<ReplayIcon />}
            onClick={handleOnClickButtonReProject}
            title={t("Projects.ProjectView.button.reProject")}
          />
        </PermissionGate>
      ) : null}

      {process.processStatus >= ProcessStatus.REJECTED_BY_CONTRACTOR &&
      process.processStatus <= ProcessStatus.CONFIRMED_BY_CONTRACTOR ? (
        <>
          <PermissionGate element="ProcessButtonReject">
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<DeleteIcon />}
              onClick={handleOnClickButtonReject}
              title={t("Projects.ProjectView.button.reject")}
            />
          </PermissionGate>
          <PermissionGate element="ProcessButtonConfirm">
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<CheckIcon />}
              onClick={handleOnClickButtonConfirm}
              title={t("Projects.ProjectView.button.confirm")}
            />
          </PermissionGate>
        </>
      ) : null}
      {process.processStatus === ProcessStatus.CONFIRMED_BY_CONTRACTOR ? (
        <PermissionGate element="ProcessButtonVerify">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<QuestionMarkIcon />}
            onClick={handleOnClickButtonVerify}
            title={t("Projects.ProjectView.button.verify")}
          />
        </PermissionGate>
      ) : null}
    </div>
  );
};

export default ProcessButtons;
