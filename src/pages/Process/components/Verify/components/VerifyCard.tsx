import { Container, Heading, Text } from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ProcessVerifyStatus from "./VerifyStatus";

interface ProcessVerifyCardProps {
  type: VerifyType;
  status: VerifyStatus;
  errorMsg?: string | ReactNode;
}

export type VerifyType =
  | "PRINTABILITY"
  | "DRAFT"
  | "CAPACITY"
  | "STABILITY"
  | "FEM"
  | "PROCESS";
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
    <Container
      direction="col"
      className="card self-stretch bg-white"
      justify="start"
      width="full"
    >
      <Heading variant="h3">
        {t(`Process.components.Verify.components.VerifyCard.heading.${type}`)}
      </Heading>
      <ProcessVerifyStatus status={status} />
      <Text>
        {t(
          `Process.components.Verify.components.VerifyCard.description.${type}`
        )}
      </Text>
      {status === VerifyStatus.FAILED && errorMsg !== undefined ? (
        <Container justify="start" items="start" direction="col">
          <Heading variant="h4" className="text-red-500">
            {t("Process.components.Verify.components.VerifyCard.error")}
          </Heading>
          {typeof errorMsg === "string" ? <Text>{errorMsg}</Text> : errorMsg}
        </Container>
      ) : null}
    </Container>
  );
};

export default ProcessVerifyCard;
