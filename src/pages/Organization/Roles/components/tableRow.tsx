import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LoadingSuspense } from "@component-library/Loading";

interface OrganizationTableRowProps {
  role: RoleProps;
}

const OrganizationTableRow: React.FC<OrganizationTableRowProps> = (props) => {
  const {
    role: { description, id, name },
  } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery, setPermissionMutation } = useOrganizations(id);
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <LoadingSuspense query={rolePermissionsQuery}>
      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td className="flex flex-row items-center justify-center gap-2">
          <div
            title={t("Organization.Roles.components.tag.button.delete")}
            onClick={() => {}}
            className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-orange"
          >
            <EditIcon fontSize="small" />
          </div>
          <div
            title={t("Organization.Roles.components.tag.button.delete")}
            className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-red-300"
            onClick={() => {}}
          >
            <DeleteForeverIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <ClearIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <ClearIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <ClearIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <CheckIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <ClearIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <CheckIcon fontSize="small" />
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center">
            <ClearIcon fontSize="small" />
          </div>
        </td>
      </tr>
    </LoadingSuspense>
  );
};

export default OrganizationTableRow;
