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

interface ProcessFileTableProps {
  files: ModelFileDescriptionProps[];
  type: "current" | "upload";
}

const ProcessFileTable: React.FC<ProcessFileTableProps> = (props) => {
  const { files, type } = props;
  const { t } = useTranslation();

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
          {files.map((file) => (
            <ProcessFileRow file={file} />
          ))}
        </tbody>
      </table>
      {type === "current" ? (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "Process.components.Contract.components.FileTable.button.downloadAll"
          )}
          startIcon={<DownloadIcon />}
        />
      ) : (
        <Button
          size="sm"
          variant="primary"
          title={t(
            "Process.components.Contract.components.FileTable.button.upload"
          )}
          startIcon={<FileUploadIcon />}
        />
      )}
    </Container>
  );
};

export default ProcessFileTable;
