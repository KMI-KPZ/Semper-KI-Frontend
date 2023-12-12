import React from "react";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import useOrganizations, {
  OrganizationInfoProps,
  UpdateOrgaInfoProps,
} from "../../hooks/useOrganizations";
import { ServiceType } from "@/pages/Service/hooks/useService";
import useServiceQuerys from "@/api/Service/useServiceQuerys";

interface OrganizationInfoFormProps {
  closeEdit: () => void;
  organizationInfo: OrganizationInfoProps;
}

const OrganizationInfoForm: React.FC<OrganizationInfoFormProps> = (props) => {
  const { organizationInfo, closeEdit } = props;
  const { t } = useTranslation();
  const { updateOrganizationInfo } = useOrganizations();
  const { servicesQuery } = useServiceQuerys();
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("yup.email"))
        .required(t("yup.required", { name: t("Organization.Info.email") })),
      supportedServices: yup
        .array()
        .of(
          yup.object({
            checked: yup.string().required(),
            type: yup.number().required(),
          })
        )
        .required(),
      name: yup
        .string()
        .required(t("yup.required", { name: t("Organization.Info.name") })),
      taxID: yup
        .string()
        .required(t("yup.required", { name: t("Organization.Info.taxID") })),
      adress: yup
        .string()
        .required(t("yup.required", { name: t("Organization.Info.adress") })),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    getValues,
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      adress: organizationInfo.details.adress,
      supportedServices:
        servicesQuery.data !== undefined
          ? servicesQuery.data.map((service) => ({
              checked:
                "" +
                organizationInfo.supportedServices.includes(service.identifier),
              type: service.identifier,
            }))
          : [],

      email: organizationInfo.details.email,
      name: organizationInfo.name,
      taxID: organizationInfo.details.taxID,
    },
  });

  const onSubmit = (data: FormData) => {
    logger("onSubmit", data);
    const fixedData: UpdateOrgaInfoProps = {
      adress: data.adress,
      email: data.email,
      name: data.name,
      taxID: data.taxID,
      supportedServices: data.supportedServices
        .filter((service) => service.checked === "true")
        .map((service) => service.type),
    };
    updateOrganizationInfo.mutate(fixedData);
    closeEdit();
  };

  logger("Service", watch("supportedServices"));

  return (
    <form
      className={`flex w-full flex-col flex-wrap items-center justify-center gap-5 bg-white p-5 md:flex-row`}
    >
      <Heading variant={`h1`}>
        {t("Organization.Info.components.form.title")}
      </Heading>
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>{t(`Organization.Info.name`)}</Text>
        <input
          className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
            errors.name !== undefined ? "border-red-500 bg-red-500" : ""
          }}`}
          placeholder={t("Organization.Info.components.form.name")}
          {...register("name")}
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>{t(`Organization.Info.adress`)}</Text>
        <input
          className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
            errors.adress !== undefined ? "border-red-500" : ""
          }`}
          placeholder={t("Organization.Info.components.form.adress")}
          {...register("adress")}
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>{t(`Organization.Info.email`)}</Text>
        <input
          className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
            errors.email !== undefined ? "border-red-500" : ""
          }`}
          placeholder={t("Organization.Info.components.form.email")}
          {...register("email")}
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>{t(`Organization.Info.taxID`)}</Text>
        <input
          className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${
            errors.taxID !== undefined ? "border-red-500" : ""
          }`}
          placeholder={t("Organization.Info.components.form.taxID")}
          {...register("taxID")}
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>
          {t(`Organization.Info.components.form.services`)}
        </Text>
        {servicesQuery.data !== undefined
          ? servicesQuery.data.map((service, index) => (
              <label key={index} className={`flex items-center gap-5`}>
                <Text variant={`body`}>
                  {t(
                    `enum.ServiceType.${
                      ServiceType[
                        service.identifier
                      ] as keyof typeof ServiceType
                    }`
                  )}
                </Text>
                <input
                  type="checkbox"
                  className={`h-6 w-6 bg-slate-100`}
                  {...register(`supportedServices.${index}.checked`)}
                />
                <input
                  type="hidden"
                  className={`h-6 w-6 bg-slate-100`}
                  {...register(`supportedServices.${index}.type`)}
                  value={service.identifier}
                />
              </label>
            ))
          : null}
      </div>
      {errors.adress !== undefined ||
      errors.supportedServices !== undefined ||
      errors.email !== undefined ||
      errors.name !== undefined ||
      errors.taxID !== undefined ? (
        <div
          className={`flex w-full flex-col items-center justify-center gap-5 md:flex-row`}
        >
          {errors.adress !== undefined ? (
            <div className={``}>{errors.adress.message}</div>
          ) : null}
          {errors.email !== undefined ? (
            <div className={``}>{errors.email.message}</div>
          ) : null}
          {errors.name !== undefined ? (
            <div className={``}>{errors.name.message}</div>
          ) : null}
          {errors.taxID !== undefined ? (
            <div className={``}>{errors.taxID.message}</div>
          ) : null}
          {errors.supportedServices !== undefined ? (
            <div className={``}>{errors.supportedServices.message}</div>
          ) : null}
        </div>
      ) : null}
      <Button
        title={t(`Organization.Info.components.form.button.safe`)}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default OrganizationInfoForm;
