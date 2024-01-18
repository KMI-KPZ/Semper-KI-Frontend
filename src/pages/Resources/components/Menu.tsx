import { Button } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface ResourcesMenuProps {}

type ResourcesMenuItem = {
  title: string;
  to: string;
};

const ResourcesMenu: React.FC<ResourcesMenuProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const resourcesMenuItems: ResourcesMenuItem[] = [
    {
      title: t("Resources.components.Menu.overview"),
      to: "/resources",
    },
    {
      title: t("Resources.components.Menu.printers"),
      to: "/resources/printers",
    },
    {
      title: t("Resources.components.Menu.materials"),
      to: "/resources/materials",
    },
    {
      title: t("Resources.components.Menu.postProcessings"),
      to: "/resources/postprocessings",
    },
  ];

  const isActive = (to: string) => {
    if (to === "/resources") return to === pathname;
    return pathname.includes(to);
  };

  return (
    <nav
      className="flex h-fit flex-col bg-white p-3"
      data-testid="resources-menu"
    >
      {resourcesMenuItems.map((resourcesMenuItem, index) => (
        <Button
          testid="resources-menu-item"
          key={index}
          title={`${isActive(resourcesMenuItem.to) ? "> " : ""}${
            resourcesMenuItem.title
          }`}
          to={resourcesMenuItem.to}
          variant={isActive(resourcesMenuItem.to) ? "primary" : "secondary"}
        />
      ))}
    </nav>
  );
};

export default ResourcesMenu;
