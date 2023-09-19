import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface AdminProps {}

const Admin: React.FC<AdminProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("Admin.Overview.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          title={t("Home.Home.Authorized.Admin.button.user")}
          to="/admin/user"
        />
        <Button
          title={t("Home.Home.Authorized.Admin.button.orga")}
          to="/admin/organization"
        />
        <Button
          title={t("Home.Home.Authorized.Admin.button.orders")}
          to="/admin/orders"
        />
      </div>
    </div>
  );
};

export default Admin;
