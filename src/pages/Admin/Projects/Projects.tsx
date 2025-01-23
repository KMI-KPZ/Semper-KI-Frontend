import { Heading, Search } from "@component-library/index";

import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin from "../../../hooks/useAdmin";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import useSearch from "@/hooks/useSearch";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useDeleteProject from "@/api/Project/Mutations/useDeleteProject";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";
import useSort from "@/hooks/useSort";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Table/Pagination";
import { useNavigate } from "react-router-dom";

interface Props {}

const AdminProjects: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { dashboardProject } = useAdmin();
  const navigate = useNavigate();
  const deleteProject = useDeleteProject();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<FlatDashboardProject>();
  const {
    getSortIcon,
    handleSort,
    sortItems,
    getNestedSortIcon,
    handleNestedSort,
  } = useSort<FlatDashboardProject>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<FlatDashboardProject>({
      items: dashboardProject
        .filter((project: FlatDashboardProject) =>
          filterDataBySearchInput(project)
        )
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (
    projectID: string,
    projectTitle: string | undefined = ""
  ) => {
    if (window.confirm(t("Admin.Projects.confirm", { name: projectTitle })))
      deleteProject.mutate([projectID]);
  };

  const handleOnClickButtonDetails = (projectID: string) => {
    navigate(projectID);
  };

  // const handleOnClickButtonEdit = (projectID: string) => {
  //   navigate(projectID);
  // };

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Projects.header")}</Heading>
      </BackButtonContainer>
      <Search handleSearchInputChange={handleSearchInputChange} />

      <TableContainer>
        <Table type="fixed_last_row">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.projectID")}
                objectKey="projectID"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.clientName")}
                objectKey="client"
              />
              <TableHeaderButton
                handleSort={handleNestedSort}
                getSortIcon={getNestedSortIcon}
                title={t("Admin.Projects.projectTitle")}
                objectKey="projectDetails.title"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.processesCount")}
                objectKey="processesCount"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.status")}
                objectKey="projectStatus"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.created")}
                objectKey="createdWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Admin.Projects.updated")}
                objectKey="updatedWhen"
              />
              <th>{t("Admin.Projects.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0
              ? paginatedItems.map(
                  (project: FlatDashboardProject, index: number) => (
                    <tr key={index}>
                      <td>{project.projectID}</td>
                      <td>{project.client}</td>
                      <td>
                        {project.projectDetails.title === undefined
                          ? "---"
                          : project.projectDetails.title}
                      </td>
                      <td>{project.processesCount}</td>
                      <td>
                        {t(
                          `enum.ProcessStatus.${
                            ProcessStatus[
                              project.projectStatus
                            ] as keyof typeof ProcessStatus
                          }`
                        )}
                      </td>
                      <td className="whitespace-nowrap">
                        {project.createdWhen.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap">
                        {project.updatedWhen.toLocaleString()}
                      </td>
                      <td>
                        <Container direction="col" width="full">
                          <Button
                            title={t("general.button.details")}
                            onClick={() =>
                              handleOnClickButtonDetails(project.projectID)
                            }
                            variant="text"
                          />
                          {/* <Button
                          title={t("Admin.Resources.button.edit")}
                          onClick={() =>
                            handleOnClickButtonEdit(project.projectID)
                          }
                          variant="text"
                        /> */}
                          <Button
                            title={t("general.button.delete")}
                            onClick={() =>
                              handleOnClickButtonDelete(
                                project.projectID,
                                project.projectDetails.title
                              )
                            }
                            variant="text"
                          />
                        </Container>
                      </td>
                    </tr>
                  )
                )
              : null}
          </tbody>
        </Table>
      </TableContainer>
      <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
    </Container>
  );
};

export default AdminProjects;
