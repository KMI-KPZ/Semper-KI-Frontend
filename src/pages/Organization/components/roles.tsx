import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  OrganizationRoleProps,
} from "../hooks/useOrganizations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/Loading";
import ClearIcon from "@mui/icons-material/Clear";

interface OrganizationRolesProps {}

const OrganizationRoles: React.FC<OrganizationRolesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationRolesQuery, createRoleMutation } = useOrganizations();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      name: yup
        .string()
        .required(
          t("yup.required", { name: t("Organization.components.roles.name") })
        ),
      description: yup.string().required(
        t("yup.required", {
          name: t("Organization.components.roles.description"),
        })
      ),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("onSubmitInvite", data);
    setLoading(true);
    createRoleMutation.mutate(
      { name: data.name, description: data.description },
      {
        onSuccess(data, variables, context) {
          setLoading(false);
          reset();
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:w-4/6">
      <h2>{t("Organization.components.roles.header")}</h2>
      <form className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <input
          placeholder={t("Organization.components.roles.name") + "..."}
          {...register("name")}
          className="w-full bg-slate-100 px-5 py-2 "
        />
        <input
          placeholder={t("Organization.components.roles.description") + "..."}
          {...register("description")}
          className="w-full bg-slate-100 px-5 py-2 "
        />
        <Button onClick={handleSubmit(onSubmit)}>
          {t("Organization.components.roles.button.create")}
        </Button>
      </form>
      {errors.description !== undefined || errors.name !== undefined ? (
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          {errors.name !== undefined ? (
            <div className="w-full p-5 text-center text-red-500">
              {errors.name.message}
            </div>
          ) : null}
          {errors.description !== undefined ? (
            <div className="w-full p-5 text-center text-red-500">
              {errors.description.message}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5">
        <LoadingSuspense query={organizationRolesQuery}>
          {organizationRolesQuery.data !== undefined &&
          organizationRolesQuery.data.length > 0
            ? organizationRolesQuery.data.map((role, index) => (
                <OrganizationRole key={index} {...role} />
              ))
            : t("Organization.components.roles.error.empty")}
        </LoadingSuspense>
      </div>
    </div>
  );
};

const OrganizationRole: React.FC<OrganizationRoleProps> = (props) => {
  const { name, id, description } = props;
  const { t } = useTranslation();
  const { deleteRoleMutation } = useOrganizations();
  const handleOnClickButton = () => {
    deleteRoleMutation.mutate(id);
  };
  return (
    <div
      className="flex flex-row items-center justify-center gap-1 rounded-2xl bg-blau-50 px-3 py-1"
      title={description}
    >
      <span>{name}</span>
      <div
        title={t("Organization.components.roles.button.delete")}
        className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-red-300"
        onClick={handleOnClickButton}
      >
        <ClearIcon fontSize="small" />
      </div>
    </div>
  );
};

export default OrganizationRoles;
