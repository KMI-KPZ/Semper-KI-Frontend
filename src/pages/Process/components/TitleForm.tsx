import { Button, Text } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { useForm } from "react-hook-form";

interface ProcessTitleFormProps {
  title?: string;
  close: () => void;
  processID: string;
}

interface FormData {
  name: string;
}

const ProcessTitleForm: React.FC<ProcessTitleFormProps> = (props) => {
  const { title, close, processID } = props;
  const { t } = useTranslation();
  const updateProcess = useUpdateProcess();

  const isNew = title === undefined || title === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { name: title } });

  const onSubmit = (
    data: FormData,
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    e?.preventDefault();
    updateProcess.mutate(
      {
        processIDs: [processID],
        updates: { changes: { processDetails: { title: data.name } } },
      },
      {
        onSuccess: () => {
          close();
        },
      }
    );
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
          {t("Process.components.TitleForm.title")}
        </Heading>
        {isNew ? (
          <Text>{t("Process.components.TitleForm.describtion")}</Text>
        ) : null}
        <Container direction="col" gap={3} className="flex-wrap md:flex-nowrap">
          <input
            autoFocus
            {...register("name", { required: true })}
            onKeyDown={handleKeyDown}
            placeholder={t("Process.components.TitleForm.name")}
            className="w-fit rounded-md border-2 bg-gray-100 p-2"
          />

          {errors.name ? (
            <Text variant="error">
              {t("Process.components.TitleForm.error")}
            </Text>
          ) : null}
          <PermissionGate element="ProjectButtonEditName">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
              title={t("Process.components.TitleForm.button.save")}
              size="sm"
              width="fit"
            />
          </PermissionGate>
        </Container>
      </Container>
    </form>
  );
};

export default ProcessTitleForm;
