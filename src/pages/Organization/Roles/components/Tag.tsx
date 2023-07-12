import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

const OrganizationRoleTag: React.FC<RoleProps & { openModal?(): void }> = (
  props
) => {
  const { name, id, description, openModal } = props;
  const { t } = useTranslation();
  const { deleteRoleMutation } = useOrganizations();
  const handleOnClickButtonDelete = () => {
    deleteRoleMutation.mutate(id);
  };
  const handleOnClickButtonEdit = () => {};
  return (
    <div
      className="flex flex-row items-center justify-center gap-1 rounded-2xl bg-blau-50 px-3 py-1"
      title={description}
    >
      <span>{name}</span>
      <div
        title={t("Organization.Roles.components.tag.button.delete")}
        onClick={handleOnClickButtonEdit}
        className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-orange"
      >
        <EditIcon fontSize="small" />
      </div>
      <div
        title={t("Organization.Roles.components.tag.button.delete")}
        className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-red-300"
        onClick={handleOnClickButtonDelete}
      >
        <ClearIcon fontSize="small" />
      </div>
    </div>
  );
};

export default OrganizationRoleTag;
