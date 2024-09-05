import { Button } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FactoryIcon from "@mui/icons-material/Factory";
import NoteIcon from "@mui/icons-material/Note";

interface HomeAdminProps {}

const HomeAdmin: React.FC<HomeAdminProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Home.components.Admin.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          startIcon={<SupervisorAccountIcon />}
          title={t("Home.components.Admin.button.user")}
          to="/admin/user"
        />
        <Button
          startIcon={<FactoryIcon />}
          title={t("Home.components.Admin.button.orga")}
          to="/admin/organization"
        />
        <Button
          startIcon={<NoteIcon />}
          title={t("Home.components.Admin.button.projects")}
          to="/admin/projects"
        />
      </div>
    </div>
  );
};

export default HomeAdmin;
