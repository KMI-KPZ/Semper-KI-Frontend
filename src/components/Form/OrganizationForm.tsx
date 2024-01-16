import React from "react";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import { ServiceType } from "@/pages/Service/hooks/useService";
import useServiceQuerys from "@/api/Service/useServiceQuerys";
import TextInput from "@component-library/Form/Inputs/TextInput";
import useOrganizations, {
  OrganizationInfoProps,
  UpdateOrgaInfoProps,
} from "@/pages/Organization/hooks/useOrganizations";
import { LoadingAnimation } from "@component-library/index";

interface OrganizationFormProps {
  closeEdit: () => void;
  organizationInfo: OrganizationInfoProps;
}

const OrganizationForm: React.FC<OrganizationFormProps> = (props) => {
  const { organizationInfo, closeEdit } = props;
  const { t } = useTranslation();
  const { updateOrganizationInfo } = useOrganizations();
  const { servicesQuery } = useServiceQuerys();
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("yup.email"))
        .required(
          t("yup.requiredName", { name: t("Organization.Info.email") })
        ),
      supportedServices: yup.array().of(yup.number().required()).required(),
      name: yup
        .string()
        .required(t("yup.requiredName", { name: t("Organization.Info.name") })),
      taxID: yup
        .string()
        .required(
          t("yup.requiredName", { name: t("Organization.Info.taxID") })
        ),
      address: yup
        .string()
        .required(
          t("yup.requiredName", { name: t("Organization.Info.adress") })
        ),
    })
    .required();

  const {
    getValues,
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrgaInfoProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: organizationInfo.details.adress,
      supportedServices: organizationInfo.supportedServices,
      email: organizationInfo.details.email,
      name: organizationInfo.name,
      taxID: organizationInfo.details.taxID,
    },
  });

  logger("watch supportedserivces", watch("supportedServices"));
  const onSubmit = (data: UpdateOrgaInfoProps) => {
    logger("Submit", data.supportedServices);
    // updateOrganizationInfo.mutate(data);
    closeEdit();
  };
  const labels: (keyof UpdateOrgaInfoProps)[] = [
    "name",
    "email",
    "address",
    "taxID",
  ];

  const maxLength = Math.max(
    ...labels.map(
      (label) => t(`components.Form.OrganizationForm.${label}`).length
    )
  );

  return (
    <form
      className={`flex w-full flex-col items-center justify-center gap-5 bg-white p-5 `}
    >
      <Heading variant={`h1`}>
        {t("Organization.Info.components.form.title")}
      </Heading>
      {labels.map((label) => (
        <TextInput
          labelText={t(`components.Form.OrganizationForm.${label}`)}
          label={label}
          register={register}
          error={errors[label]}
          labelMaxWidth={maxLength}
          key={label}
        />
      ))}
      <div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
        <Text variant={`body`}>
          {t(`Organization.Info.components.form.services`)}
        </Text>
        {servicesQuery.data !== undefined
          ? servicesQuery.data.map((service, index) => (
              <label key={index} className={`flex items-center gap-5`}>
                <input
                  className={`h-6 w-6 bg-slate-100`}
                  type="checkbox"
                  {...register(`supportedServices`, {
                    valueAsNumber: true,
                    // value: service.identifier,
                  })}
                  value={service.identifier}
                />
                <Text variant={`body`}>
                  {t(
                    `enum.ServiceType.${
                      ServiceType[
                        service.identifier
                      ] as keyof typeof ServiceType
                    }`
                  )}
                </Text>
              </label>
            ))
          : null}
      </div>
      {errors.supportedServices !== undefined ? (
        <Text variant={`body`} className="text-red-500">
          {errors.supportedServices.message}
        </Text>
      ) : null}
      <Button
        title={t(`Organization.Info.components.form.button.safe`)}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default OrganizationForm;
