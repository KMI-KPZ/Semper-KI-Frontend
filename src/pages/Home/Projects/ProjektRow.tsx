import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Modal } from "@component-library/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeProject from "./Project";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import useDeleteProject from "@/api/Project/Mutations/useDeleteProject";
import logger from "@/hooks/useLogger";
import ProjectTitleForm from "@/pages/Project/components/TitleForm";
import useUser, { UserType } from "@/hooks/useUser";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import useCloneProcess from "@/api/Process/Mutations/useCloneProcess";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface HomeProjektRowProps {
  project: FlatDashboardProject;
  open: boolean;
  handleOpen: (projectID: string) => void;
  recieved?: boolean;
}

const HomeProjektRow: React.FC<HomeProjektRowProps> = (props) => {
  const { project, open, handleOpen, recieved = false } = props;

  const { user } = useUser();
  const { t } = useTranslation();

  const deleteProject = useDeleteProject();
  const cloneProcess = useCloneProcess();
  const createProcess = useCreateProcess();

  const [titleEdit, setTitleEdit] = React.useState<boolean>(false);

  const handleOnClickButtonEditTitle = () => {
    setTitleEdit(!titleEdit);
  };

  const handleOnClickButtonDelete = () => {
    window.confirm(t("Projects.components.TableRow.deleteConfirm")) === true
      ? deleteProject.mutate([project.projectID])
      : logger("delete canceled");
  };

  const handleOnClickButtonClone = () => {
    if (project.processIDs)
      window.confirm(t("Projects.components.TableRow.cloneConfirm")) === true
        ? cloneProcess.mutate({
            projectID: project.projectID,
            processIDs: project.processIDs,
          })
        : logger("clone canceled");
  };

  const handleOnClickButtonCreateProcess = () => {
    createProcess.mutate(project.projectID);
  };

  return (
    <>
      <tr
        className="bg-gradient-to-br from-white/60 to-white/20 hover:cursor-pointer"
        onClick={() => handleOpen(project.projectID)}
      >
        <td className=" rounded-md rounded-br-none rounded-tr-none border-2 border-r-0 border-ultramarinblau-dark border-opacity-20 p-1 text-center">
          {project.projectDetails.title}
        </td>
        <td className="border-op b border-b-2 border-t-2 border-ultramarinblau-dark border-opacity-20 p-1 text-center">
          {project.updatedWhen.toLocaleString()}
        </td>
        <td className="border-b-2 border-t-2 border-ultramarinblau-dark border-opacity-20 p-1 text-center">
          {project.processesCount}
        </td>
        <td className="rounded-md rounded-bl-none rounded-tl-none border-2 border-l-0 border-ultramarinblau-dark border-opacity-20 p-1">
          <Container justify="center" width="full" direction="row">
            {!recieved ||
            (user.usertype === UserType.ORGANIZATION &&
              user.organization !== undefined &&
              user.organization === project.client) ? (
              <>
                {project.owner ? (
                  <Button
                    title={t("Home.Projects.button.clone")}
                    size="sm"
                    variant="text"
                    children={<ControlPointDuplicateIcon />}
                    onClick={() => {
                      handleOnClickButtonClone();
                    }}
                  />
                ) : null}
                <Button
                  title={t("Home.Projects.button.createProcess", {
                    name: project.projectDetails.title,
                  })}
                  size="sm"
                  variant="text"
                  children={<AddCircleOutlineIcon />}
                  onClick={() => {
                    handleOnClickButtonCreateProcess();
                  }}
                />
                <Button
                  title={t("general.button.edit")}
                  size="sm"
                  variant="text"
                  children={<EditIcon />}
                  onClick={() => {
                    handleOnClickButtonEditTitle();
                  }}
                />
                <Button
                  title={t("general.button.delete")}
                  size="sm"
                  variant="text"
                  children={<DeleteIcon />}
                  onClick={() => handleOnClickButtonDelete()}
                />
              </>
            ) : null}
            <Button
              title={t("general.button.expand")}
              size="sm"
              variant="text"
              onClick={() => handleOpen(project.projectID)}
              children={
                <div
                  className={`transition duration-300 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ExpandMoreIcon />
                </div>
              }
            />
            <Modal
              modalKey="projectTitleEdit"
              open={titleEdit}
              closeModal={() => {
                setTitleEdit(false);
              }}
            >
              <ProjectTitleForm
                project={project}
                title={project.projectDetails.title}
                close={() => {
                  setTitleEdit(false);
                }}
              />
            </Modal>
          </Container>
        </td>
      </tr>
      {open && (
        <HomeProject projectID={project.projectID} owner={project.owner} />
      )}
    </>
  );
};

export default HomeProjektRow;
