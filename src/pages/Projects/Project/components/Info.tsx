import { Project } from "@/api/Project/Querys/useGetProject";
import { Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = (props) => {
  const { project } = props;
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-5 bg-white p-5">
      <Text variant="body" className="break-all">
        {t("Projects.Project.components.Info.id")} {project.projectID}
      </Text>
      <Text variant="body">
        {t("Projects.Project.components.Info.created")}{" "}
        {new Date(project.createdWhen).toLocaleDateString()}
      </Text>
      <Text variant="body">
        {t("Projects.Project.components.Info.updated")}{" "}
        {new Date(project.updatedWhen).toLocaleDateString()}
      </Text>
    </div>
  );
};

export default ProjectInfo;
