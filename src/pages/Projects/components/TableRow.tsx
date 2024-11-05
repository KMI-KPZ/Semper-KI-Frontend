import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { Badge, Button, Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import useDeleteProject from "@/api/Project/Mutations/useDeleteProject";
import useEvents from "@/hooks/useEvents/useEvents";

interface ProjectsTableRowProps {
  flatProject: FlatProject;
}

const ProjectsTableRow: React.FC<ProjectsTableRowProps> = (props) => {
  const { flatProject } = props;
  const { t } = useTranslation();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();
  const { getTotalProjectEventCount } = useEvents();

  const handleOnClickButtonDelete = (projectID: string) => {
    window.confirm(t("Projects.components.Table.deleteConfirm")) === true
      ? deleteProject.mutate([projectID])
      : logger("delete canceled");
  };

  return (
    <tr
      key={flatProject.projectID}
      className="group  rounded-md ring-0 duration-300 hover:cursor-pointer hover:ring-2 hover:ring-blau-button"
      onClick={() => navigate(`${flatProject.projectID}`)}
    >
      <td className=" rounded-md rounded-e-none border-2 border-r-0 text-center">
        {flatProject.projectDetails.title}
      </td>
      <td className="border-b-2 border-t-2  text-center">
        {flatProject.updatedWhen.toLocaleString()}
      </td>
      <td className="border-b-2 border-t-2 text-center">
        {flatProject.projectStatus}
      </td>
      <td className="border-b-2 border-t-2 text-center">
        {flatProject.processesCount}
      </td>
      <td className="rounded-r-md border-2 border-l-0 p-0">
        <Container width="full" justify="between" direction="row">
          <Button
            title={t("Projects.components.Table.button.delete")}
            variant="text"
            size="sm"
            width="full"
            onClick={() => handleOnClickButtonDelete(flatProject.projectID)}
          />
          <Badge count={getTotalProjectEventCount(flatProject.projectID)}>
            <a
              onClick={() => navigate(`${flatProject.projectID}`)}
              className="hover group relative flex h-10  w-20 transform flex-row
            items-center  overflow-clip rounded-br-md
            rounded-tr-md bg-blau-button
            text-white
            duration-300 group-hover:cursor-pointer 
            group-hover:bg-ultramarinblau group-hover:ring-1 
            "
              href="#"
            >
              <div className="absolute right-1 flex flex-row overflow-clip duration-300 group-hover:-right-6">
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
              </div>
            </a>
          </Badge>
        </Container>
      </td>
    </tr>
  );
};

export default ProjectsTableRow;
