import React from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@component-library/Button";

interface OrganizationTabelProps {}

const TestUserData: OrganizationTabelRowProps[] = [
  {
    name: "Max Musterman",
    accessed: new Date(),
    created: new Date(),
    email: "Max.Musterman@test.de",
    role: "Admin",
  },
  {
    name: "Maxi Musterfrau",
    accessed: new Date(),
    created: new Date(),
    email: "Maxi.Musterfrau@test.de",
    role: "Lappen",
  },
  {
    name: "Heinz Kunz",
    accessed: new Date(),
    created: new Date(),
    email: "Heinz.Kunz@test.de",
    role: "Lappen",
  },
];

const OrganizationTabel: React.FC<OrganizationTabelProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="gap-5">
          <th>{t("Organization.components.tabel.name")}</th>
          <th>{t("Organization.components.tabel.email")}</th>
          <th>{t("Organization.components.tabel.role")}</th>
          <th>{t("Organization.components.tabel.created")}</th>
          <th>{t("Organization.components.tabel.accessed")}</th>
          <th>{t("Organization.components.tabel.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {TestUserData.map((data, index) => (
          <OrganizationTabelRow key={index} {...data} />
        ))}
      </tbody>
    </table>
  );
};

export interface OrganizationTabelRowProps {
  name: string;
  email: string;
  role: string;
  created: Date;
  accessed: Date;
}

const OrganizationTabelRow: React.FC<OrganizationTabelRowProps> = (props) => {
  const { accessed, created, email, name, role } = props;
  const { t } = useTranslation();
  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">{email}</td>
      <td className="text-center">{role}</td>
      <td className="text-center">{created.toLocaleDateString()}</td>
      <td className="text-center">{accessed.toLocaleDateString()}</td>
      <td className="text-center">
        <Button icon={<EditIcon />} />
      </td>
    </tr>
  );
};

export default OrganizationTabel;
