import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ProcessActionStatus } from "@/api/Project/Querys/useGetProject";
import { twMerge } from "tailwind-merge";

interface ActionStatusCardProps {
  process: Process;
  className?: string;
}

const ActionStatusCard: React.FC<ActionStatusCardProps> = (props) => {
  const { process, className = "" } = props;
  const { t } = useTranslation();

  const getProcessActionStatusContainerColor = (
    status: ProcessActionStatus
  ): string => {
    switch (status) {
      case "ACTION_REQUIRED":
        return "border-orange-500";
      case "WAITING_CONTRACTOR":
      case "WAITING_CLIENT":
      case "WAITING_PROCESS":
      case "IN_PROGRESS":
        return "border-blue-500";
      case "COMPLETED":
        return "border-green-500";
      case "FAILED":
        return "border-red-500";
    }
  };

  return (
    <Container
      // className=" py-2"
      width="full"
      justify="center"
      items="center"
      direction="col"
      className={twMerge(
        ` gap-0 rounded-md border-2  ${getProcessActionStatusContainerColor(
          process.actionStatus
        )}`,
        className
      )}
    >
      <Text className="p-2">
        {`${t(`types.ProcessActionStatus.${process.actionStatus}`)}${
          process.actionStatus === "FAILED"
            ? `: ${t(
                `enum.ProcessStatus.${
                  ProcessStatus[
                    process.processStatus
                  ] as keyof typeof ProcessStatus
                }`
              )}`
            : ""
        }`}
      </Text>
    </Container>
  );
};

export default ActionStatusCard;
