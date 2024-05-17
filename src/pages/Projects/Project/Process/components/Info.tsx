import { Process, ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessInfoProps {
  process: Process;
}

const ProcessInfo: React.FC<ProcessInfoProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-5 bg-white p-10">
      <Text variant="body" className="break-all">
        {t("Projects.Project.Process.components.Info.id")} {process.processID}
      </Text>
      <Text variant="body">
        {t("Projects.Project.Process.components.Info.created")}{" "}
        {new Date(process.createdWhen).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Projects.Project.Process.components.Info.updated")}{" "}
        {new Date(process.updatedWhen).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Projects.Project.Process.components.Info.status")}{" "}
        {t(
          `enum.ProcessStatus.${
            ProcessStatus[process.processStatus] as keyof typeof ProcessStatus
          }`
        )}
        {` (${process.processStatus})`}
      </Text>
    </div>
  );
};

export default ProcessInfo;
