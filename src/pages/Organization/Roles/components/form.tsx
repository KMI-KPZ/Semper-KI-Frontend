import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import useOrganizations from "../../hooks/useOrganizations";

interface OrganizationRolesFormProps {}

const OrganizationRolesForm: React.FC<OrganizationRolesFormProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { rolesQuery: organizationRolesQuery, createRoleMutation } =
    useOrganizations();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      name: yup.string().required(
        t("yup.required", {
          name: t("Organization.Roles.index.name"),
        })
      ),
      description: yup.string().required(
        t("yup.required", {
          name: t("Organization.Roles.index.description"),
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
    <div className="flex w-full flex-col items-center justify-center md:w-4/6 md:flex-row">
      <form className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <input
          placeholder={t("Organization.Roles.index.name") + "..."}
          {...register("name")}
          className="w-full bg-slate-100 px-5 py-2 "
        />
        <input
          placeholder={t("Organization.Roles.index.description") + "..."}
          {...register("description")}
          className="w-full bg-slate-100 px-5 py-2 "
        />
        <Button onClick={handleSubmit(onSubmit)}>
          {t("Organization.Roles.index.button.create")}
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
    </div>
  );
};

export default OrganizationRolesForm;
