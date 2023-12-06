import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useRegisterOrganisation from "./hooks/useRegisterOrganisation";
import { type } from "os";

interface RegisterOrganizationProps {}
export type RegisterOrganizationFormData = {
  name: string;
  email: string;
  display_name: string;
  logo_url: string;
  primary_color: string;
  background_color: string;
};

const RegisterOrganization: React.FC<RegisterOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { registerOrganizationMutation } = useRegisterOrganisation();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(t(`RegisterOrganization.form.error.name`)),
      display_name: yup
        .string()
        .required(t(`RegisterOrganization.form.error.display_name`)),
      email: yup.string().required(t(`RegisterOrganization.form.error.email`)),
      logo_url: yup
        .string()
        .required(t(`RegisterOrganization.form.error.logo_url`)),
      primary_color: yup
        .string()
        .required(t(`RegisterOrganization.form.error.primary_color`)),
      background_color: yup
        .string()
        .required(t(`RegisterOrganization.form.error.background_color`)),
    })
    .required()
    .defined();
  type RegisterOrganizationFormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterOrganizationFormData>();

  const onSubmit = (data: RegisterOrganizationFormData) => {
    registerOrganizationMutation.mutate(data);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("RegisterOrganization.title")}</Heading>
      <form className="flex w-full max-w-3xl flex-col items-center justify-center gap-10">
        {Object.keys(schema.fields).map((schemaKey) => {
          const key = schemaKey as keyof RegisterOrganizationFormData;
          return (
            <Container key={key} direction="col" width="full" gap={3}>
              <Container
                direction="auto"
                width="full"
                justify="between"
                gap={3}
              >
                <Text variant="body">
                  {t(`RegisterOrganization.form.${key}`)}
                </Text>
                {key.includes("color") ? (
                  <input
                    className="h-10 w-full max-w-xl rounded-md border-2 border-gray-300"
                    type={"color"}
                    placeholder={t(`RegisterOrganization.form.${key}`)}
                    {...register(key, {
                      required: true,
                    })}
                  />
                ) : (
                  <input
                    className={`w-full max-w-xl rounded-md border-2  p-2 ${
                      errors[key] !== undefined
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    type={"text"}
                    placeholder={t(`RegisterOrganization.form.${key}`)}
                    {...register(key, {
                      required: true,
                    })}
                  />
                )}
              </Container>
              {errors[key] !== undefined ? (
                <Container width="full" justify="end">
                  <Text
                    variant="body"
                    className="w-full max-w-xl text-center text-red-500"
                  >
                    {t(`RegisterOrganization.form.error.${key}`)}
                  </Text>
                </Container>
              ) : null}
            </Container>
          );
        })}
        <Button
          title={t("RegisterOrganization.form.button.submit")}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default RegisterOrganization;
