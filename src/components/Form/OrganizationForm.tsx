import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { Container } from "@component-library/index";
import useGeneralInput from "@component-library/Form/hooks/useGeneralInput";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import useGetServices, {
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { GeneralInput, InputType } from "@component-library/Form/GeneralInput";
import { Language, app_languages } from "../Menu/components/LanguageMenu";
import ContractorCard from "../Process/ContractorCard";

interface OrganizationFormProps {
  closeEdit: () => void;
  organization: Organization;
}

interface OrganizationFormValues {
  displayName: string;
  email: string;
  locale: string;
  supportedServices: string[];
  branding_logo_url: string;
  branding_colors_primary: string;
  branding_colors_page_background: string;
  taxID: string;
}

const OrganizationForm: React.FC<OrganizationFormProps> = (props) => {
  const { organization, closeEdit } = props;
  const { t } = useTranslation();
  const updateOrganizationInfo = useUpdateOrganization();
  const servicesQuery = useGetServices();
  const { getMaxLabelWidth } = useGeneralInput();

  const schema = yup
    .object({
      displayName: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Form.OrganizationForm.displayName"),
        })
      ),
      email: yup
        .string()
        .email(t("yup.email"))
        .required(
          t("yup.requiredName", {
            name: t("components.Form.OrganizationForm.email"),
          })
        ),
      locale: yup.string().required(
        t("yup.requiredName", {
          name: t(`components.Form.OrganizationForm.locale`),
        })
      ),
      notifications: yup.array().of(
        yup.object({
          type: yup.string(),
          event: yup.boolean(),
          email: yup.boolean(),
        })
      ),
      branding_logo_url: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Form.OrganizationForm.branding_logo_url"),
        })
      ),

      branding_colors_primary: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Form.OrganizationForm.branding_colors_primary"),
        })
      ),

      branding_colors_page_background: yup.string().required(
        t("yup.requiredName", {
          name: t(
            "components.Form.OrganizationForm.branding_colors_page_background"
          ),
        })
      ),
      supportedServices: yup.array().of(yup.string().required()).required(),
      taxID: yup.string().required(
        t("yup.requiredName", {
          name: t("components.Form.OrganizationForm.taxID"),
        })
      ),
    })
    .required();

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: organization.name,
      email: organization.details.email,
      taxID: organization.details.taxID,
      branding_colors_page_background:
        organization.details.branding !== undefined
          ? organization.details.branding.colors.page_background
          : "#FFFFFF",
      branding_colors_primary:
        organization.details.branding !== undefined
          ? organization.details.branding.colors.primary
          : "#000000",
      branding_logo_url:
        organization.details.branding !== undefined
          ? organization.details.branding.logo_url
          : "",
      locale: organization.details.locale,
      supportedServices: organization.supportedServices.map((service) =>
        service.toString()
      ),
    },
  });

  const handleOnClickButtonCancel = () => {
    closeEdit();
    reset();
  };

  const onSubmit = (data: OrganizationFormValues) => {
    updateOrganizationInfo.mutate({
      changes: {
        ...data,
        branding: {
          colors: {
            page_background: data.branding_colors_page_background,
            primary: data.branding_colors_primary,
          },
          logo_url: data.branding_logo_url,
        },
        supportedServices: data.supportedServices
          .map((service) => parseInt(service))
          .filter(
            (newService) => !organization.supportedServices.includes(newService)
          ),
      },
      deletions: {
        supportedServices: organization.supportedServices.filter(
          (service) => !data.supportedServices.includes(service.toString())
        ),
      },
    });
    closeEdit();
  };
  const labels: [keyof OrganizationFormValues, InputType][] = [
    ["displayName", "text"],
    ["email", "text"],
    ["taxID", "text"],
    ["branding_colors_primary", "color"],
    ["branding_colors_page_background", "color"],
    ["branding_logo_url", "text"],
  ];

  const maxLength = getMaxLabelWidth(
    labels.map((label) => t(`components.Form.OrganizationForm.${label[0]}`))
  );

  // logger("OrganizationForm", errors);

  return (
    <form
      className={`flex  w-full flex-col items-center justify-start gap-5  bg-white p-5 md:justify-center`}
    >
      <Heading variant={`h1`}>
        {t("components.Form.OrganizationForm.heading")}
      </Heading>
      <Container direction="col" align="start">
        {labels.map((label) => (
          <GeneralInput
            type={label[1]}
            labelText={t(`components.Form.OrganizationForm.${label[0]}`)}
            label={label[0]}
            register={register}
            // error={errors[label[0]]}
            labelMaxWidth={maxLength}
            key={label[0]}
          />
        ))}
        <Container width="full">
          <img
            src={watch("branding_logo_url")}
            className="h-60 w-full object-contain"
          />
        </Container>
        <Container direction="row">
          <Text>{t("components.Form.OrganizationForm.contractorCard")}</Text>
          <ContractorCard
            className="w-fit"
            contractor={{
              details: {
                branding: {
                  colors: {
                    page_background: watch("branding_colors_page_background"),
                    primary: watch("branding_colors_primary"),
                  },
                  logo_url: watch("branding_logo_url"),
                },
              },
              hashedID: organization.hashedID,
              name: organization.name,
              priceRange: [333, 666],
            }}
          />
        </Container>
        <Container
          direction="row"
          justify="start"
          align="center"
          className="flex-wrap"
        >
          <Text
            variant={`body`}
            style={{
              width: maxLength !== undefined ? `${maxLength}px` : "",
            }}
          >
            {t(`components.Form.OrganizationForm.locale`)}
          </Text>
          <select {...register("locale")} className="rounded-lg border-2 p-2">
            {app_languages.map((language: Language, index) => (
              <option value={language.code} key={index}>
                {t(
                  `components.Form.OrganizationForm.languages.${language.code}`
                )}
              </option>
            ))}
          </select>
          {errors.locale !== undefined ? (
            <span className="text-red-500">{errors.locale.message}</span>
          ) : null}
        </Container>
        <Container
          direction="row"
          justify="start"
          align="center"
          className="flex-wrap"
        >
          <Text
            variant={`body`}
            style={{
              width: maxLength !== undefined ? `${maxLength}px` : "",
            }}
          >
            {t(`components.Form.OrganizationForm.supportedServices`)}
          </Text>
          <Container className="w-fit" direction="col" align="start">
            {servicesQuery.data !== undefined
              ? servicesQuery.data.map((service, index) => (
                  <label key={index} className={`flex items-center gap-5`}>
                    <input
                      className={`h-6 w-6 bg-slate-100`}
                      type="checkbox"
                      value={service.type}
                      {...register(`supportedServices`)}
                    />
                    <Text variant={`body`}>
                      {t(
                        `enum.ServiceType.${
                          ServiceType[service.type] as keyof typeof ServiceType
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
      <Container width="full">
        <Button
          variant="text"
          title={t(`general.button.cancel`)}
          onClick={handleOnClickButtonCancel}
        />
        <Button
          variant="primary"
          title={t(`general.button.save`)}
          onClick={handleSubmit(onSubmit)}
        />
      </Container>
    </form>
  );
};

export default OrganizationForm;
