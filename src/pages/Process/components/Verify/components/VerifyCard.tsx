import { Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessVerifyStatus from "./VerifyStatus";

interface ProcessVerifyCardProps {
  type: VerifyType;
  status: VerifyStatus;
  errorMsg?: string;
}

export type VerifyType = "PRINTABILITY" | "DRAFT" | "CAPACITY" | "STABILITY";
export enum VerifyStatus {
  "READY",
  "STARTED",
  "ONGOING",
  "COMPLETED",
  "FAILED",
}

const ProcessVerifyCard: React.FC<ProcessVerifyCardProps> = (props) => {
  const { status, type, errorMsg } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" className="card" width="full" height="full">
      <Heading variant="h3">
        {t(`Process.components.Verify.components.VerifyCard.title.${type}`)}
      </Heading>
      <ProcessVerifyStatus status={status} />
      <Text>
        {t(
          `Process.components.Verify.components.VerifyCard.description.${type}`
        )}
      </Text>
      {status === VerifyStatus.FAILED && errorMsg !== undefined ? (
        <Container justify="start" align="start" direction="col">
          <Heading variant="h4" className="text-red-500">
            {t("Process.components.Verify.components.VerifyCard.error")}
          </Heading>
          <Text>{errorMsg}</Text>
        </Container>
      ) : null}
    </Container>
  );
};

export default ProcessVerifyCard;
