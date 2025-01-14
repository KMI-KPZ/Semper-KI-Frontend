import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeProject from "./Project";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";

interface HomeProjektRowProps {
  project: FlatDashboardProject;
  open: boolean;
  handleOpen: (projectID: string) => void;
}

const HomeProjektRow: React.FC<HomeProjektRowProps> = (props) => {
  const { project, open, handleOpen } = props;
  const { t } = useTranslation();

  return (
    <>
      <tr className=" bg-gradient-to-br from-white/60 to-white/20">
        <td className="rounded-md rounded-br-none rounded-tr-none border-2 border-r-0 border-ultramarinblau-dark border-opacity-20 text-center">
          {project.projectDetails.title}
        </td>
        <td className="border-op b border-b-2 border-t-2 border-ultramarinblau-dark border-opacity-20  text-center">
          {project.updatedWhen.toLocaleString()}
        </td>
        <td className="border-b-2 border-t-2 border-ultramarinblau-dark border-opacity-20 text-center">
          {project.projectStatus}
        </td>
        <td className="rounded-md rounded-bl-none rounded-tl-none border-2 border-l-0 border-ultramarinblau-dark border-opacity-20">
          <Container justify="center" width="full" direction="row">
            <Button
              title={t("general.button.edit")}
              size="sm"
              variant="text"
              children={<EditIcon />}
            />
            <Button
              title={t("general.button.delete")}
              size="sm"
              variant="text"
              children={<DeleteIcon />}
            />
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
          </Container>
        </td>
      </tr>
      {open && <HomeProject projectID={project.projectID} />}
    </>
  );
};

export default HomeProjektRow;
