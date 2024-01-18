import logger from "@/hooks/useLogger";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { type } from "os";
import { yupResolver } from "@hookform/resolvers/yup";
import useOrganizationMutations from "@/api/Organization/useOrganizationMutations";

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
  const [success, setSuccess] = React.useState(false);

  const { registerOrganizationMutation } = useOrganizationMutations();
  const schema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required(t(`RegisterOrganization.form.error.name.required`))
        .min(3, t(`RegisterOrganization.form.error.name.length`))
        .max(50, t(`RegisterOrganization.form.error.name.length`))
        .matches(
          /^(?=[a-z0-9])[a-z0-9_-]{2,49}$/,
          t("RegisterOrganization.form.error.name.regex")
        ),
      display_name: yup
        .string()
        .required(t(`RegisterOrganization.form.error.display_name`)),
      email: yup
        .string()
        .email(t(`RegisterOrganization.form.error.email.email`))
        .required(t(`RegisterOrganization.form.error.email.required`)),
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
  } = useForm<RegisterOrganizationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      display_name: "",
      logo_url: "",
      primary_color: "#000000",
      background_color: "#FFFFFF",
    },
  });

  const onSubmit = (data: RegisterOrganizationFormData) => {
    registerOrganizationMutation.mutate(data, {
      onSuccess: () => setSuccess(true),
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("RegisterOrganization.title")}</Heading>
      {success ? (
        <>
          <Heading variant="h1">{t("RegisterOrganization.success")}</Heading>
          <Button title={t("RegisterOrganization.button.login")} to="login" />
        </>
      ) : (
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
                      {errors[key]!.message}
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
      )}
    </div>
  );
};

export default RegisterOrganization;
