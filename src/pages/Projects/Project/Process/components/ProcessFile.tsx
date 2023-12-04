import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { Heading } from "@component-library/Typography";
import { Divider } from "@component-library/Divider";
import useProcess, {
  FileProps,
  FilesDescriptionProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import Container from "@component-library/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import { createDownload } from "@/services/utils";
import useGernalProcess from "@/pages/Projects/hooks/useGernalProcess";

interface Props {
  process: ProcessProps;
  projectID: string;
}

const ProjectFile: React.FC<Props> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [loadingFileID, setLoadingFileID] = useState<string>("");
  const [downloadFilesZIPIsLoading, setDownloadFilesZIPIsLoading] =
    useState<boolean>(false);

  const { downloadFile, downloadZIP, deleteFile } = useGernalProcess();

  const hanleOnClickButtonDelete = (file: FileProps) => {
    deleteFile({ processID: process.processID, fileID: file.id });
  };

  const handleOnClickButtonDownloadFile = (file: FileProps) => {
    setLoadingFileID(file.id);
    downloadFile(
      { processID: process.processID, fileID: file.id },
      {
        onSettled(data) {
          if (data) {
            createDownload(data, file.fileName);
            setLoadingFileID("");
          }
        },
      }
    );
  };
  const handleOnClickButtonDownloadZip = () => {
    setDownloadFilesZIPIsLoading(true);
    downloadZIP(
      {
        processID: process.processID,
        fileIDs: process.files.map((file) => file.id),
      },
      {
        onSettled(data) {
          if (data) {
            createDownload(data, "files.zip");
            setDownloadFilesZIPIsLoading(false);
          }
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center gap-3">
        <Heading variant="h2">
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
                <span className="p-2">{file.fileName}</span>
                <Container>
                  <Button
                    size="sm"
                    variant="icon"
                    onClick={() => hanleOnClickButtonDelete(file)}
                    children={<DeleteIcon />}
                    loading={loadingFileID === file.id}
                    title={t(
                      "Projects.Project.Process.components.ProcessFile.button.delete"
                    )}
                  />
                  <Button
                    size="sm"
                    variant="icon"
                    onClick={() => handleOnClickButtonDownloadFile(file)}
                    children={<DownloadIcon />}
                    loading={loadingFileID === file.id}
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
          loading={downloadFilesZIPIsLoading}
        />
      ) : null}
    </div>
  );
};

export default ProjectFile;
