import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RoleProps,
} from "../../hooks/useOrganizations";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LoadingSuspense } from "@component-library/Loading";

interface OrganizationTableRowProps {
  role: RoleProps;
  allPermissions: Permission[];
}

const OrganizationTableRow: React.FC<OrganizationTableRowProps> = (props) => {
  const {
    role: { description, id, name },
    allPermissions,
  } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery, setPermissionMutation, deleteRoleMutation } =
    useOrganizations(id);
  const [edit, setEdit] = useState<boolean>(false);
  const [checkedPermissions, setCheckedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (
      rolePermissionsQuery.data !== undefined &&
      rolePermissionsQuery.data.length > 0
    ) {
      setCheckedPermissions(
        rolePermissionsQuery.data.map((permission) => permission.value)
      );
    }
  }, [rolePermissionsQuery.data]);

  const handleOnClickEdit = () => {
    if (edit === true)
      setPermissionMutation.mutate({
        roleID: id,
        permissionIDs: checkedPermissions,
      });
    setEdit((prevState) => !prevState);
  };
  const handleOnClickDelete = () => {
    deleteRoleMutation.mutate(id);
  };

  const handleOnChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCheckedPermissions((prevState) =>
      e.target.checked
        ? [...prevState, value]
        : [...prevState.filter((_value) => _value !== value)]
    );
  };

  return (
    <LoadingSuspense query={rolePermissionsQuery}>
      <tr>
        <td>{name}</td>
        <td>{description}</td>

        {allPermissions.map((permission, index) => (
          <td key={index}>
            <div className="flex items-center justify-center">
              {edit === true ? (
                <input
                  type="checkbox"
                  checked={checkedPermissions.includes(permission.value)}
                  onChange={(e) => handleOnChangeCheckbox(e, permission.value)}
                />
              ) : checkedPermissions.includes(permission.value) ? (
                <CheckIcon fontSize="small" />
              ) : (
                <ClearIcon fontSize="small" />
              )}
            </div>
          </td>
        ))}
        <td className="flex flex-row items-center justify-center gap-2">
          <div
            title={t("Organization.Roles.components.tag.button.delete")}
            onClick={handleOnClickEdit}
            className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-orange"
          >
            {edit === true ? (
              <CheckIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </div>
          <div
            title={t("Organization.Roles.components.tag.button.delete")}
            className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-red-300"
            onClick={handleOnClickDelete}
          >
            <DeleteForeverIcon fontSize="small" />
          </div>
        </td>
      </tr>
    </LoadingSuspense>
  );
};

export default OrganizationTableRow;
