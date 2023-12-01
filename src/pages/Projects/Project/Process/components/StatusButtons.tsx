import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "@/pages/Projects/hooks/useProcess";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import React, { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import useStatusButtons from "../../hooks/useStatusButtons";
import { StatusButtonProps } from "../../components/StatusButtonData";
import useService from "@/pages/Service/hooks/useService";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import useVerification from "../../Verification/hooks/useVerification";
import useUser, { UserType } from "@/hooks/useUser";
import useGernalProcess from "@/pages/Projects/hooks/useGernalProcess";

interface ProcessStatusButtonsProps {
  projectID: string;
  process: ProcessProps;
  state: ProcessStatus;
}

const ProcessStatusButtons: React.FC<ProcessStatusButtonsProps> = (props) => {
  const { state, process, projectID } = props;
  const { setCheckedProcesses } = useContext(ProjectContext);
  const { t } = useTranslation();
  const { updateProcess } = useGernalProcess();
  const { user } = useUser();
  const { getProcessStatusButtons } = useStatusButtons();
  const navigate = useNavigate();
  const { verifyProject } = useVerification();

  const shouldRenderFor = (type: "CLIENT" | "CONTRACTOR"): boolean => {
    return (
      process !== undefined &&
      user.usertype !== UserType.ANONYM &&
      ((type === "CONTRACTOR" &&
        process.contractor[0] === user.organizations[0]) ||
        (type === "CLIENT" && process.client === user.hashedID))
    );
  };

  const calcPath = (path: string): string => {
    return `/projects/${projectID}/${process.processID}/${path}`;
  };

  const onClickButton = (status: ProcessStatus) => {
    updateProcess({
      processIDs: [process.processID],
      updates: {
        changes: {
          status,
        },
      },
    });
  };

  const handleOnClickButton = (button: StatusButtonProps) => {
    setCheckedProcesses([process.processID]);
    switch (button.title) {
      case "EDIT":
        navigate(calcPath("service/edit"));
        break;
      case "DELETE":
        break;
      case "REPROJECT":
        break;
      case "VERIFYING":
        verifyProject.mutate({
          projectID: projectID,
          processIDs: [process.processID],
          send: false,
        });
        break;
      case "VERIFYING_AND_REQUESTED":
        verifyProject.mutate({
          projectID: projectID,
          processIDs: [process.processID],
          send: true,
        });
        break;
      case "REQUESTED":
        onClickButton(ProcessStatus.REQUESTED);
        break;
      case "CLARIFICATION":
        onClickButton(ProcessStatus.CLARIFICATION);
        break;
      case "COMPLETED":
        onClickButton(ProcessStatus.COMPLETED);
        break;
      case "CONFIRMED_BY_CLIENT":
        onClickButton(ProcessStatus.CONFIRMED_BY_CLIENT);
        break;
      case "CONFIRMED_BY_CONTRACTOR":
        onClickButton(ProcessStatus.CONFIRMED_BY_CONTRACTOR);
        break;
      case "REJECTED_BY_CLIENT":
        onClickButton(ProcessStatus.REJECTED_BY_CLIENT);
        break;
      case "REJECTED_BY_CONTRACTOR":
        onClickButton(ProcessStatus.REJECTED_BY_CONTRACTOR);
        break;
      case "CONTRACTOR_SELECTED":
        navigate("contractorSelection");
        break;
      case "DELIVERY":
        onClickButton(ProcessStatus.DELIVERY);
        break;
      case "PRODUCTION":
        onClickButton(ProcessStatus.PRODUCTION);
        break;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {getProcessStatusButtons(process).map((button, index) => (
        <PermissionGate element={`ProjectButton${button.title}`} key={index}>
          <Button
            key={index}
            variant="icon"
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button)}
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
