import { Button } from "@component-library/Button";
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
      <Button
        title={t("Resources.components.Menu.overview")}
        to="/resources"
        variant="text"
      />
      <Button
        title={t("Resources.components.Menu.printers")}
        to="/resources/printers"
        variant="text"
      />
      <Button
        title={t("Resources.components.Menu.materials")}
        to="/resources/materials"
        variant="text"
      />
      <Button
        title={t("Resources.components.Menu.postProcessings")}
        to="/resources/postprocessings"
        variant="text"
      />
    </nav>
  );
};

export default ResoucesMenu;
