import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { AdminUserProps } from "../hooks/useAdmin";

interface AdminUserDetailsProps {
  user: AdminUserProps;
}

const AdminUserDetails: React.FC<AdminUserDetailsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h1">{t("Admin.User.details.title")}</Heading>
      <table className="w-fit table-auto border-separate border-spacing-x-4 border-spacing-y-1">
        <tbody>
          <tr>
            <td>{t("Admin.User.name")}</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>{t("Admin.User.email")}</td>
            <td>{user.details.email}</td>
          </tr>
          <tr>
            <td>{t("Admin.User.orga")}</td>
            <td className="max-w-lg whitespace-pre-wrap">
              {user.organizationNames.join(", ")}
            </td>
          </tr>
          <tr>
            <td>{t("Admin.User.created")}</td>
            <td className="whitespace-nowrap">
              {new Date(user.createdWhen).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>{t("Admin.User.accessed")}</td>
            <td className="whitespace-nowrap">
              {new Date(user.accessedWhen).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>{t("Admin.User.updated")}</td>
            <td className="whitespace-nowrap">
              {new Date(user.updatedWhen).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>{t("Admin.User.lastSeen")}</td>
            <td className="whitespace-nowrap">
              {new Date(user.lastSeen).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default AdminUserDetails;
