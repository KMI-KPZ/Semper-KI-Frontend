import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Container from "@component-library/Container";
import { FlatProjectProps } from "../hooks/useFlatProjects";
import { ProcessStatus } from "../hooks/useProcess";
import { useProject } from "../hooks/useProject";

interface ProjectsTableProps {
  flatProjects: FlatProjectProps[];
}

interface ProjectsTableGroupingsProps {
  title: "draft" | "ongoing" | "completed";
  startState: ProcessStatus;
  endState: ProcessStatus;
}

const projectGroupings: ProjectsTableGroupingsProps[] = [
  {
    title: "draft",
    startState: ProcessStatus.DRAFT,
    endState: ProcessStatus.VERIFIED,
  },
  {
    title: "ongoing",
    startState: ProcessStatus.REQUESTED,
    endState: ProcessStatus.DELIVERY,
  },
  {
    title: "completed",
    startState: ProcessStatus.COMPLETED,
    endState: ProcessStatus.COMPLETED,
  },
];

interface ProjectsTableGroupProps {
  title: "draft" | "ongoing" | "completed";
  flatProjects: FlatProjectProps[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = (props) => {
  const { flatProjects } = props;
  const { t } = useTranslation();
  const { deleteProject } = useProject();

  const handleOnClickButtonDelete = (projectID: string) => {
    window.confirm(t("Projects.components.Table.deleteConfirm")) === true
      ? deleteProject.mutate(projectID)
      : logger("delete canceled");
  };

  const getGroupedFlatProject = (
    flatProjects: FlatProjectProps[]
  ): ProjectsTableGroupProps[] => {
    let projectGroups: ProjectsTableGroupProps[] = [];
    projectGroupings.forEach((grouping) => {
      const filteredProjects = flatProjects.filter(
        (project) =>
          project.status >= grouping.startState &&
          project.status <= grouping.endState
      );
      if (filteredProjects.length > 0)
        projectGroups.push({
          title: grouping.title,
          flatProjects: filteredProjects,
        });
    });
    return projectGroups;
  };

  const renderRowButtons = (flatProject: FlatProjectProps) => (
    <div className="flex w-full flex-row items-center justify-center gap-5">
      <PermissionGate element={"ProjectButtonDelete"}>
        <Button
          variant="secondary"
          title={t("Projects.components.Table.button.delete")}
          children={<DeleteIcon />}
          onClick={() => handleOnClickButtonDelete(flatProject.projectID)}
        />
      </PermissionGate>
      <PermissionGate element={"ProjectButtonSee"}>
        <Button
          variant="secondary"
          title={t("Projects.components.Table.button.detail")}
          children={<VisibilityIcon />}
          to={`/projects/${flatProject.projectID}`}
        />
      </PermissionGate>
    </div>
  );

  return (
    <Container className="overflow-auto" width="full">
      <div className="w-full">
        <table aria-label="simple table" className="w-full table-auto">
          <thead className="">
            <tr className="border-b">
              <th className="p-3 md:pb-3">
                <Text variant="strong">
                  {t("Projects.components.Table.grouping")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("Projects.components.Table.name")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("Projects.components.Table.status")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("Projects.components.Table.count")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong" className="whitespace-nowrap">
                  {t("Projects.components.Table.created")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong" className="whitespace-nowrap">
                  {t("Projects.components.Table.updated")}
                </Text>
              </th>
              <th className="p-3 md:pb-3">
                <Text variant="strong">
                  {t("Projects.components.Table.actions")}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {getGroupedFlatProject(flatProjects).map(
              (group, groupIndex, groups) =>
                group.flatProjects
                  .sort((projectA, projectB) =>
                    projectA.status > projectB.status ? 1 : -1
                  )
                  .map((flatProject, index, groupFlatProject) => (
                    <tr
                      className={` ${
                        groupFlatProject.length - 1 === index &&
                        groups.length - 1 === groupIndex
                          ? ""
                          : "border-b"
                      }`}
                      key={flatProject.projectID + index + groupIndex}
                    >
                      {index === 0 ? (
                        <td
                          scope="row"
                          rowSpan={groupFlatProject.length}
                          className={`h-full p-3 align-top md:py-3`}
                        >
                          <div className="flex w-full justify-center">
                            <Heading variant="h2">
                              {t(
                                `Projects.components.Table.groups.${group.title}`
                              )}
                            </Heading>
                          </div>
                        </td>
                      ) : null}
                      <td className="p-3 md:py-3">
                        {flatProject.details.title === undefined
                          ? `Auftrag: #${flatProject.projectID}`
                          : flatProject.details.title}
                      </td>
                      <td className="p-3 md:py-3">
                        {t(
                          `enum.ProcessStatus.${
                            ProcessStatus[
                              flatProject.status
                            ] as keyof typeof ProcessStatus
                          }`
                        )}
                      </td>
                      <td className="p-3 md:py-3">
                        {flatProject.processesCount}
                      </td>
                      <td className="p-3 md:py-3">
                        {flatProject.created.toLocaleDateString()}
                      </td>
                      <td className="p-3 md:py-3">
                        {flatProject.updated.toLocaleDateString()}
                      </td>
                      <td className="p-3 md:py-3">
                        {renderRowButtons(flatProject)}
                      </td>
                    </tr>
                  ))
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ProjectsTable;
