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
import { ProcessState } from "../hooks/useProcess";
import { useProject } from "../hooks/useProject";

interface ProjectsTableProps {
  flatProjects: FlatProjectProps[];
}

interface ProjectsTableGroupingsProps {
  title: string;
  startState: ProcessState;
  endState: ProcessState;
}

const projectGroupings: ProjectsTableGroupingsProps[] = [
  {
    title: "draft",
    startState: ProcessState.DRAFT,
    endState: ProcessState.VERIFIED,
  },
  {
    title: "ongoing",
    startState: ProcessState.REQUESTED,
    endState: ProcessState.DELIVERY,
  },
  {
    title: "completed",
    startState: ProcessState.COMPLETED,
    endState: ProcessState.COMPLETED,
  },
];

interface ProjectsTableGroupProps {
  title: string;
  flatProjects: FlatProjectProps[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = (props) => {
  const { flatProjects } = props;
  const { t } = useTranslation();
  const { deleteProject } = useProject();

  const handleOnClickButtonDelete = (projectID: string) => {
    window.confirm(t("project.overview.components.table.deleteConfirm")) ===
    true
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
          project.state >= grouping.startState &&
          project.state <= grouping.endState
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
          title={t("project.overview.components.table.button.delete")}
          children={<DeleteIcon />}
          onClick={() => handleOnClickButtonDelete(flatProject.projectID)}
        />
      </PermissionGate>
      <PermissionGate element={"ProjectButtonSee"}>
        <Button
          variant="secondary"
          title={t("project.overview.components.table.button.detail")}
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
                  {t("project.overview.components.table.grouping")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("project.overview.components.table.name")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("project.overview.components.table.status")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("project.overview.components.table.count")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong" className="whitespace-nowrap">
                  {t("project.overview.components.table.created")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong" className="whitespace-nowrap">
                  {t("project.overview.components.table.updated")}
                </Text>
              </th>
              <th className="p-3 md:pb-3">
                <Text variant="strong">
                  {t("project.overview.components.table.actions")}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {getGroupedFlatProject(flatProjects).map(
              (group, groupIndex, groups) =>
                group.flatProjects
                  .sort((projectA, projectB) =>
                    projectA.state > projectB.state ? 1 : -1
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
                                `project.overview.components.table.groups.${group.title}`
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
                          `Projects.ProjectCollection.state.${
                            ProcessState[flatProject.state]
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
