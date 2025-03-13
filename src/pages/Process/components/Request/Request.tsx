import ProcessContainer from "@/components/Process/Container/Container";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container, Text } from "@component-library/index";
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
    if (clientVerified) return t("Process.components.Request.clientVerified");
    if (clientRequested) return t("Process.components.Request.clientRequested");
    if (contractorRecieved)
      return t("Process.components.Request.contractorRecieved");
    return "nix gefunden ProcessRequest";
  };

  const getTitle = (): string => {
    if (clientVerified)
      return t("Process.components.Request.clientVerifiedTitle");
    if (clientRequested)
      return t("Process.components.Request.clientRequestedTitle");
    if (contractorRecieved)
      return t("Process.components.Request.contractorRecievedTitle");
    return "nix gefunden ProcessRequest";
  };

  const pageTitle = `${t("Process.components.Request.heading")}: ${getTitle()}`;

  return (
    <ProcessContainer
      id="Request"
      titleAddition={pageTitle}
      start={ProcessStatus.VERIFYING_COMPLETED}
      end={ProcessStatus.VERIFYING_COMPLETED}
    >
      <Container width="fit" direction="col" className="card bg-white">
        {clientVerified ? (
          <CheckIcon style={{ height: 60, width: 60 }} />
        ) : null}
        {clientRequested || contractorRecieved ? (
          <EmailOutlinedIcon style={{ height: 60, width: 60 }} />
        ) : null}
        <Text variant="strong">{getText()}</Text>
      </Container>

      <ProcessFileView
        origin="Request"
        endStatus={ProcessStatus.REQUEST_COMPLETED}
        collapsed
        collapsible
      />
    </ProcessContainer>
  );
};

export default ProcessRequest;
