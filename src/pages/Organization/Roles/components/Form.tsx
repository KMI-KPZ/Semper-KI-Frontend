import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@component-library/index";
import logger from "@/hooks/useLogger";
import { Heading, Text } from "@component-library/index";
import { sortPermissions } from "../Roles";
import { LoadingAnimation } from "@component-library/index";
import { PermissionProps } from "@/api/Organization/Querys/useGetOrganizationPermissions";
import useCreateRole, {
  RoleProps,
} from "@/api/Organization/Mutations/useCreateRole";
import useOrganization from "../../../../hooks/useOrganization";
import useUpdateRolePermissions from "@/api/Organization/Mutations/useUpdateRolePermissions";
import useUpdateRole from "@/api/Organization/Mutations/useUpdateRole";
import useGetOrganizationRolePermissions from "@/api/Organization/Querys/useGetOrganizationRolePermissions";

interface OrganizationRolesFormProps {
  allPermissions: PermissionProps[];
  role?: RoleProps;
  resetForm(): void;
}

interface FormData {
  name: string;
  description: string;
  permissions?: {
    name: string;
    checked: boolean;
  }[];
}

const OrganizationRolesForm: React.FC<OrganizationRolesFormProps> = (props) => {
  const { role, allPermissions, resetForm } = props;
  const { t } = useTranslation();
  const rolePermissionsQuery = useGetOrganizationRolePermissions(role?.id);
  const createRole = useCreateRole();
  const updateRolePermission = useUpdateRolePermissions();
  const updateRole = useUpdateRole();

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
            permissions: allPermissions.map((permission) => {
              return {
                name: permission.permission_name,
                checked: true,
              };
            }),
          }
        : async () => {
            return {
              name: role.name,
              description: role.description,
              permissions: allPermissions.map((permission) => {
                return {
                  name: permission.permission_name,
                  checked:
                    rolePermissionsQuery.data !== undefined
                      ? rolePermissionsQuery.data.find(
                          (rolePermission) =>
                            rolePermission.permission_name ===
                            permission.permission_name
                        ) !== undefined
                        ? true
                        : false
                      : false,
                };
              }),
            };
          },
  });

  const onSubmit = (data: FormData) => {
    if (role === undefined) {
      createRole.mutate(
        { name: data.name, description: data.description },
        {
          onSuccess(data, variables, context) {
            resetForm();
            reset();
          },
        }
      );
    } else {
      updateRole.mutate(
        { roleID: role.id, name: data.name, description: data.description },
        {
          onSuccess() {
            updateRolePermission.mutate({
              roleID: role.id,
              permissionIDs:
                data.permissions !== undefined
                  ? data.permissions
                      .filter((permission) => permission.checked)
                      .map((permission) => permission.name)
                  : [],
            });
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
        {t(
          `Organization.Roles.components.Form.title.${
            role === undefined ? "create" : "edit"
          }`
        )}
      </Heading>
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
                  "Organization.Roles.components.Form.validation.required"
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
                  "Organization.Roles.components.Form.validation.required"
                ),
              })}
              className="w-full bg-slate-100 px-5 py-2 "
            />
          </label>
        </div>
        {role !== undefined ? (
          <>
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
                      {t(`types.permissionName.${permission.permission_name}`)}
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
          </>
        ) : null}
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
          loading={
            createRole.isLoading ||
            updateRole.isLoading ||
            updateRolePermission.isLoading
          }
          title={t(
            `Organization.Roles.components.Form.button.${
              role === undefined ? "create" : "safe"
            }`
          )}
        />
      </form>
    </div>
  );
};

export default OrganizationRolesForm;
