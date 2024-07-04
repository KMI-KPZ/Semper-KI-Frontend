import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { ModelFileDescriptionProps } from "@/api/Process/Querys/useGetProcess";
interface ProcessFileRowProps {
  file: ModelFileDescriptionProps;
}

const ProcessFileRow: React.FC<ProcessFileRowProps> = (props) => {
  const { file } = props;
  const { t } = useTranslation();

  const { user } = useAuthorizedUser();

  return (
    <tr className="font-normal">
      <td>{file.fileName}</td>
      <td>{new Date(file.date).toLocaleDateString()}</td>
      <td>{file.createdBy}</td>
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

export default ProcessFileRow;
