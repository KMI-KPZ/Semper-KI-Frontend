import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@component-library/Button";
import useOrganizations, {
  OrganizationsUser,
  RoleProps,
} from "../hooks/useOrganizations";
import { LoadingSuspense } from "@component-library/Loading";
import CheckIcon from "@mui/icons-material/Check";
import { Heading } from "@component-library/Typography";

interface OrganizationtableProps {}

const Organizationtable: React.FC<OrganizationtableProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { userQuery, rolesQuery } = useOrganizations();

  return (
    <LoadingSuspense
      query={userQuery}
      errorText={t("Organization.components.table.error.empty")}
    >
      <LoadingSuspense
        query={rolesQuery}
        errorText={t("Organization.components.table.error.empty")}
      >
        <Heading variant="h2">
          {t("Organization.components.table.header")}
        </Heading>
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
            {userQuery.data !== undefined && userQuery.data.length > 0
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
      </LoadingSuspense>
    </LoadingSuspense>
  );
};

const OrganizationtableRow: React.FC<{
  user: OrganizationsUser;
  allRoles: RoleProps[] | undefined;
}> = (props) => {
  const {
    user: { email, name, picture, roles },
    allRoles,
  } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [role, setRole] = useState<RoleProps>(roles[0]);
  const { assignRoleMutation, deleteUserMutation } = useOrganizations();

  const handleOnClickEdit = () => {
    if (edit === true && role !== undefined) {
      assignRoleMutation.mutate({ email, roleID: role.id });
    }
    setEdit((prevState) => !prevState);
  };
  const handleOnClickDelete = () => {
    deleteUserMutation.mutate(email);
  };
  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (allRoles !== undefined) {
      const newRole = allRoles.find((_role) => _role.id === e.target.value);
      if (newRole !== undefined) {
        setRole(newRole);
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
          role !== undefined ? (
            role.name
          ) : (
            "none"
          )
        ) : (
          <select onChange={handleOnChangeSelect}>
            {allRoles?.map((_role, index) => (
              <option key={index} value={_role.id}>
                {_role.name}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="flex flex-row items-center justify-center gap-3 p-3">
        <Button
          onClick={handleOnClickEdit}
          icon={
            edit === true ? (
              <CheckIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )
          }
        />
        <Button onClick={handleOnClickDelete} icon={<DeleteForeverIcon />} />
      </td>
    </tr>
  );
};

export default Organizationtable;
