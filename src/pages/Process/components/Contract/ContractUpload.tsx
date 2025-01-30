import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessUploadCard from "@/components/Process/File/components/UploadCard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ProcessFileTable from "@/components/Process/File/components/FileTable";
import useProcess from "@/hooks/Process/useProcess";
import OwnerGate from "@/components/OwnerGate/OwnerGate";

interface ContractUploadProps {}

const ContractUpload: React.FC<ContractUploadProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  const [files, setFiles] = React.useState<File[]>([]);

  const addFiles = (newFiles: File[]) => {
    setFiles((prevState) => [...prevState, ...newFiles]);
  };

  const resetUploadFiles = () => {
    setFiles([]);
  };

  const deleteFile = (fileIndex: number) => {
    setFiles((prevState) =>
      prevState.filter((_, index) => index !== fileIndex)
    );
  };

  return (
    <Container width="full" direction="col">
      <ProcessFileTable
        origin={"ContractFiles"}
        files={process.files}
        onlyFromOrigin
        type="current"
        title={t(
          "Process.components.Contract.ContractUpload.uploadedContracts"
        )}
        noFilesMessage={t(
          "Process.components.Contract.ContractUpload.noUploadedContracts"
        )}
      />
      <ProcessFileTable
        origin={"ContractFiles"}
        files={files}
        type="upload"
        resetUploadFiles={resetUploadFiles}
        deleteFile={deleteFile}
        title={t("Process.components.Contract.ContractUpload.heading")}
      />
      <OwnerGate type="organization">
        <ProcessUploadCard
          icon={<UploadFileIcon style={{ height: "60px", width: "60px" }} />}
          addFiles={addFiles}
          title={t("Process.components.Contract.ContractUpload.heading")}
          fileTypes={[".pdf", ".xml"]}
        />
      </OwnerGate>
    </Container>
  );
};

export default ContractUpload;
