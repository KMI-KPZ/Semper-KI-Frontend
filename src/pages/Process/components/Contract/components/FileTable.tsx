import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import ProcessFileRow from "./FileRow";
import { ModelFileDescriptionProps } from "@/api/Process/Querys/useGetProcess";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useDownloadZIP from "@/api/Process/Files/Mutations/useDownloadZIP";
import useUploadFiles from "@/api/Process/Files/Mutations/useUploadFiles";

interface ProcessFileTableProps {
  files: ModelFileDescriptionProps[];
  type: "current" | "upload" | "user";
}

const ProcessFileTable: React.FC<ProcessFileTableProps> = (props) => {
  const { files, type } = props;
  const { t } = useTranslation();
  const downloadZIP = useDownloadZIP();
  const uploadFiles = useUploadFiles();

  const handleOnButtonClickUpload = () => {};
  const handleOnButtonClickDownload = () => {
    downloadZIP.mutate(files.map((file) => file.id));
  };

  if (files.length === 0 && type === "upload") return null;
  if (files.length === 0 && type === "user")
    return (
      <Container className="rounded-xl border-2 p-5">
        <Text>
          {t("Process.components.Contract.components.FileTable.noFiles")}
        </Text>
      </Container>
    );
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
        {type === "user"
          ? t("Process.components.Contract.components.FileTable.userFilesTitle")
          : type === "current"
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
          {files.map((file, index) => (
            <ProcessFileRow file={file} key={index} />
          ))}
        </tbody>
      </table>
      {type === "current" || type === "user" ? (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "Process.components.Contract.components.FileTable.button.downloadAll"
          )}
          startIcon={<DownloadIcon />}
          onClick={handleOnButtonClickDownload}
        />
      ) : (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "Process.components.Contract.components.FileTable.button.upload"
          )}
          startIcon={<FileUploadIcon />}
          onClick={handleOnButtonClickUpload}
        />
      )}
    </Container>
  );
};

export default ProcessFileTable;
