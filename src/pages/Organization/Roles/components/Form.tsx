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
import { getSimplifiedPermissions } from "../Roles";

interface OrganizationRolesFormProps {
  allPermissions: Permission[];
  role?: RoleProps;
}

interface FormData {
  name: string;
  description: string;
  permissions: {
    [key: string]: {
      [key: string]: boolean;
    };
  }[];
}

const OrganizationRolesForm: React.FC<OrganizationRolesFormProps> = (props) => {
  const { role, allPermissions } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery, createRoleMutation } = useOrganizations(
    role?.id
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getInintialDefaultValues = (): FormData => {
    return {
      name: "",
      description: "",
      permissions: [],
    };
  };

  logger(
    "OrganizationRolesForm",
    role,
    allPermissions,
    rolePermissionsQuery?.data
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      role === undefined
        ? getInintialDefaultValues()
        : async () => {
            return {
              name: role.name,
              description: role.description,
              permissions: [],
            };
          },
  });

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
            placeholder={t("Organization.Roles.components.Table.name") + "..."}
            {...register("name", {
              required: t(
                "Organization.Roles.components.Form.validation.name.required"
              ),
            })}
            className="w-full bg-slate-100 px-5 py-2 "
          />
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
        </div>
        {getSimplifiedPermissions(allPermissions).map((_permission, _index) => (
          <div
            className="flex flex-col items-center justify-center gap-3"
            key={_index}
          >
            <Heading variant="h2">
              {t(`Organization.Roles.components.Table.${_permission.name}`)}
            </Heading>
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
              {_permission.permissions.map((permission, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <Text variant="body">{permission}</Text>
                  <input
                    type="checkbox"
                    {...register(
                      `permissions.${_permission.name}.${permission}`
                    )}
                    className="w-full bg-slate-100 px-5 py-2 "
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
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
