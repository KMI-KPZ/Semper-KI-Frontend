import { Button, Text } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { boolean } from "yup";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import useUpdateProject from "@/api/Project/Mutations/useUpdateProject";
import { useForm } from "react-hook-form";

interface CreateProjectTitleFormProps {
  close: () => void;
  onSubmit: (title: string) => void;
}

interface FormData {
  name: string;
}

const CreateProjectTitleForm: React.FC<CreateProjectTitleFormProps> = (
  props
) => {
  const { close, onSubmit } = props;
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLAnchorElement>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const triggerButtonClick = () => {
    buttonRef.current?.click();
  };

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      triggerButtonClick();
    }
  };

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.name);
  };

  return (
    <form>
      <Container direction="col">
        <Heading variant="h2">
          {t("Projects.components.TitleForm.heading")}
        </Heading>
        <Container direction="col" gap={3} className="flex-wrap md:flex-nowrap">
          <input
            autoFocus
            {...register("name", { required: true })}
            placeholder={t("Projects.components.TitleForm.name")}
            className="w-fit rounded-xl border-2 bg-gray-100 p-2"
          />
          {errors.name ? (
            <Text variant="error">
              {t("Projects.components.TitleForm.error")}
            </Text>
          ) : null}
          <OwnerGate>
            <PermissionGate element="ProjectButtonEditName">
              <Button
                onClick={handleSubmit(onSubmitForm)}
                variant="primary"
                title={t("Projects.components.TitleForm.button.create")}
                size="sm"
                width="fit"
              />
            </PermissionGate>
          </OwnerGate>
        </Container>
      </Container>
    </form>
  );
};

export default CreateProjectTitleForm;
