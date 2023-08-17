import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { Button, LoadingSuspense, Text } from "@component-library/index";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "console";

interface OrganizationInfoProps {}

const OrganizationInfo: React.FC<OrganizationInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationInfoQuery, updateOrganizationInfo } = useOrganizations();
  const [edit, setEdit] = useState<boolean>(false);
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("yup.email"))
        .required(t("yup.required", { name: "Email" })),
      canManufacture: yup
        .boolean()
        .required(t("yup.required", { name: "canManufacture" })),
      name: yup.string().required(t("yup.required", { name: "name" })),
      taxID: yup.string().required(t("yup.required", { name: "taxID" })),
      adress: yup.string().required(t("yup.required", { name: "adress" })),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues:
      organizationInfoQuery.data === undefined
        ? {}
        : {
            adress: organizationInfoQuery.data.details.adress,
            canManufacture: organizationInfoQuery.data.canManufacture,
            email: organizationInfoQuery.data.details.email,
            name: organizationInfoQuery.data.name,
            taxID: organizationInfoQuery.data.details.taxID,
          },
  });

  const onSubmit = (data: FormData) => {
    logger("onSubmit", data);
    updateOrganizationInfo.mutate(data);
    setEdit((prevState) => !prevState);
  };

  const handleOnClickButton = () => {
    if (edit) {
      handleSubmit(onSubmit);
    } else {
      setEdit(true);
    }
  };

  return (
    <LoadingSuspense query={organizationInfoQuery}>
      {organizationInfoQuery.data !== undefined ? (
        <div className="flex w-full flex-col items-center gap-5 p-5 shadow-card">
          <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
            <Text variant="body">
              {t(`Organization.components.Info.accessed`)}
              {organizationInfoQuery.data.accessed.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {t(`Organization.components.Info.created`)}
              {organizationInfoQuery.data.created.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {t(`Organization.components.Info.updated`)}
              {organizationInfoQuery.data.updated.toLocaleDateString()}
            </Text>
            <Text variant="body">
              {t(`Organization.components.Info.name`)}
              {organizationInfoQuery.data.name}
            </Text>
            <Text variant="body" className="break-all">
              {t(`Organization.components.Info.id`)}
              {organizationInfoQuery.data.hashedID}
            </Text>
          </div>
          {edit ? (
            <form className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <Text variant="body">
                  {t(`Organization.components.Info.name`)}
                </Text>
                <input
                  className="w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow"
                  placeholder={t("Organization.components.Info.form.name")}
                  {...register("name")}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <Text variant="body">
                  {t(`Organization.components.Info.adress`)}
                </Text>
                <input
                  className="w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow"
                  placeholder={t("Organization.components.Info.form.adress")}
                  {...register("adress")}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <Text variant="body">
                  {t(`Organization.components.Info.email`)}
                </Text>
                <input
                  className="w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow"
                  placeholder={t("Organization.components.Info.form.email")}
                  {...register("email")}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <Text variant="body">
                  {t(`Organization.components.Info.taxID`)}
                </Text>
                <input
                  className="w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow"
                  placeholder={t("Organization.components.Info.form.taxID")}
                  {...register("taxID")}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <Text variant="body">
                  {t(`Organization.components.Info.canManufacture.name`)}
                </Text>
                <input
                  type="checkbox"
                  className="h-10 w-10 bg-slate-100"
                  placeholder={t(
                    "Organization.components.Info.form.canManufacture"
                  )}
                  {...register("canManufacture")}
                />
              </div>
              {errors.adress !== undefined ||
              errors.canManufacture !== undefined ||
              errors.email !== undefined ||
              errors.name !== undefined ||
              errors.taxID !== undefined ? (
                <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                  {errors.adress !== undefined ? (
                    <div className="">{errors.adress.message}</div>
                  ) : null}
                  {errors.email !== undefined ? (
                    <div className="">{errors.email.message}</div>
                  ) : null}
                  {errors.name !== undefined ? (
                    <div className="">{errors.name.message}</div>
                  ) : null}
                  {errors.taxID !== undefined ? (
                    <div className="">{errors.taxID.message}</div>
                  ) : null}
                  {errors.canManufacture !== undefined ? (
                    <div className="">{errors.canManufacture.message}</div>
                  ) : null}
                </div>
              ) : null}
              <Button
                title={t(`Organization.components.Info.button.safe`)}
                onClick={handleSubmit(onSubmit)}
              />
            </form>
          ) : (
            <>
              <div className="flex w-full flex-col justify-between gap-x-14 gap-y-5 md:flex-row md:flex-wrap">
                <Text variant="body">
                  {t(`Organization.components.Info.canManufacture.name`)}
                  {t(
                    `Organization.components.Info.canManufacture.${
                      organizationInfoQuery.data.canManufacture
                        ? "true"
                        : "false"
                    }`
                  )}
                </Text>
                <Text variant="body">
                  {t(`Organization.components.Info.adress`)}
                  {organizationInfoQuery.data.details.adress}
                </Text>
                <Text variant="body">
                  {t(`Organization.components.Info.email`)}
                  {organizationInfoQuery.data.details.email}
                </Text>
                <Text variant="body">
                  {t(`Organization.components.Info.taxID`)}
                  {organizationInfoQuery.data.details.taxID}
                </Text>
              </div>
              <Button
                title={t(`Organization.components.Info.button.edit`)}
                onClick={handleOnClickButton}
              />
            </>
          )}
        </div>
      ) : null}
    </LoadingSuspense>
  );
};

export default OrganizationInfo;
