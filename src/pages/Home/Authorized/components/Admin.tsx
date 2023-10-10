import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FactoryIcon from "@mui/icons-material/Factory";
import NoteIcon from "@mui/icons-material/Note";

interface HomeAuthorizedAdminProps {}

const HomeAuthorizedAdmin: React.FC<HomeAuthorizedAdminProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Home.Home.Authorized.Admin.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          startIcon={<AdminPanelSettingsIcon />}
          title={t("Home.Home.Authorized.Admin.button.general")}
          to="/admin"
        />
        <Button
          startIcon={<SupervisorAccountIcon />}
          title={t("Home.Home.Authorized.Admin.button.user")}
          to="/admin/user"
        />
        <Button
          startIcon={<FactoryIcon />}
          title={t("Home.Home.Authorized.Admin.button.orga")}
          to="/admin/organization"
        />
        <Button
          startIcon={<NoteIcon />}
          title={t("Home.Home.Authorized.Admin.button.projects")}
          to="/admin/projects"
        />
      </div>
    </div>
  );
};

export default HomeAuthorizedAdmin;
