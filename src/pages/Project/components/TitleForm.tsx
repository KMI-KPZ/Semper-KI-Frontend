import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { boolean } from "yup";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import useUpdateProject from "@/api/Project/Mutations/useUpdateProject";

interface ProjectTitleFormProps {
  title?: string;
  close: () => void;
  onSubmit?: (title: string) => void;
}

const ProjectTitleForm: React.FC<ProjectTitleFormProps> = (props) => {
  const { title, close, onSubmit } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<string>(title !== undefined ? title : "");
  const updatedProject = useUpdateProject();

  const updatedTitle = () => {
    if (onSubmit !== undefined) onSubmit(state);
    else {
      updatedProject.mutate(
        {
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
    setState((prevState) => e.target.value);
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
        className="w-full bg-slate-100 p-2 md:w-fit"
        onChange={handleOnChangeInput}
      />
      <OwnerGate>
        <PermissionGate element="ProjectButtonEditName">
          <Button
            onClick={handleOnClickEditCheckButton}
            variant="secondary"
            title={t("Projects.Project.components.TitleForm.button.edit")}
            size="xs"
            width="fit"
            children={<CheckIcon fontSize="small" />}
          />
        </PermissionGate>
      </OwnerGate>
    </Container>
  );
};

export default ProjectTitleForm;
