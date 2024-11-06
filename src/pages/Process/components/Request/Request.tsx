import ProcessContainer from "@/components/Process/Container";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Button, Container, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useProcess from "@/hooks/Process/useProcess";
import CheckIcon from "@mui/icons-material/Check";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ProcessFileView from "@/components/Process/File/FileView";
import { UserType } from "@/hooks/useUser";

interface ProcessRequestProps {}

const ProcessRequest: React.FC<ProcessRequestProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const { process } = useProcess();
  const [showFiles, setShowFiles] = React.useState<boolean>(false);

  const isClient =
    (user.hashedID === process.client && user.usertype === UserType.USER) ||
    (user.usertype === UserType.ORGANIZATION &&
      process.client === user.organization);
  const clientVerified =
    isClient && process.processStatus === ProcessStatus.VERIFYING_COMPLETED;
  const clientRequested =
    isClient && process.processStatus >= ProcessStatus.REQUEST_COMPLETED;
  const contractorRecieved =
    !isClient && process.processStatus >= ProcessStatus.REQUEST_COMPLETED;

  const getText = (): string => {
    if (clientVerified)
      return t("Process.components.Request.Request.clientVerified");
    if (clientRequested)
      return t("Process.components.Request.Request.clientRequested");
    if (contractorRecieved)
      return t("Process.components.Request.Request.contractorRecieved");
    return "nix gefunden ProcessRequest";
  };

  const getTitle = (): string => {
    if (clientVerified)
      return t("Process.components.Request.Request.clientVerifiedTitle");
    if (clientRequested)
      return t("Process.components.Request.Request.clientRequestedTitle");
    if (contractorRecieved)
      return t("Process.components.Request.Request.contractorRecievedTitle");
    return "nix gefunden ProcessRequest";
  };

  const menuButtonTitle = t("Process.components.Request.Request.button.menu");
  const pageTitle = `${t(
    "Process.components.Request.Request.heading"
  )}: ${getTitle()}`;

  const handleOnButtonClickFile = () => {
    setShowFiles((prevState) => !prevState);
  };

  return (
    <ProcessContainer
      id="Request"
      menuButtonTitle={menuButtonTitle}
      pageTitle={pageTitle}
      start={ProcessStatus.VERIFYING_COMPLETED}
      end={ProcessStatus.VERIFYING_COMPLETED}
    >
      <Container width="fit" direction="col" className="card">
        {clientVerified ? (
          <CheckIcon style={{ height: 60, width: 60 }} />
        ) : null}
        {clientRequested || contractorRecieved ? (
          <EmailOutlinedIcon style={{ height: 60, width: 60 }} />
        ) : null}
        <Text variant="strong">{getText()}</Text>
      </Container>

      {showFiles ? <ProcessFileView origin="Request" /> : null}
      <Button
        size="sm"
        title={t(
          showFiles
            ? "Process.components.Request.Request.button.hideFiles"
            : "Process.components.Request.Request.button.showFiles"
        )}
        onClick={handleOnButtonClickFile}
      />
    </ProcessContainer>
  );
};

export default ProcessRequest;
