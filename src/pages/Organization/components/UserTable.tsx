import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Container, Divider } from "@component-library/index";
import { LoadingSuspense } from "@component-library/index";
import CheckIcon from "@mui/icons-material/Check";
import { Heading } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useUser, { UserType } from "@/hooks/useUser";
import useAssignRole from "@/api/Organization/Mutations/useAssignRole";
import useRemoveRole from "@/api/Organization/Mutations/useRemoveRole";
import useDeleteUser from "@/api/Organization/Mutations/useDeleteUser";
import useGetOrganizationUsers, {
  OrganizationsUser,
} from "@/api/Organization/Querys/useGetOrganizationUsers";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";

interface OrganizationTableProps {}

const OrganizationUserTable: React.FC<OrganizationTableProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const rolesQuery = useGetOrganizationRoles();
  const userQuery = useGetOrganizationUsers();
  return (
    <Container className="container" width="full" direction="col">
      <Heading variant="h2">
        {t("Organization.components.table.header")}
      </Heading>
      <Divider />
      <LoadingSuspense
        query={userQuery}
        errorText={t("Organization.components.table.error.empty")}
        refetchLoading
      >
        <LoadingSuspense
          query={rolesQuery}
          errorText={t("Organization.components.table.error.empty")}
        >
          <div className="w-full overflow-auto">
            <div className="w-full">
              <table className="w-full table-auto border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th>{""}</th>
                    <th className="px-3 text-left">
                      {t("Organization.components.table.name")}
                    </th>
                    <th className="px-3 text-left">
                      {t("Organization.components.table.email")}
                    </th>
                    <th className="px-3 text-left">
                      {t("Organization.components.table.role")}
                    </th>
                    <th className="px-3">
                      {t("Organization.components.table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userQuery.data !== undefined &&
                  userQuery.data.length > 0 &&
                  rolesQuery.data !== undefined
                    ? userQuery.data.map((data, index) => (
                        <OrganizationtableRow
                          key={index}
                          user={data}
                          currentUser={
                            user.usertype !== UserType.ANONYM &&
                            user.details.email === data.email
                          }
                          allRoles={rolesQuery.data}
                        />
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </LoadingSuspense>
      </LoadingSuspense>
    </Container>
  );
};

const OrganizationtableRow: React.FC<{
  user: OrganizationsUser;
  allRoles: RoleProps[];
  currentUser: boolean;
}> = (props) => {
  const {
    user: { email, name, picture, roles },
    allRoles,
    currentUser,
  } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<RoleProps>(
    roles === undefined || (roles !== undefined && roles.length === 0)
      ? allRoles[0]
      : roles[0]
  );

  const assignRole = useAssignRole();
  const removeRole = useRemoveRole();
  const deleteUser = useDeleteUser();
  const handleOnClickEdit = () => {
    if (edit === true && newRole !== undefined) {
      roles.forEach((role) => {
        removeRole.mutate({ email, roleID: role.id });
      });
      assignRole.mutate({ email, roleID: newRole.id });
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
    if (
      window.confirm(t("Organization.components.table.confirmDelete")) === true
    )
      deleteUser.mutate(email);
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
    <tr
      className={`${
        currentUser === true
          ? "overflow-clip bg-slate-100 [&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl"
          : ""
      }`}
    >
      <td>
        <div className="h-20 w-20 overflow-clip rounded-l-xl object-contain">
          <img src={picture} />
        </div>
      </td>
      <td className="p-3">{name}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">
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
      <td className="p-3">
        <div className="flex h-full flex-row items-center justify-center gap-5 p-3">
          <PermissionGate element="OrganizationButtonEditUser">
            <Button
              size="sm"
              variant="text"
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
          </PermissionGate>
          <PermissionGate element="OrganizationButtonDeleteUser">
            <Button
              variant="text"
              size="sm"
              onClick={handleOnClickDelete}
              children={<DeleteForeverIcon fontSize="small" />}
              title={t("Organization.Roles.components.Table.button.delete")}
            />
          </PermissionGate>
        </div>
      </td>
    </tr>
  );
};

export default OrganizationUserTable;
