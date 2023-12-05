import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useRegisterOrganisation from "./hooks/useRegisterOrganisation";

interface RegisterOrganizationProps {}

export interface RegisterOrganizationFormData {
  name: string;
  email: string;
  adress: string;
  taxID: string;
  canManufacture: boolean;
}

const RegisterOrganization: React.FC<RegisterOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { registerOrganizationMutation } = useRegisterOrganisation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterOrganizationFormData>();

  const onSubmit = (data: RegisterOrganizationFormData) => {
    registerOrganizationMutation.mutate(data);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("RegisterOrganization.title")}</Heading>
      <form className="flex w-full max-w-3xl flex-col items-center justify-center gap-5">
        <label className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.name")}</Text>
          <input
            className="w-full max-w-xl rounded-md border-2 border-gray-300 p-2"
            type="text"
            placeholder={t("RegisterOrganization.form.name")}
            {...register("name", { required: true })}
          />
        </label>
        {errors.name !== undefined ? (
          <Text variant="body" className="text-red-500">
            {t("RegisterOrganization.form.error.name")}
          </Text>
        ) : null}
        <label className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <Text variant="body" className="whitespace-nowrap">
            {t("RegisterOrganization.form.email")}
          </Text>
          <input
            className="w-full max-w-xl rounded-md border-2 border-gray-300 p-2"
            type="email"
            placeholder={t("RegisterOrganization.form.email")}
            {...register("email", { required: true })}
          />
        </label>
        {errors.email !== undefined ? (
          <Text variant="body" className="text-red-500">
            {t("RegisterOrganization.form.error.email")}
          </Text>
        ) : null}
        <label className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.adress")}</Text>
          <input
            className="w-full max-w-xl rounded-md border-2 border-gray-300 p-2"
            type="text"
            placeholder={t("RegisterOrganization.form.adress")}
            {...register("adress", { required: true })}
          />
        </label>
        {errors.adress !== undefined ? (
          <Text variant="body" className="text-red-500">
            {t("RegisterOrganization.form.error.adress")}
          </Text>
        ) : null}
        <label className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.taxID")}</Text>
          <input
            className="w-full max-w-xl rounded-md border-2 border-gray-300 p-2"
            type="text"
            placeholder={t("RegisterOrganization.form.taxID")}
            {...register("taxID", { required: true })}
          />
        </label>
        {errors.taxID !== undefined ? (
          <Text variant="body" className="text-red-500">
            {t("RegisterOrganization.form.error.taxID")}
          </Text>
        ) : null}
        <label className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <Text variant="body">
            {t("RegisterOrganization.form.canManufacture")}
          </Text>
          <Container width="full" className="max-w-xl">
            <input
              className="h-8 w-8 rounded-md border-2 border-gray-300 p-2"
              type="checkbox"
              placeholder={t("RegisterOrganization.form.canManufacture")}
              {...register("canManufacture")}
            />
          </Container>
        </label>
        <Button
          title={t("RegisterOrganization.form.button.submit")}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default RegisterOrganization;
