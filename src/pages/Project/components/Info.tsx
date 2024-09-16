import { Project } from "@/api/Project/Querys/useGetProject";
import { Button, Container, Modal, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "@/components/Collapsible/Collapsible";
import ProjectTitleForm from "./TitleForm";
import ProcessMenu from "@/components/Process/Menu";
import EditIcon from "@mui/icons-material/Edit";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = (props) => {
  const { project } = props;
  const { t } = useTranslation();
  const [titleEdit, setTitleEdit] = React.useState<boolean>(false);

  const handleOnClickButtonEditTitle = () => {
    setTitleEdit(!titleEdit);
  };

  return (
    <Container
      width="full"
      direction="col"
      className="relative gap-2 bg-white p-5"
    >
      <ProcessMenu
        buttonTitle={t("Project.components.Info.button.menu")}
      ></ProcessMenu>
      <Container direction="row" width="full" justify="start" className="gap-0">
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Project.components.Info.name")}
          </Text>
          <Text>{project.projectDetails.title}</Text>
          <Button
            stopPropagation={false}
            title={t("Project.components.Info.button.editTitle")}
            variant="secondary"
            size="xs"
            onClick={handleOnClickButtonEditTitle}
            children={<EditIcon />}
          />
        </Container>
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Project.components.Info.updated")}
          </Text>
          <Text>{project.updatedWhen.toLocaleString()}</Text>
        </Container>
      </Container>
      <Collapsible showButton logName="Project">
        <Container
          direction="row"
          justify="start"
          width="full"
          className="gap-0"
        >
          <Container className="w-1/3 md:w-1/3" justify="start">
            <Text variant="strong" className="w-40">
              {t("Project.components.Info.count")}
            </Text>
            <Text>{project.processes.length}</Text>
          </Container>
          <Container className="w-1/3 md:w-1/3" justify="start">
            <Text variant="strong" className="w-40">
              {t("Project.components.Info.created")}
            </Text>
            <Text>{project.createdWhen.toLocaleString()}</Text>
          </Container>
        </Container>
        <Container
          direction="row"
          justify="between"
          width="full"
          className="gap-0"
        >
          <Container>
            <Text variant="strong" className="w-40">
              {t("Project.components.Info.inProgess")}
            </Text>
            <Text>{project.processes.length}</Text>
          </Container>
        </Container>
        <Container
          direction="row"
          justify="between"
          width="full"
          className="gap-0"
        >
          <Container>
            <Text variant="strong" className="w-40">
              {t("Project.components.Info.finished")}
            </Text>
            <Text>{project.processes.length}</Text>
          </Container>
        </Container>
      </Collapsible>
      <Modal
        modalKey="projectTitleEdit"
        open={titleEdit}
        closeModal={() => {
          setTitleEdit(false);
        }}
      >
        <ProjectTitleForm
          title={project.projectDetails.title}
          close={() => {
            setTitleEdit(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default ProjectInfo;
