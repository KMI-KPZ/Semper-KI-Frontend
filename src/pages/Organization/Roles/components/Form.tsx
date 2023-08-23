import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import useOrganizations, {
  Permission,
  RoleProps,
} from "../../hooks/useOrganizations";
import logger from "@/hooks/useLogger";
import { Heading, Text } from "@component-library/Typography";
import { sortPermissions } from "../Roles";
import { LoadingAnimation } from "@component-library/index";

interface OrganizationRolesFormProps {
  allPermissions: Permission[];
  role?: RoleProps;
  resetForm(): void;
}

interface FormData {
  name: string;
  description: string;
  permissions: {
    name: string;
    checked: boolean;
  }[];
}

const OrganizationRolesForm: React.FC<OrganizationRolesFormProps> = (props) => {
  const { role, allPermissions, resetForm } = props;
  const { t } = useTranslation();
  const {
    rolePermissionsQuery,
    createRoleMutation,
    updatePermissionForRoleMutation,
    editRoleMutation,
  } = useOrganizations(role?.id);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      role === undefined
        ? {
            name: "",
            description: "",
            permissions: [],
          }
        : async () => {
            return {
              name: role.name,
              description: role.description,
              permissions: [],
            };
          },
  });

  const onSubmit = (data: FormData) => {
    logger("onSubmitInvite", data, role);
    setLoading(true);
    if (role === undefined) {
      createRoleMutation.mutate(
        { name: data.name, description: data.description },
        {
          onSuccess(_data, variables, context) {
            updatePermissionForRoleMutation.mutate(
              {
                roleID: _data.id,
                permissionIDs: data.permissions
                  .filter((permission) => permission.checked)
                  .map((permission) => permission.name),
              },
              {
                onSuccess() {
                  setLoading(false);
                  resetForm();
                  reset();
                },
              }
            );
          },
        }
      );
    } else {
      editRoleMutation.mutate(
        { roleID: role.id, name: data.name, description: data.description },
        {
          onSuccess() {
            updatePermissionForRoleMutation.mutate({
              roleID: role.id,
              permissionIDs: data.permissions
                .filter((permission) => permission.checked)
                .map((permission) => permission.name),
            });
            setLoading(false);
            resetForm();
            reset();
          },
        }
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1" className="px-10">
        {t("Organization.Roles.components.Form.title")}
      </Heading>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <form className="flex w-full flex-col items-center justify-center gap-5">
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <label className="flex flex-col items-center justify-center gap-2">
              <Text variant="body">
                {t("Organization.Roles.components.Table.name")}
              </Text>
              <input
                placeholder={
                  t("Organization.Roles.components.Table.name") + "..."
                }
                {...register("name", {
                  required: t(
                    "Organization.Roles.components.Form.validation.name.required"
                  ),
                })}
                className="w-full bg-slate-100 px-5 py-2 "
              />
            </label>
            <label className="flex flex-col items-center justify-center gap-2">
              <Text variant="body">
                {t("Organization.Roles.components.Table.description")}
              </Text>

              <input
                placeholder={
                  t("Organization.Roles.components.Table.description") + "..."
                }
                {...register("description", {
                  required: t(
                    "Organization.Roles.components.Form.validation.name.required"
                  ),
                })}
                className="w-full bg-slate-100 px-5 py-2 "
              />
            </label>
          </div>
          <Heading variant="h2">
            {t("Organization.Roles.components.Form.permissions")}
          </Heading>
          <div className="flex w-full flex-row flex-wrap gap-5">
            {allPermissions
              .sort((p1, p2) => sortPermissions(p1, p2))
              .map((permission, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <Text variant="body">
                    {permission.permission_name
                      .split(":")
                      .map((title) =>
                        t(`Organization.Roles.components.Table.${title}`)
                      )
                      .join(" ")}
                  </Text>
                  <input
                    type="hidden"
                    {...register(`permissions.${index}.name`)}
                    value={permission.permission_name}
                    className="w-full bg-slate-100 px-5 py-2 "
                  />
                  <input
                    type="checkbox"
                    {...register(`permissions.${index}.checked`)}
                    className="h-8 w-8  bg-slate-100 px-5 py-2"
                  />
                </label>
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
            title={t(
              `Organization.Roles.components.Form.button.${
                role === undefined ? "create" : "safe"
              }`
            )}
          />
        </form>
      )}
    </div>
  );
};

export default OrganizationRolesForm;
