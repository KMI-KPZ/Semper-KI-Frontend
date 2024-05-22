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

interface ProjectTitleFormProps {
  title: string;
  updateTitle(title: string): void;
  headerType: "h1" | "h2" | "h3";
  labelTitle?: string;
  forId?: string;
  edit?: boolean;
}

const ProjectTitleForm: React.FC<ProjectTitleFormProps> = (props) => {
  const { title, updateTitle, headerType, labelTitle, forId, edit } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<{ edit: boolean; titleText: string }>({
    edit: edit === undefined ? false : edit,
    titleText: "",
  });

  const updatedTitle = () => {
    if (state.edit) updateTitle(state.titleText);
    setState((prevState) => {
      return {
        edit: !prevState.edit,
        titleText: prevState.edit ? prevState.titleText : title,
      };
    });
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
    setState((prevState) => ({
      ...prevState,
      titleText: e.target.value,
    }));
  };

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updatedTitle();
    }
  };

  return (
    <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap">
      {state.edit === true ? (
        <>
          <Heading variant={headerType} className="md:whitespace-nowrap">
            {labelTitle !== undefined
              ? labelTitle
              : t("Projects.Project.components.TitleForm.name")}
          </Heading>
          <input
            autoFocus
            onKeyDown={handelOnKeyDown}
            type="text"
            value={state.titleText}
            className="w-full bg-slate-100 p-2 md:w-fit"
            onChange={handleOnChangeInput}
          />
        </>
      ) : (
        <label htmlFor={forId}>
          <Heading variant={headerType} className="md:whitespace-nowrap">
            {t("Projects.Project.components.TitleForm.name")} {title}
          </Heading>
        </label>
      )}
      <OwnerGate>
        <PermissionGate element="ProjectButtonEditName">
          <Button
            onClick={handleOnClickEditCheckButton}
            variant="secondary"
            title={t("Projects.Project.components.TitleForm.button.edit")}
            size="xs"
            width="fit"
            children={
              state.edit ? (
                <CheckIcon fontSize="small" />
              ) : (
                <EditIcon fontSize="small" />
              )
            }
          />
        </PermissionGate>
      </OwnerGate>
    </Container>
  );
};

export default ProjectTitleForm;
