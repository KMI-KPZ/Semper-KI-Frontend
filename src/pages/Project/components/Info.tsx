import { Project } from "@/api/Project/Querys/useGetProject";
import { Button, Container, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapsible from "@/components/Collapsible/Collapsible";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = (props) => {
  const { project } = props;
  const { t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <Container
      width="full"
      direction="col"
      className="relative gap-2 bg-white p-5"
    >
      <Button
        className="absolute right-3 top-3"
        width="fit"
        title={t("Project.components.Info.button.menu")}
        variant="text"
      >
        <MoreHorizIcon />
      </Button>
      <Container direction="row" width="full" justify="start" className="gap-0">
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Project.components.Info.name")}
          </Text>
          <Text>{project.projectDetails.title}</Text>
        </Container>
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Project.components.Info.updated")}
          </Text>
          <Text>{project.updatedWhen.toLocaleString()}</Text>
        </Container>
      </Container>
      <Collapsible>
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
    </Container>
  );
};

export default ProjectInfo;
