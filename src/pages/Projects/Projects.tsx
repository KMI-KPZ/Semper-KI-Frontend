import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { FlatProjectProps, useFlatProjects } from "./hooks/useFlatProjects";
import ProjectsTable from "./components/Table";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { UserProps, UserType } from "@/hooks/useUser";
import { useProject } from "./hooks/useProject";

interface ProjectsProps {
  user: UserProps | undefined;
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  const { flatProjectsQuery } = useFlatProjects();
  const { createProject } = useProject();

  const onButtonClickCreateProject = () => {
    createProject.mutate();
  };

  const sortProjectByUpdatedDate = (
    project1: FlatProjectProps,
    project2: FlatProjectProps
  ) => {
    if (project1.updated > project2.updated) {
      return 1;
    }
    if (project1.updated < project2.updated) {
      return -1;
    }
    return 0;
  };

  const renderClientProjects = () =>
    flatProjectsQuery.data !== undefined &&
    flatProjectsQuery.data.length > 0 ? (
      <ProjectsTable
        flatProjects={
          user !== undefined && user.usertype === UserType.ORGANIZATION
            ? flatProjectsQuery.data
                .filter((project) =>
                  user.organizations.includes(project.client)
                )
                .sort(sortProjectByUpdatedDate)
            : flatProjectsQuery.data.sort(sortProjectByUpdatedDate)
        }
      />
    ) : (
      <Text variant="body">{t("Projects.Projects.empty")}</Text>
    );

  const renderOrganizationProjects = (user: UserProps) =>
    flatProjectsQuery.data !== undefined &&
    flatProjectsQuery.data.length > 0 &&
    flatProjectsQuery.data.filter(
      (project) => !user.organizations.includes(project.client)
    ).length > 0 ? (
      <ProjectsTable
        flatProjects={flatProjectsQuery.data
          .filter((project) => !user.organizations.includes(project.client))
          .sort(sortProjectByUpdatedDate)}
      />
    ) : (
      <Text variant="body">{t("Projects.Projects.empty")}</Text>
    );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
        <Heading variant="h1">{t("Projects.Projects.title")}</Heading>
        <PermissionGate element={"ProjectsButtonNew"}>
          <Button
            title={t("Projects.Projects.button.create")}
            onClick={onButtonClickCreateProject}
          />
        </PermissionGate>
      </div>
      <LoadingSuspense query={flatProjectsQuery}>
        {renderClientProjects()}
        {user !== undefined && user.usertype === UserType.ORGANIZATION ? (
          <>
            <Heading variant="h2" className="mt-10 w-full text-left">
              {t("Projects.Projects.orga")}
            </Heading>
            {renderOrganizationProjects(user)}
          </>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default Projects;
