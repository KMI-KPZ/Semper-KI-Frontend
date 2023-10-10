import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface RegisterOrganizationProps {}

interface FormData {
  name: string;
  email: string;
  adress: string;
  taxID: string;
  canManufacture: boolean;
}

const RegisterOrganization: React.FC<RegisterOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    logger("onSubmit", data);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("RegisterOrganization.title")}</Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.name")}</Text>
          <input
            className="bproject-2 bproject-gray-300 w-full rounded-md p-2"
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
        <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Text variant="body" className="whitespace-nowrap">
            {t("RegisterOrganization.form.email")}
          </Text>
          <input
            className="bproject-2 bproject-gray-300 w-full rounded-md p-2"
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
        <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.adress")}</Text>
          <input
            className="bproject-2 bproject-gray-300 w-full rounded-md p-2"
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
        <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Text variant="body">{t("RegisterOrganization.form.taxID")}</Text>
          <input
            className="bproject-2 bproject-gray-300 w-full rounded-md p-2"
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
        <label className="flex w-full flex-col items-center justify-start gap-5 md:flex-row">
          <Text variant="body">
            {t("RegisterOrganization.form.canManufacture")}
          </Text>
          <input
            className="bproject-2 bproject-gray-300 h-8 w-8 rounded-md p-2"
            type="checkbox"
            placeholder={t("RegisterOrganization.form.canManufacture")}
            {...register("canManufacture")}
          />
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
