import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { ProcessFile } from "@/api/Process/Querys/useGetProcess";
import useDeleteFile from "@/api/Process/Files/Mutations/useDeleteFile";
import useDownloadFile from "@/api/Process/Files/Mutations/useDownloadFile";
import { createDownload } from "@/services/utils";
import { UserType } from "@/hooks/useUser";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
interface ProcessFileRowProps {
  file: ProcessFile;
}

const ProcessFileRow: React.FC<ProcessFileRowProps> = (props) => {
  const { file } = props;
  const { t } = useTranslation();
  const deleteFile = useDeleteFile();
  const downloadFile = useDownloadFile();
  const { user } = useAuthorizedUser();

  const handleOnButtonClickDownload = () => {
    downloadFile.mutate(file.id, {
      onSuccess(data) {
        createDownload(data, file.fileName);
      },
    });
  };
  const handleOnButtonClickDelete = () => {
    deleteFile.mutate(file.id);
  };

  return (
    <tr className="font-normal">
      <td>{file.fileName}</td>
      <td>{new Date(file.date).toLocaleDateString()}</td>
      <td>{file.createdBy}</td>
      <td>{t(`types.ProcessOrigin.${file.origin}`)}</td>
      <td>
        <Container width="full">
          <PermissionGate element="ProcessFileRowDownload">
            <Button
              size="sm"
              variant="text"
              title={t("general.button.download")}
              children={<DownloadIcon />}
              onClick={handleOnButtonClickDownload}
              loading={downloadFile.isLoading}
            />
          </PermissionGate>
          {user.usertype === UserType.ADMIN ||
          (user.usertype === UserType.USER &&
            file.createdByID === user.hashedID) ||
          (user.usertype === UserType.ORGANIZATION &&
            file.createdByID === user.organization) ? (
            <PermissionGate element="ProcessFileRowDelete">
              <Button
                size="sm"
                variant="text"
                title={t("general.button.delete")}
                children={<DeleteIcon />}
                onClick={handleOnButtonClickDelete}
                loading={deleteFile.isLoading}
              />
            </PermissionGate>
          ) : null}
        </Container>
      </td>
    </tr>
  );
};

export default ProcessFileRow;
