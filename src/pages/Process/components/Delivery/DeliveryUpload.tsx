import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessUploadCard from "@/components/Process/File/components/UploadCard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ProcessFileTable from "@/components/Process/File/components/FileTable";
import useProcess from "@/hooks/Process/useProcess";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/components/Process/StatusGate";

interface DeliveryUploadProps {}

const DeliveryUpload: React.FC<DeliveryUploadProps> = (props) => {
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
        origin={"PaymentFiles"}
        files={process.files}
        onlyFromOrigin
        type="current"
        title={t("Process.components.Delivery.DeliveryUpload.uploadedRecipes")}
        noFilesMessage={t(
          "Process.components.Delivery.DeliveryUpload.noUploadedRecipes"
        )}
      />
      <ProcessFileTable
        origin={"PaymentFiles"}
        files={files}
        type="upload"
        resetUploadFiles={resetUploadFiles}
        deleteFile={deleteFile}
        title={t("Process.components.Delivery.DeliveryUpload.heading")}
      />
      <ProcessStatusGate end={ProcessStatus.DELIVERY_IN_PROGRESS} endExclude>
        <OwnerGate type="organization" process={process}>
          <ProcessUploadCard
            icon={<UploadFileIcon style={{ height: "60px", width: "60px" }} />}
            addFiles={addFiles}
            title={t("Process.components.Delivery.DeliveryUpload.heading")}
            fileTypes={[".pdf", ".xml"]}
          />
        </OwnerGate>
      </ProcessStatusGate>
    </Container>
  );
};

export default DeliveryUpload;
