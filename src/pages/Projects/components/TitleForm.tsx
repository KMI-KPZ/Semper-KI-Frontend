import { Button, Text } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useForm } from "react-hook-form";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";

interface CreateProjectTitleFormProps {
  close: () => void;
}

interface FormData {
  name: string;
}

const CreateProjectTitleForm: React.FC<CreateProjectTitleFormProps> = (
  props
) => {
  const { close } = props;
  const { t } = useTranslation();
  const createProject = useCreateProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (
    data: FormData,
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    e?.preventDefault();
    close();
    createProject.mutate(data.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form>
      <Container direction="col">
        <Heading variant="h1">
          {t("Projects.components.TitleForm.heading")}
        </Heading>
        <Text>{t("Projects.components.TitleForm.subheading")}</Text>
        <Text>{t("Projects.components.TitleForm.subheading2")}</Text>
        <Container direction="col" gap={3} className="flex-wrap md:flex-nowrap">
          <input
            autoFocus
            {...register("name", { required: true })}
            onKeyDown={handleKeyDown}
            placeholder={t("Projects.components.TitleForm.name")}
            className="w-fit rounded-md border-2 bg-gray-100 p-2"
          />
          {errors.name ? (
            <Text variant="error">
              {t("Projects.components.TitleForm.error")}
            </Text>
          ) : null}
          <PermissionGate element="ProjectButtonEditName">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
              title={t("Projects.components.TitleForm.button.create")}
              size="sm"
              width="fit"
            />
          </PermissionGate>
        </Container>
      </Container>
    </form>
  );
};

export default CreateProjectTitleForm;
