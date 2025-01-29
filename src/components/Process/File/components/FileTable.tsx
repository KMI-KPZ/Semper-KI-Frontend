import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading } from "@component-library/index";
import ProcessFileRow from "./ProcessFileRow";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useDownloadZIP from "@/api/Process/Files/Mutations/useDownloadZIP";
import useUploadFiles from "@/api/Process/Files/Mutations/useUploadFiles";
import { ProcessFile, ProcessOrigin } from "@/api/Process/Querys/useGetProcess";
import RawProcessFileRow from "./RawFileRow";

export type ProcessFileTableProps =
  | UploadFileTableProps
  | CurrentFileTableProps;

type UploadFileTableProps = {
  files: File[];
  type: "upload";
  resetUploadFiles: () => void;
  deleteFile: (fileIndex: number) => void;
} & GenericFileTableProps;

type CurrentFileTableProps = {
  files: ProcessFile[];
  type: "current";
} & GenericFileTableProps;

type GenericFileTableProps = {
  origin: ProcessOrigin;
  title?: string;
  noFilesMessage?: string;
  onlyFromOrigin?: boolean;
};
const ProcessFileTable: React.FC<ProcessFileTableProps> = (props) => {
  const {
    files,
    type,
    origin,
    title,
    onlyFromOrigin = false,
    noFilesMessage: _noFilesMessage,
  } = props;
  const { t } = useTranslation();
  const downloadZIP = useDownloadZIP();
  const uploadFiles = useUploadFiles();

  const heading = title
    ? title
    : type === "current"
    ? t("components.Process.File.components.FileTable.currentFilesTitle")
    : t("components.Process.File.components.FileTable.uploadFilesTitle");

  const noFilesMessage = _noFilesMessage
    ? _noFilesMessage
    : t("components.Process.File.components.FileTable.noFiles");

  const handleOnButtonClickUpload = () => {
    if (type === "upload")
      uploadFiles.mutate(
        { files, origin },
        { onSuccess: () => props.resetUploadFiles() }
      );
  };
  const handleOnButtonClickDownload = () => {
    if (type !== "upload")
      downloadZIP.mutate(
        files
          .filter(
            (file) =>
              !onlyFromOrigin || (onlyFromOrigin && file.origin === origin)
          )
          .map((file) => file.id)
      );
  };

  if (files.length === 0 && type === "upload") return null;
  if (
    type === "current" &&
    ((files.length === 0 && !onlyFromOrigin) ||
      (onlyFromOrigin &&
        files.filter((file) => onlyFromOrigin && file.origin === origin)
          .length === 0))
  )
    return (
      <Container width="full" className="rounded-md border-2 p-5">
        <Heading variant="h3">{noFilesMessage}</Heading>
      </Container>
    );
  return (
    <Container width="full" direction="col" className="rounded-md border-2 p-5">
      <Heading variant="h3">{heading}</Heading>
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="text-left">
              {t("components.Process.File.components.FileTable.name")}
            </th>

            <th className="text-left">
              {t("components.Process.File.components.FileTable.date")}
            </th>
            <th className="text-left">
              {t("components.Process.File.components.FileTable.author")}
            </th>
            {type === "current" ? (
              <th className="text-left">
                {t("components.Process.File.components.FileTable.origin")}
              </th>
            ) : null}
            <th>{t("components.Process.File.components.FileTable.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {type === "upload"
            ? files.map((file, index) => (
                <RawProcessFileRow
                  file={file}
                  key={index}
                  deleteFile={props.deleteFile}
                  index={index}
                />
              ))
            : files
                .filter(
                  (file) =>
                    !onlyFromOrigin ||
                    (onlyFromOrigin && file.origin === origin)
                )
                .map((file, index) => (
                  <ProcessFileRow file={file} key={index} />
                ))}
        </tbody>
      </table>
      {type === "upload" ? (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "components.Process.File.components.FileTable.button.upload"
          )}
          startIcon={<FileUploadIcon />}
          loading={uploadFiles.isLoading}
          onClick={handleOnButtonClickUpload}
        />
      ) : (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "components.Process.File.components.FileTable.button.downloadAll"
          )}
          loading={downloadZIP.isLoading}
          startIcon={<DownloadIcon />}
          onClick={handleOnButtonClickDownload}
        />
      )}
    </Container>
  );
};

export default ProcessFileTable;
