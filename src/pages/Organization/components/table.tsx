import React from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@component-library/Button";
import useOrganizations, { OrganizationsUser } from "../hooks/useOrganizations";
import { LoadingSuspense } from "@component-library/Loading";

interface OrganizationtableProps {}

const Organizationtable: React.FC<OrganizationtableProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationUserQuery } = useOrganizations();

  return (
    <LoadingSuspense
      query={organizationUserQuery}
      errorText={t("Organization.components.table.error.empty")}
    >
      <h2>{t("Organization.components.table.header")}</h2>
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
          {organizationUserQuery.data !== undefined &&
          organizationUserQuery.data.length > 0
            ? organizationUserQuery.data.map((data, index) => (
                <OrganizationtableRow key={index} {...data} />
              ))
            : null}
        </tbody>
      </table>
    </LoadingSuspense>
  );
};

const OrganizationtableRow: React.FC<OrganizationsUser> = (props) => {
  const { email, name, picture } = props;
  const { t } = useTranslation();
  return (
    <tr className="">
      <td className="flex items-center justify-center">
        <img src={picture} className="h-8 w-8 object-contain" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{email}</td>
      <td className="text-center">{"none"}</td>
      <td className="flex flex-row items-center justify-center gap-3 p-3">
        <Button icon={<EditIcon />} />
        <Button icon={<DeleteForeverIcon />} />
      </td>
    </tr>
  );
};

export default Organizationtable;
