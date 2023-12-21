import { AuthorizedUserProps, UserProps, UserType } from "@/hooks/useUser";
import { Button } from "@component-library/Button";
import React, { Dispatch, SetStateAction, useContext } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
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
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import useEvents from "@/hooks/useEvents/useEvents";
import { EventContext } from "@/contexts/EventContextProvider";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate, useParams } from "react-router-dom";

interface ProcessButtonsProps {
  user: UserProps;
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
  const { deleteEvent } = useEvents();
  const { processID } = useParams();
  const { deleteProcess, updateProcess } = useGeneralProcess();
  const navigate = useNavigate();
  const { getDeleteProjectEvent } = useProjectEventChange(
    process,
    projectID,
    true
  ); // todo: check if this is correct

  const shouldRenderFor = (type: "CLIENT" | "CONTRACTOR"): boolean => {
    return (
      (process !== undefined &&
        user.usertype !== UserType.ANONYM &&
        ((type === "CONTRACTOR" && process.contractor === user.organization) ||
          (type === "CLIENT" && process.client === user.hashedID))) ||
      user.usertype === UserType.ANONYM
    );
  };

  const handleOnClickButtonCancel = () => {
    if (
      window.confirm(
        t("Projects.Project.Process.components.Buttons.confirm.cancel")
      )
    ) {
      deleteProcess({ processIDs: [process.processID] });
    }
  };
  const handleOnClickButtonReProject = () => {
    if (
      window.confirm(
        t("Projects.Project.Process.components.Buttons.confirm.reProject")
      )
    ) {
      logger("//TODO ReProject");
    }
  };
  const handleOnClickButtonReject = () => {
    if (
      window.confirm(
        t("Projects.Project.Process.components.Buttons.confirm.reject")
      )
    ) {
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
    navigate(`${processID === undefined ? `${process.processID}/` : ""}chat`);
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
        title={t("Projects.Project.Process.components.Buttons.button.info")}
      />
      <Button
        variant="icon"
        width="fit"
        size="sm"
        children={<HistoryIcon />}
        to={`/projects/${projectID}/${process.processID}/history`}
        title={t("Projects.Project.Process.components.Buttons.button.history")}
      />
      {process.processStatus >= ProcessStatus.REQUESTED &&
      user.usertype !== UserType.ANONYM ? (
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
                title={t(
                  "Projects.Project.Process.components.Buttons.button.chat"
                )}
              />
            </Badge>
          ) : (
            <Button
              variant="icon"
              width="fit"
              size="sm"
              children={<MailIcon />}
              onClick={handleOnClickButtonChat}
              title={t(
                "Projects.Project.Process.components.Buttons.button.chat"
              )}
            />
          )}
        </PermissionGate>
      ) : null}
      {process.processStatus <= ProcessStatus.REQUESTED &&
      shouldRenderFor("CLIENT") ? (
        <PermissionGate element="ProcessButtonDelete">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<DeleteIcon />}
            onClick={handleOnClickButtonCancel}
            title={t(
              "Projects.Project.Process.components.Buttons.button.cancel"
            )}
          />
        </PermissionGate>
      ) : null}
      {process.processStatus === ProcessStatus.COMPLETED &&
      shouldRenderFor("CLIENT") ? (
        <PermissionGate element="ProcessButtonReProject">
          <Button
            variant="icon"
            width="fit"
            size="sm"
            children={<ReplayIcon />}
            onClick={handleOnClickButtonReProject}
            title={t(
              "Projects.Project.Process.components.Buttons.button.reProject"
            )}
          />
        </PermissionGate>
      ) : null}
    </div>
  );
};

export default ProcessButtons;
