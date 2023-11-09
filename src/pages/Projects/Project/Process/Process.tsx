import { useContext, useState } from "react";
import { Button } from "@component-library/Button";

import Chat from "./components/Chat";
import StatusBar from "./StatusBar/StatusBar";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Modal from "@component-library/Modal";
import ProcessServicePreview from "./ServicePreview/ServicePreview";
import { Divider } from "@component-library/Divider";
import ProcessButtons from "./components/Buttons";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ProcessInfo from "./components/Info";
import Container from "@component-library/Container";
import ProjectTitleForm from "../components/TitleForm";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import { ProjectEventItem } from "@/pages/App/types";
import { getTitleFromProcess } from "@/pages/Service/Overview/components/Item";
import ProjectFile from "./components/ProcessFile";
import ProcessStatusButtons from "./components/StatusButtons";
import { Upload } from "@/components/Upload";
import { UserProps } from "@/hooks/useUser";
import { UserContext } from "@/contexts/UserContextProvider";

interface Props {
  process: ProcessProps;
  projectID: string;
  projectEvent?: ProjectEventItem;
  checked: boolean;
  handleOnChangeCheckboxSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    processID: string
  ) => void;
}

export interface ProcessComponentState {
  chatOpen: boolean;
  infoOpen: boolean;
}

const Process: React.FC<Props> = (props) => {
  const {
    process,
    projectID,
    projectEvent,
    checked,
    handleOnChangeCheckboxSelect,
  } = props;
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [state, setState] = useState<ProcessComponentState>({
    chatOpen: false,
    infoOpen: false,
  });

  const { updateProcessWithProcessID, uploadFiles } = useProcess();

  const updateStatus = (status: ProcessStatus) => {
    // updateProject.mutate({
    //   projectCollectionID: projectID,
    //   projectID: process.id,
    //   state: status,
    // });
  };

  const updateProcessTitle = (title: string) => {
    updateProcessWithProcessID.mutate({
      processID: process.processID,
      updates: {
        changes: { details: { title: title } },
      },
    });
  };

  const closeChat = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };
  const closeInfo = () => {
    setState((prevState) => ({
      ...prevState,
      infoOpen: false,
    }));
  };

  const uploadFilesMutation = (files: File[]) => {
    uploadFiles.mutate({
      processID: process.processID,
      files: files,
    });
  };

  return (
    <div
      className="flex w-full flex-col items-center justify-start gap-5 p-5 shadow-card  md:items-start"
      id={process.processID}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row lg:justify-between">
        <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap">
          <input
            type="checkbox"
            className="h-6 w-6"
            checked={checked}
            onChange={(e) => handleOnChangeCheckboxSelect(e, process.processID)}
          />
          <ProjectTitleForm
            title={getTitleFromProcess(process, t)}
            updateTitle={updateProcessTitle}
            headerType="h3"
          />
        </Container>
        <Divider className="hidden md:block" />
        <ProcessButtons
          setState={setState}
          projectID={projectID}
          process={process}
          updateStatus={updateStatus}
          user={user}
          projectEvent={projectEvent}
        />
      </div>
      <StatusBar status={process.status} serviceType={process.service.type} />
      <ProcessStatusButtons
        projectID={projectID}
        state={process.status}
        process={process}
      />
      <ProcessServicePreview
        service={process.service}
        processID={process.processID}
      />
      <PermissionGate element="ProjectFile">
        <ProjectFile process={process} projectID={projectID} />
        <Upload mutation={uploadFilesMutation} icon multiple></Upload>
      </PermissionGate>
      <PermissionGate element="Chat">
        <Modal
          open={state.chatOpen}
          closeModal={closeChat}
          className="flex w-full flex-col"
        >
          <Chat
            chat={process.messages.messages}
            user={user}
            closeMenu={closeChat}
            projectID={projectID}
            processID={process.processID}
          />
        </Modal>
      </PermissionGate>
      <Modal
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
