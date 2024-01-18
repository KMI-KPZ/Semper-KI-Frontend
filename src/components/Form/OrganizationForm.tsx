import React from "react";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { ServiceType } from "@/pages/Service/hooks/useService";
import useServiceQuerys from "@/api/Service/useServiceQuerys";
import TextInput from "@component-library/Form/Inputs/TextInput";
import useOrganizations, {
  OrganizationInfoProps,
  UpdateOrgaInfoProps,
} from "@/pages/Organization/hooks/useOrganizations";
import { LoadingAnimation } from "@component-library/index";
import { Container } from "@component-library/index";

interface OrganizationFormProps {
  closeEdit: () => void;
  organizationInfo: OrganizationInfoProps;
}

interface OrganizationFormValues {
  name: string;
  email: string;
  address: string;
  taxID: string;
  supportedServices: string[];
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
      supportedServices: yup.array().of(yup.string().required()).required(),
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
  } = useForm<OrganizationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: organizationInfo.details.adress,
      supportedServices: organizationInfo.supportedServices.map((service) =>
        service.toString()
      ),
      email: organizationInfo.details.email,
      name: organizationInfo.name,
      taxID: organizationInfo.details.taxID,
    },
  });

  const onSubmit = (data: OrganizationFormValues) => {
    updateOrganizationInfo.mutate({
      ...data,
      supportedServices: data.supportedServices.map((service) =>
        parseInt(service)
      ),
    });
    closeEdit();
  };
  const labels: (keyof OrganizationFormValues)[] = [
    "name",
    "email",
    "address",
    "taxID",
    "supportedServices",
  ];

  const maxLength = Math.max(
    ...labels.map(
      (label) => t(`components.Form.OrganizationForm.${label}`).length
    )
  );

  return (
    <form
      className={`flex h-full w-full flex-col items-center justify-start gap-5  bg-white p-5 md:justify-center`}
    >
      <Heading variant={`h1`}>
        {t("Organization.Info.components.form.title")}
      </Heading>
      <Container direction="col" align="start">
        {labels
          .filter((label) => label !== "supportedServices")
          .map((label) => (
            <TextInput
              labelText={t(`components.Form.OrganizationForm.${label}`)}
              label={label}
              register={register}
              error={errors[label]}
              labelMaxWidth={maxLength}
              key={label}
            />
          ))}
        <Container
          direction="row"
          justify="start"
          align="start"
          className="flex-wrap"
        >
          <Text
            variant={`body`}
            style={{
              width: maxLength !== undefined ? `${maxLength * 8}px` : "",
            }}
          >
            {t(`Organization.Info.components.form.services`)}
          </Text>
          <Container className="w-fit">
            {servicesQuery.data !== undefined
              ? servicesQuery.data.map((service, index) => (
                  <label key={index} className={`flex items-center gap-5`}>
                    <input
                      className={`h-6 w-6 bg-slate-100`}
                      type="checkbox"
                      value={service.identifier}
                      {...register(`supportedServices`)}
                      style={{}}
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
          </Container>
        </Container>
        {errors.supportedServices !== undefined ? (
          <Text variant={`body`} className="text-red-500">
            {errors.supportedServices.message}
          </Text>
        ) : null}
      </Container>
      <Button
        title={t(`Organization.Info.components.form.button.safe`)}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default OrganizationForm;
