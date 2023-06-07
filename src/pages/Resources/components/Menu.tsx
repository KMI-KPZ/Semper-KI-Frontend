import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ResoucesMenuProps {}

const ResoucesMenu: React.FC<ResoucesMenuProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <nav className="flex h-fit flex-col bg-white p-3">
      <Link to="/resources">
        <Text variant="body">{t("Resources.components.Menu.overview")}</Text>
      </Link>
      <Link to="/resources/printers">
        <Text variant="body">{t("Resources.components.Menu.printers")}</Text>
      </Link>
      <Link to="/resources/materials">
        <Text variant="body">{t("Resources.components.Menu.materials")}</Text>
      </Link>
      <Link to="/resources/postprocessings">
        <Text variant="body">
          {t("Resources.components.Menu.postProcessings")}
        </Text>
      </Link>
    </nav>
  );
};

export default ResoucesMenu;
