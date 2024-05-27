import { MouseEvent, useContext, useState } from "react";
import StatusBar from "./StatusBar/StatusBar";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Modal } from "@component-library/index";
import ProcessServicePreview from "./ServicePreview/ServicePreview";
import { Divider } from "@component-library/index";
import ProcessButtons from "./components/Buttons";
import ProcessInfo from "./components/Info";
import { Container } from "@component-library/index";
import ProjectFile from "./components/ProcessFile";
import ProcessStatusButtons from "./components/StatusButtons";
import { Upload } from "@/components/Upload";
import useUser from "@/hooks/useUser";
import useEvents from "@/hooks/useEvents/useEvents";
import ProcessAddress from "./components/Address";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useUploadFiles from "@/api/Process/Mutations/useUploadFiles";
import ProjectTitleForm from "../Project/components/TitleForm";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { TFunction } from "i18next";

export const getTitleFromProcess = (
  process: Process,
  t: TFunction<"translation", undefined>
): string => {
  return process.processDetails.title !== undefined
    ? process.processDetails.title
    : process.serviceType !== undefined
    ? t(
        `enum.ServiceType.${
          ServiceType[process.serviceType] as keyof typeof ServiceType
        }`
      )
    : t("Service.Overview.components.Item.titleEmpty");
};

interface Props {
  process: Process;
  projectID: string;
  checked: boolean;
}

export interface ProcessComponentState {
  chatOpen: boolean;
  infoOpen: boolean;
  statusCountAction: "still" | "move";
  statusCountReset: boolean;
}

const ProcessPage: React.FC<Props> = (props) => {
  const { process, projectID, checked } = props;
  const { user } = useUser();
  const { t } = useTranslation();
  const [state, setState] = useState<ProcessComponentState>({
    chatOpen: false,
    infoOpen: false,
    statusCountAction: "still",
    statusCountReset: false,
  });
  const updateProcess = useUpdateProcess();
  const uploadFiles = useUploadFiles();
  const { deleteEvent, getProcessEventItem } = useEvents();

  const updateStatus = (status: ProcessStatus) => {
    // updateProject.mutate({
    //   projectCollectionID: projectID,
    //   projectID: process.id,
    //   state: status,
    // });
  };

  const updateProcessTitle = (title: string) => {
    updateProcess.mutate({
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
    uploadFiles.mutate({
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
      {process.processDetails.clientAddress !== undefined ? (
        <ProcessAddress address={process.processDetails.clientAddress} />
      ) : null}
      <ProcessServicePreview process={process} />
      <PermissionGate element="ProjectFile">
        <ProjectFile process={process} projectID={projectID} />
        <Upload mutation={uploadFilesMutation} icon multiple></Upload>
      </PermissionGate>
      <Modal
        modalKey="ProcessInfo"
        open={state.infoOpen}
        closeModal={closeInfo}
        className="flex w-full flex-col"
      >
        <ProcessInfo process={process} />
      </Modal>
    </div>
  );
};

export default ProcessPage;
