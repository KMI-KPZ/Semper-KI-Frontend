import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
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
};
const ProcessFileTable: React.FC<ProcessFileTableProps> = (props) => {
  const { files, type, origin } = props;
  const { t } = useTranslation();
  const downloadZIP = useDownloadZIP();
  const uploadFiles = useUploadFiles();

  const handleOnButtonClickUpload = () => {
    if (type === "upload")
      uploadFiles.mutate(
        { files, origin },
        { onSuccess: () => props.resetUploadFiles() }
      );
  };
  const handleOnButtonClickDownload = () => {
    if (type !== "upload") downloadZIP.mutate(files.map((file) => file.id));
  };

  if (files.length === 0 && type === "upload") return null;
  if (files.length === 0 && type === "current")
    return (
      <Container className="rounded-xl border-2 p-5">
        <Text>
          {t("Process.components.Contract.components.FileTable.noFiles")}
        </Text>
      </Container>
    );
  return (
    <Container width="full" direction="col" className="rounded-xl border-2 p-5">
      <Heading variant="h3">
        {type === "current"
          ? t(
              "Process.components.Contract.components.FileTable.currentFilesTitle"
            )
          : t(
              "Process.components.Contract.components.FileTable.uploadFilesTitle"
            )}
      </Heading>
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="text-left">
              {t("Process.components.Contract.components.FileTable.name")}
            </th>
            {/* <th className="text-left">
              {t("Process.components.Contract.components.FileTable.size")}
            </th> */}
            {/* <th className="text-left">
              {t("Process.components.Contract.components.FileTable.type")}
            </th> */}
            <th className="text-left">
              {t("Process.components.Contract.components.FileTable.date")}
            </th>
            <th className="text-left">
              {t("Process.components.Contract.components.FileTable.author")}
            </th>
            <th>
              {t("Process.components.Contract.components.FileTable.actions")}
            </th>
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
            : files.map((file, index) => (
                <ProcessFileRow file={file} key={index} />
              ))}
        </tbody>
      </table>
      {type === "upload" ? (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "Process.components.Contract.components.FileTable.button.upload"
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
            "Process.components.Contract.components.FileTable.button.downloadAll"
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
