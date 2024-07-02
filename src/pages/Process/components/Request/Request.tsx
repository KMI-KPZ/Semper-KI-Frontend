import ProcessContainer from "@/components/Process/Container";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessHeader from "@/components/Process/Header";
import { Container, Text } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useProcess from "@/hooks/Process/useProcess";

import CheckIcon from "@mui/icons-material/Check";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

interface ProcessRequestProps {}

const ProcessRequest: React.FC<ProcessRequestProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const { process } = useProcess();

  const isClient = user.hashedID === process.client;
  const clientVerified =
    isClient && process.processStatus === ProcessStatus.VERIFIED;
  const clientRequested =
    isClient && process.processStatus >= ProcessStatus.REQUESTED;
  const contractorRecieved =
    !isClient && process.processStatus >= ProcessStatus.REQUESTED;

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

  return (
    <ProcessContainer id="request">
      <ProcessHeader
        menuTitle={t("Process.components.Request.Request.button.menu")}
        pageTitle={`${t(
          "Process.components.Request.Request.title"
        )}: ${getTitle()}`}
      ></ProcessHeader>
      <Container width="fit" direction="col" className="card">
        {clientVerified ? (
          <CheckIcon style={{ height: 60, width: 60 }} />
        ) : null}
        {clientRequested || contractorRecieved ? (
          <EmailOutlinedIcon style={{ height: 60, width: 60 }} />
        ) : null}
        <Text variant="strong">{getText()}</Text>
      </Container>
      <ProcessStatusButtons
        start={ProcessStatus.VERIFIED}
        end={ProcessStatus.REQUESTED}
      />
    </ProcessContainer>
  );
};

export default ProcessRequest;
