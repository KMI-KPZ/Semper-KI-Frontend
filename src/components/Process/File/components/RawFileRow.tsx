import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
interface RawProcessFileRowProps {
  file: File;
  deleteFile: (fileIndex: number) => void;
  index: number;
}

const RawProcessFileRow: React.FC<RawProcessFileRowProps> = (props) => {
  const { file, deleteFile, index } = props;
  const { t } = useTranslation();

  const { user } = useAuthorizedUser();

  const handleOnClickButtonDelete = () => {
    deleteFile(index);
  };

  return (
    <tr className="font-normal">
      <td>{file.name}</td>
      <td>{new Date(file.lastModified).toLocaleDateString()}</td>
      <td>{user.name}</td>
      {/* <td>{file.}</td> */}
      <td>
        <Container width="full">
          <PermissionGate element="ProcessFileRowDelete">
            <Button
              size="sm"
              variant="text"
              title={t("general.button.delete")}
              children={<DeleteIcon />}
              onClick={handleOnClickButtonDelete}
            />
          </PermissionGate>
        </Container>
      </td>
    </tr>
  );
};

export default RawProcessFileRow;
