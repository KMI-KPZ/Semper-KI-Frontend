import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
interface RawProcessFileRowProps {
  file: File;
}

const RawProcessFileRow: React.FC<RawProcessFileRowProps> = (props) => {
  const { file } = props;
  const { t } = useTranslation();

  const { user } = useAuthorizedUser();

  return (
    <tr className="font-normal">
      <td>{file.name}</td>
      <td>{new Date(file.lastModified).toLocaleDateString()}</td>
      <td>{user.name}</td>
      {/* <td>{file.}</td> */}
      <td>
        <Container width="full">
          <Button
            size="sm"
            variant="text"
            title={t(
              "Process.components.Contract.components.FileRow.button.delete"
            )}
          />
        </Container>
      </td>
    </tr>
  );
};

export default RawProcessFileRow;
