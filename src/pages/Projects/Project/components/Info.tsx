import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProjectProps } from "../../hooks/useProject";

interface ProjectInfoProps {
  project: ProjectProps;
}

const ProjectInfo: React.FC<ProjectInfoProps> = (props) => {
  const { project } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-fit flex-col items-start justify-center gap-5 bg-white p-10">
      <Text variant="body" className="break-all">
        {t("Projects.ProjectInfo.id")} {project.projectID}
      </Text>
      <Text variant="body">
        {t("Projects.ProjectInfo.created")}{" "}
        {new Date(project.created).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Projects.ProjectInfo.updated")}{" "}
        {new Date(project.updated).toLocaleDateString()}
      </Text>
    </div>
  );
};

export default ProjectInfo;
