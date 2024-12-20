import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";
import HomeProject from "./Project";

interface HomeProjektRowProps {
  project: DashboardProject;
  open: boolean;
  handleOpen: (projectID: string) => void;
}

const HomeProjektRow: React.FC<HomeProjektRowProps> = (props) => {
  const { project, open, handleOpen } = props;
  const { t } = useTranslation();

  return (
    <>
      <tr className=" bg-gray-200">
        <td className="text-center">{project.projectTitle}</td>
        <td className="text-center">{project.updatedWhen.toLocaleString()}</td>
        <td className="text-center">{project.projectStatus}</td>
        <td className="flex flex-row items-center justify-center">
          <Container justify="center" width="fit" direction="row">
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
