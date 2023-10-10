import { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessInfoProps {
  process: ProcessProps;
}

const ProcessInfo: React.FC<ProcessInfoProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-fit flex-col items-start justify-center gap-5 bg-white p-10">
      <Text variant="body" className="break-all">
        {t("Projects.ProjectView.id")} {process.processID}
      </Text>
      <Text variant="body">
        {t("Projects.ProjectView.created")}{" "}
        {new Date(process.created).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Projects.ProjectView.updated")}{" "}
        {new Date(process.updated).toLocaleDateString()}
      </Text>
    </div>
  );
};

export default ProcessInfo;
