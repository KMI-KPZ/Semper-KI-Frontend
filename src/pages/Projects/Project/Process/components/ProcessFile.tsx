import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { Heading } from "@component-library/Typography";
import { Divider } from "@component-library/Divider";
import useProcess, {
  FilesDescriptionProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import Container from "@component-library/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import { createDownload } from "@/services/utils";

interface Props {
  process: ProcessProps;
  projectID: string;
}

const ProjectFile: React.FC<Props> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [loadingFileID, setLoadingFileID] = useState<string>("");

  const { downloadFile, downloadFilesZIP, deleteFile } = useProcess();
  const hanleOnClickButtonDelete = (file: FilesDescriptionProps) => {
    deleteFile.mutate({ processID: process.processID, fileID: file.id });
  };

  const handleOnClickButtonDownloadFile = (file: FilesDescriptionProps) => {
    setLoadingFileID(file.id);
    downloadFile.mutate(
      { processID: process.processID, fileID: file.id },
      {
        onSettled(data) {
          if (data) {
            createDownload(data, file.title);
            setLoadingFileID("");
          }
        },
      }
    );
  };
  const handleOnClickButtonDownloadZip = () => {
    downloadFilesZIP.mutate(
      {
        processID: process.processID,
        fileIDs: process.files.map((file) => file.id),
      },
      {
        onSettled(data) {
          if (data) {
            createDownload(data, "files.zip");
            setLoadingFileID("");
          }
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center gap-3">
        <Heading variant="h3">
          {t("Projects.Project.Process.components.ProcessFile.title")}:
        </Heading>
        <Divider className="mt-[0.3rem]" />
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
        {process.files.length > 0 ? (
          <>
            {process.files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-xl  p-2 shadow-md"
              >
                <span className="p-2">{file.title}</span>
                <Container>
                  <Button
                    size="sm"
                    variant="icon"
                    onClick={() => hanleOnClickButtonDelete(file)}
                    children={<DeleteIcon />}
                    loading={
                      downloadFile.isLoading && loadingFileID === file.id
                    }
                    title={t(
                      "Projects.Project.Process.components.ProcessFile.button.delete"
                    )}
                  />
                  <Button
                    size="sm"
                    variant="icon"
                    onClick={() => handleOnClickButtonDownloadFile(file)}
                    children={<DownloadIcon />}
                    loading={
                      downloadFile.isLoading && loadingFileID === file.id
                    }
                    title={t(
                      "Projects.Project.Process.components.ProcessFile.button.download"
                    )}
                  />
                </Container>
              </div>
            ))}
          </>
        ) : (
          t("Projects.Project.Process.components.ProcessFile.empty")
        )}
      </div>
      {process.files.length > 0 ? (
        <Button
          title={t(
            "Projects.Project.Process.components.ProcessFile.button.downloadAll"
          )}
          onClick={handleOnClickButtonDownloadZip}
          startIcon={<DownloadIcon />}
          loading={downloadFilesZIP.isLoading}
        />
      ) : null}
    </div>
  );
};

export default ProjectFile;
