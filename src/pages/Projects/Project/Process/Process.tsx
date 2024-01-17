import { MouseEvent, useContext, useState } from "react";
import { Button } from "@component-library/index";

import ProcessChat from "./Chat/Chat";
import StatusBar from "./StatusBar/StatusBar";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Modal } from "@component-library/index";
import ProcessServicePreview from "./ServicePreview/ServicePreview";
import { Divider } from "@component-library/index";
import ProcessButtons from "./components/Buttons";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ProcessInfo from "./components/Info";
import { Container } from "@component-library/index";
import ProjectTitleForm from "../components/TitleForm";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import { ProcessEventItem, ProjectEventItem } from "@/pages/App/types";
import { getTitleFromProcess } from "@/pages/Service/Overview/components/Item";
import ProjectFile from "./components/ProcessFile";
import ProcessStatusButtons from "./components/StatusButtons";
import { Upload } from "@/components/Upload";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { UserContext } from "@/contexts/UserContextProvider";
import useCheckedProcesses from "../hooks/useCheckedProcesses";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import useGeneralProcess from "../../hooks/useGeneralProcess";
import logger from "@/hooks/useLogger";
import useEvents from "@/hooks/useEvents/useEvents";
import AddressForm from "@/components/Form/AddressForm";

interface Props {
  process: ProcessProps;
  projectID: string;
  checked: boolean;
}

export interface ProcessComponentState {
  chatOpen: boolean;
  infoOpen: boolean;
  statusCountAction: "still" | "move";
  statusCountReset: boolean;
}

const Process: React.FC<Props> = (props) => {
  const { process, projectID, checked } = props;
  const { user } = useUser();
  const { t } = useTranslation();
  const [state, setState] = useState<ProcessComponentState>({
    chatOpen: false,
    infoOpen: false,
    statusCountAction: "still",
    statusCountReset: false,
  });
  const { handleOnChangeCheckboxSelect } = useCheckedProcesses();
  const { updateProcess, uploadFiles } = useGeneralProcess();
  const { deleteEvent, getProcessEventItem } = useEvents();

  const updateStatus = (status: ProcessStatus) => {
    // updateProject.mutate({
    //   projectCollectionID: projectID,
    //   projectID: process.id,
    //   state: status,
    // });
  };

  const updateProcessTitle = (title: string) => {
    updateProcess({
      processIDs: [process.processID],
      updates: {
        changes: { processDetails: { title: title } },
      },
    });
  };

  const closeInfo = () => {
    setState((prevState) => ({
      ...prevState,
      infoOpen: false,
    }));
  };

  const uploadFilesMutation = (files: File[]) => {
    uploadFiles({
      processID: process.processID,
      files: files,
    });
  };

  const handleOnMouseOver = () => {
    if (
      state.statusCountReset === false &&
      getProcessEventItem(projectID, process.processID) !== undefined
    ) {
      setState((prevState) => ({
        ...prevState,
        statusCountAction: "move",
        statusCountReset: true,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          statusCountReset: false,
        }));
        deleteEvent({
          eventType: "projectEvent",
          projectID: projectID,
          processID: process.processID,
          type: "status",
        });
      }, 7000);
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center  justify-start gap-5 p-5 shadow-card  md:items-start"
      id={process.processID}
      onMouseOver={handleOnMouseOver}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap">
          <input
            id={`selectProcess${process.processID}`}
            type="checkbox"
            className="h-6 w-6"
            name={t("Projects.Project.Project.label.selectProcess")}
            value={t("Projects.Project.Process.Process.label.selectProcess", {
              name: process.processDetails.title,
            })}
            checked={checked}
            onChange={(e) => handleOnChangeCheckboxSelect(e, process.processID)}
          />
          <ProjectTitleForm
            forId={`selectProcess${process.processID}`}
            title={getTitleFromProcess(process, t)}
            updateTitle={updateProcessTitle}
            headerType="h2"
          />
        </Container>
        <Divider className="hidden md:block" />
        <ProcessButtons
          setState={setState}
          projectID={projectID}
          process={process}
          updateStatus={updateStatus}
          user={user}
        />
      </div>
      <StatusBar
        statusCountAction={state.statusCountAction}
        projectID={projectID}
        processID={process.processID}
        status={process.processStatus}
        serviceType={process.serviceType}
      />
      <ProcessStatusButtons process={process} />
      <ProcessServicePreview process={process} />
      <PermissionGate element="ProjectFile">
        <ProjectFile process={process} projectID={projectID} />
        <Upload mutation={uploadFilesMutation} icon multiple></Upload>
      </PermissionGate>
      <Modal
        title="ProcessInfo"
        open={state.infoOpen}
        closeModal={closeInfo}
        className="flex w-full flex-col"
      >
        <ProcessInfo process={process} />
      </Modal>
    </div>
  );
};

export default Process;
