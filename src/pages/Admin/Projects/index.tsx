import { Heading } from "@component-library/Typography";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AdminFlatProjectProps } from "../hooks/useAdmin";
import { Button } from "@component-library/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@component-library/Container";
import logger from "@/hooks/useLogger";
import Search from "@component-library/Search";
import useSearch from "@/hooks/useSearch";
import { useProject } from "@/pages/Projects/hooks/useProject";
import { ProcessState } from "@/pages/Projects/hooks/useProcess";

interface Props {
  projects?: AdminFlatProjectProps[];
}

const AdminProjects: React.FC<Props> = (props) => {
  const { projects } = props;
  const { t } = useTranslation();
  const { deleteProject } = useProject();
  const { filterDataBySearchInput, handleSearchInputChange } = useSearch();
  const handleOnClickButtonDelete = (projectID: string) => {
    if (window.confirm(t("Admin.AdminProjectView.confirm")))
      deleteProject.mutate(projectID);
  };

  return (
    <div className="flex w-full flex-col items-center justify-normal gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.AdminProjectView.header")}</Heading>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Admin.AdminProjectView.projectID")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.clientName")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.projectTitle")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.processCount")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.status")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.accessed")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.created")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.updated")}</TableCell>
              <TableCell>{t("Admin.AdminProjectView.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects !== undefined && projects.length > 0
              ? projects
                  .filter((project: AdminFlatProjectProps) =>
                    filterDataBySearchInput(project)
                  )
                  .map((project: AdminFlatProjectProps, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { bproject: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {project.projectCollectionID}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.clientName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.details.title === undefined
                          ? "---"
                          : project.details.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.processCount}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {t(
                          `Projects.ProjectCollection.state.${
                            ProcessState[project.status]
                          }`
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.accessed.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.created.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.updated.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Container>
                          <Button
                            title={t("Admin.AdminProjectView.buttons.show")}
                            children={<VisibilityIcon />}
                            to={`/admin/projects/${project.projectCollectionID}`}
                          />
                          <Button
                            title={t("Admin.AdminProjectView.buttons.delete")}
                            children={<DeleteIcon />}
                            onClick={() =>
                              handleOnClickButtonDelete(
                                project.projectCollectionID
                              )
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
