import { Container, Heading, Text } from "@component-library/index";
import { useTranslation } from "react-i18next";
import OrganizationRolesForm from "./components/Form";
import { Button, Divider, LoadingSuspense } from "@component-library/index";
import OrganizationRolesItem from "./components/Item";
import { Fragment, useState } from "react";
import OrganizationRolesTable from "./components/Table";
import { Modal } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useGetOrganizationPermissions, {
  PermissionContextTranslationType,
  PermissionProps,
  PermissionTypeTranslationType,
} from "@/api/Organization/Querys/useGetOrganizationPermissions";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";

interface OrganizationRolesProps {}

export interface PermissionGroupProps {
  context: PermissionContextTranslationType;
  permissionTypes: PermissionTypeTranslationType[];
}

export const sortPermissions = (
  permission1: PermissionProps,
  permission2: PermissionProps
): number => {
  if (permission1.permission_name < permission2.permission_name) {
    return -1;
  }
  if (permission1.permission_name > permission2.permission_name) {
    return 1;
  }
  return 0;
};

export const getGroupedPermissions = (
  permissions: PermissionProps[]
): PermissionGroupProps[] => {
  const groupedPermissions: PermissionGroupProps[] = [];
  permissions
    .sort((perm1, perm2) => sortPermissions(perm1, perm2))
    .forEach((permission) => {
      const index = groupedPermissions.findIndex(
        (item) => item.context === permission.context
      );
      if (index === -1) {
        groupedPermissions.push({
          context: permission.context,
          permissionTypes: [permission.permissionType],
        });
      } else {
        groupedPermissions[index].permissionTypes.push(
          permission.permissionType
        );
      }
    });
  return groupedPermissions;
};

export const getPermissinContextTranslations = (
  permissions: PermissionProps[]
): { context: PermissionContextTranslationType; count: number }[] => {
  let contexts: PermissionContextTranslationType[] = [];
  permissions.sort(sortPermissions).forEach((permission) => {
    if (!contexts.includes(permission.context)) {
      contexts.push(permission.context);
    }
  });
  let list: { context: PermissionContextTranslationType; count: number }[] = [];
  contexts.forEach((context) => {
    list.push({
      context: context,
      count: permissions.filter((permission) => permission.context === context)
        .length,
    });
  });
  return list;
};

const OrganizationRoles: React.FC<OrganizationRolesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const rolesQuery = useGetOrganizationRoles();
  const permissionsQuery = useGetOrganizationPermissions();
  const [edit, setEdit] = useState<boolean>(false);
  const [role, setRole] = useState<RoleProps | undefined>();

  const resetForm = () => {
    setRole(undefined);
    setEdit(false);
  };
  const editRole = (role: RoleProps) => {
    setRole(role);
    setEdit(true);
  };
  const createNewRole = () => {
    setRole(undefined);
    setEdit(true);
  };

  return (
    <Container className="container" width="full" direction="col">
      <Heading variant="h2">{t("Organization.Roles.Roles.header")}</Heading>
      <Divider />
      <LoadingSuspense query={rolesQuery}>
        {rolesQuery.data !== undefined && rolesQuery.data.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-5 md:hidden">
              {rolesQuery.data.map((role, index) => (
                <Fragment key={index}>
                  <OrganizationRolesItem editRole={editRole} role={role} />
                </Fragment>
              ))}
            </div>
            <OrganizationRolesTable
              roles={rolesQuery.data}
              editRole={editRole}
            />
            <PermissionGate element="OrganizationButtonCreateRole">
              <Button
                title={t("Organization.Roles.Roles.button.create")}
                onClick={createNewRole}
              />
            </PermissionGate>
          </>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </LoadingSuspense>
      <Modal
        modalKey="OrganizationRolesForm"
        open={edit}
        closeModal={() => {
          setEdit(false), setRole(undefined);
        }}
      >
        <LoadingSuspense query={permissionsQuery}>
          {permissionsQuery.data !== undefined ? (
            <OrganizationRolesForm
              resetForm={resetForm}
              role={role}
              allPermissions={permissionsQuery.data}
            />
          ) : null}
        </LoadingSuspense>
      </Modal>
    </Container>
  );
};

export default OrganizationRoles;
