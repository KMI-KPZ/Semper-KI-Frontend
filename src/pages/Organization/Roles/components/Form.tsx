import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import useOrganizations, { Permission } from "../../hooks/useOrganizations";
import logger from "@/hooks/useLogger";
import { Heading } from "@component-library/Typography";

interface OrganizationRolesFormProps {
  roleID: string;
  permissions: Permission[];
}

const OrganizationRolesForm: React.FC<OrganizationRolesFormProps> = (props) => {
  const { roleID, permissions } = props;
  const { t } = useTranslation();
  const { rolesQuery, createRoleMutation } = useOrganizations(roleID);
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      name: yup.string().required(
        t("yup.required", {
          name: t("Organization.Roles.components.Form.name"),
        })
      ),
      description: yup.string().required(
        t("yup.required", {
          name: t("Organization.Roles.components.Form.description"),
        })
      ),
      permissions: yup
        .array()
        .of(
          yup.object({
            check: yup.boolean(),
          })
        )
        .required(),
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
    logger("onSubmitInvite", data);
    // setLoading(true);
    // createRoleMutation.mutate(
    //   { name: data.name, description: data.description },
    //   {
    //     onSuccess(data, variables, context) {
    //       setLoading(false);
    //       reset();
    //     },
    //   }
    // );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">
        {t("Organization.Roles.components.Form.title")}
      </Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <input
            placeholder={t("Organization.Roles.components.Form.name") + "..."}
            {...register("name")}
            className="w-full bg-slate-100 px-5 py-2 "
          />
          <input
            placeholder={
              t("Organization.Roles.components.Form.description") + "..."
            }
            {...register("description")}
            className="w-full bg-slate-100 px-5 py-2 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          {permissions.map((permission, index) => (
            <input
              type="checkbox"
              placeholder={
                t("Organization.Roles.components.Form.description") + "..."
              }
              {...register(`permissions.${index}.check`)}
              name={`${permission}`}
              className="w-full bg-slate-100 px-5 py-2 "
            />
          ))}
        </div>
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
        <Button
          onClick={handleSubmit(onSubmit)}
          title={t("Organization.Roles.components.Form.button.create")}
        />
      </form>
    </div>
  );
};

export default OrganizationRolesForm;
