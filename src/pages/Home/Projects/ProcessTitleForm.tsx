import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import ProjectOwnerGate from "@/components/OwnerGate/OwnerGate";
import useUpdateProject from "@/api/Project/Mutations/useUpdateProject";
import { Project } from "@/api/Project/Querys/useGetProject";
import { FlatDashboardProject } from "@/api/Project/Querys/useGetDashboardProjects";

interface ProjectTitleFormProps {
  title?: string;
  close: () => void;
  onSubmit?: (title: string) => void;
  project: Project | FlatDashboardProject;
}

const ProjectTitleForm: React.FC<ProjectTitleFormProps> = (props) => {
  const { title, close, onSubmit, project } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<string>(title !== undefined ? title : "");
  const updatedProject = useUpdateProject();

  const updatedTitle = () => {
    if (onSubmit !== undefined) onSubmit(state);
    else {
      updatedProject.mutate(
        {
          projectID: project.projectID,
          changes: { projectDetails: { title: state } },
        },
        {
          onSuccess: () => {
            close();
          },
        }
      );
    }
  };

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updatedTitle();
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState(() => e.target.value);
  };

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updatedTitle();
    }
  };

  return (
    <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap">
      <Heading variant={"h2"} className="md:whitespace-nowrap">
        {t("Project.components.TitleForm.name")}
      </Heading>
      <input
        autoFocus
        onKeyDown={handelOnKeyDown}
        type="text"
        value={state}
        className="w-fit rounded-md border-2 bg-gray-100 p-2"
        onChange={handleOnChangeInput}
      />
      <ProjectOwnerGate project={project}>
        <Button
          onClick={handleOnClickEditCheckButton}
          variant="primary"
          title={t("Project.components.TitleForm.button.edit")}
          size="xs"
          width="fit"
          children={<CheckIcon fontSize="small" />}
        />
      </ProjectOwnerGate>
    </Container>
  );
};

export default ProjectTitleForm;
