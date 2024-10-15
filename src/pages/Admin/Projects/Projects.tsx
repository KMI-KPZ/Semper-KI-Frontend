import { Heading, Search } from "@component-library/index";

import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin from "../hooks/useAdmin";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
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

interface Props {}

const AdminProjects: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { flatProjects } = useAdmin();
  const deleteProject = useDeleteProject();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<FlatProject>();
  const {
    getSortIcon,
    handleSort,
    sortItems,
    getNestedSortIcon,
    handleNestedSort,
  } = useSort<FlatProject>();
  const { handlePageChange, paginatedItems, totalPages } =
    usePagination<FlatProject>({
      items: flatProjects
        .filter((project: FlatProject) => filterDataBySearchInput(project))
        .sort(sortItems),
    });

  const handleOnClickButtonDelete = (projectID: string) => {
    if (window.confirm(t("Admin.Projects.confirm")))
      deleteProject.mutate([projectID]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 overflow-auto bg-white p-5">
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
              ? paginatedItems.map((project: FlatProject, index: number) => (
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
                      <Container>
                        <Button
                          title={t("Admin.Projects.buttons.show")}
                          variant="text"
                          to={`/admin/projects/${project.projectID}`}
                        />
                        <Button
                          title={t("Admin.Projects.buttons.delete")}
                          variant="text"
                          onClick={() =>
                            handleOnClickButtonDelete(project.projectID)
                          }
                        />
                      </Container>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </TableContainer>
      <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
};

export default AdminProjects;
