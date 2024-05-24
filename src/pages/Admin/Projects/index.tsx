import { Heading, Search } from "@component-library/index";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useAdmin from "../hooks/useAdmin";
import { Button } from "@component-library/index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@component-library/index";
import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { useProject } from "@/hooks/Project/useProject";
import useSearch from "@/hooks/useSearch";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface Props {}

const AdminProjects: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { flatProjects } = useAdmin();
  const { deleteProject } = useProject();
  const { filterDataBySearchInput, handleSearchInputChange } = useSearch();

  const handleOnClickButtonDelete = (projectID: string) => {
    if (window.confirm(t("Admin.Projects.confirm"))) deleteProject([projectID]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 overflow-auto bg-white p-5">
      <Heading variant="h1">{t("Admin.Projects.header")}</Heading>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.Projects.projectID")}</TableCell>
              <TableCell>{t("Admin.Projects.clientName")}</TableCell>
              <TableCell>{t("Admin.Projects.projectTitle")}</TableCell>
              <TableCell>{t("Admin.Projects.processesCount")}</TableCell>
              <TableCell>{t("Admin.Projects.status")}</TableCell>
              {/* <TableCell>{t("Admin.Projects.accessed")}</TableCell> */}
              <TableCell>{t("Admin.Projects.created")}</TableCell>
              <TableCell>{t("Admin.Projects.updated")}</TableCell>
              <TableCell>{t("Admin.Projects.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flatProjects.length > 0
              ? flatProjects
                  .filter((project: FlatProject) =>
                    filterDataBySearchInput(project)
                  )
                  .map((project: FlatProject, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {project.projectID}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.client}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.projectDetails.title === undefined
                          ? "---"
                          : project.projectDetails.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.processesCount}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {t(
                          `enum.ProcessStatus.${
                            ProcessStatus[
                              project.projectStatus
                            ] as keyof typeof ProcessStatus
                          }`
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.createdWhen.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.updatedWhen.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Container>
                          <Button
                            title={t("Admin.Projects.buttons.show")}
                            children={<VisibilityIcon />}
                            to={`/admin/projects/${project.projectID}`}
                          />
                          <Button
                            title={t("Admin.Projects.buttons.delete")}
                            children={<DeleteIcon />}
                            onClick={() =>
                              handleOnClickButtonDelete(project.projectID)
                            }
                          />
                        </Container>
                      </TableCell>
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminProjects;
