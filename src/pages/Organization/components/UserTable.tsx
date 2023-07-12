import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@component-library/Button";
import useOrganizations, {
  OrganizationsUser,
  RoleProps,
} from "../hooks/useOrganizations";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import CheckIcon from "@mui/icons-material/Check";
import { Heading } from "@component-library/Typography";
import logger from "@/hooks/useLogger";

interface OrganizationTableProps {}

const OrganizationUserTable: React.FC<OrganizationTableProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { userQuery, rolesQuery } = useOrganizations();

  return (
    <LoadingSuspense
      query={userQuery}
      errorText={t("Organization.components.table.error.empty")}
      refetchLoading
    >
      <LoadingSuspense
        query={rolesQuery}
        errorText={t("Organization.components.table.error.empty")}
      >
        <Heading variant="h2">
          {t("Organization.components.table.header")}
        </Heading>
        <div className="w-full  overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="">
                <th>{t("Organization.components.table.picture")}</th>
                <th>{t("Organization.components.table.name")}</th>
                <th>{t("Organization.components.table.email")}</th>
                <th>{t("Organization.components.table.role")}</th>
                <th>{t("Organization.components.table.actions")}</th>
              </tr>
            </thead>
            <tbody className="">
              {userQuery.data !== undefined &&
              userQuery.data.length > 0 &&
              rolesQuery.data !== undefined
                ? userQuery.data.map((data, index) => (
                    <OrganizationtableRow
                      key={index}
                      user={data}
                      allRoles={rolesQuery.data}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </LoadingSuspense>
    </LoadingSuspense>
  );
};

const OrganizationtableRow: React.FC<{
  user: OrganizationsUser;
  allRoles: RoleProps[];
}> = (props) => {
  const {
    user: { email, name, picture, roles },
    allRoles,
  } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<RoleProps>(
    roles === undefined || (roles !== undefined && roles.length === 0)
      ? allRoles[0]
      : roles[0]
  );

  const { assignRoleMutation, removeRoleMutation, deleteUserMutation } =
    useOrganizations();

  const handleOnClickEdit = () => {
    if (edit === true && newRole !== undefined) {
      roles.forEach((role) => {
        removeRoleMutation.mutate({ email, roleID: role.id });
      });
      assignRoleMutation.mutate({ email, roleID: newRole.id });
    } else {
      setNewRole(
        roles === undefined || (roles !== undefined && roles.length === 0)
          ? allRoles[0]
          : roles[0]
      );
    }
    setEdit((prevState) => !prevState);
  };
  const handleOnClickDelete = () => {
    deleteUserMutation.mutate(email);
  };
  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (allRoles !== undefined) {
      const _newRole = allRoles.find((_role) => _role.id === e.target.value);
      if (_newRole !== undefined) {
        setNewRole(_newRole);
      }
    }
  };
  return (
    <tr className="">
      <td className="flex items-center justify-center">
        <img src={picture} className="h-8 w-8 object-contain" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{email}</td>
      <td className="text-center">
        {edit === false ? (
          roles.length > 0 ? (
            roles[0].name
          ) : (
            "---"
          )
        ) : (
          <select onChange={handleOnChangeSelect} value={newRole.id}>
            {allRoles !== undefined && allRoles.length > 0 ? (
              allRoles.map((_role, index) => (
                <option key={index} value={_role.id}>
                  {_role.name}
                </option>
              ))
            ) : (
              <option value="empty" disabled>
                {t("Organization.components.table.empty")}
              </option>
            )}
          </select>
        )}
      </td>
      <td className="flex flex-row items-center justify-center gap-3 p-3">
        <Button
          title={t(
            `Organization.components.table.button.${
              edit === true ? "safe" : "edit"
            }`
          )}
          onClick={handleOnClickEdit}
          children={
            edit === true ? (
              <CheckIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )
          }
        />
        <Button
          onClick={handleOnClickDelete}
          children={<DeleteForeverIcon fontSize="small" />}
          title={t("Organization.Roles.components.table.button.delete")}
        />
      </td>
    </tr>
  );
};

export default OrganizationUserTable;
