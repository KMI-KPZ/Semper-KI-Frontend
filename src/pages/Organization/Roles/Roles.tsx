import { Heading } from "@component-library/Typography";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import OrganizationRolesForm from "./components/Form";
import OrganizationRolesTable from "./components/Table";

interface OrganizationRolesProps {}

const OrganizationRoles: React.FC<OrganizationRolesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { rolesQuery: organizationRolesQuery } = useOrganizations();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 ">
      <Heading variant="h2">{t("Organization.Roles.index.header")}</Heading>
      {/* <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5">
        <LoadingSuspense query={organizationRolesQuery}>
          {organizationRolesQuery.data !== undefined &&
          organizationRolesQuery.data.length > 0
            ? organizationRolesQuery.data.map((role, index) => (
                <OrganizationRoleTag key={index} {...role} />
              ))
            : t("Organization.Roles.index.error.empty")}
        </LoadingSuspense>
      </div> */}
      <OrganizationRolesTable roles={organizationRolesQuery.data} />
      <OrganizationRolesForm />
    </div>
  );
};

export default OrganizationRoles;
