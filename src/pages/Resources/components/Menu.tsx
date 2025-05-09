import { Button } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface ResourcesMenuProps {}

export type ResourcesMenuItem = {
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
      to: "/resources/printer",
    },
    {
      title: t("Resources.components.Menu.materials"),
      to: "/resources/material",
    },
    {
      title: t("Resources.components.Menu.colors"),
      to: "/resources/color",
    },
    {
      title: t("Resources.components.Menu.postProcessings"),
      to: "/resources/additionalRequirement",
    },
    {
      title: t("Resources.components.Menu.costing"),
      to: "/resources/costing",
    },
    {
      title: t("Resources.components.Menu.characterisation"),
      to: "/resources/characterisation",
    },
    {
      title: t("Resources.components.Menu.maturity"),
      to: "/resources/maturity",
    },
    {
      title: t("Resources.components.Menu.resilience"),
      to: "/resources/resilience",
    },
    // {
    //   title: t("Resources.components.Menu.request"),
    //   to: "/resources/request",
    // },
    {
      title: t("Resources.components.Menu.graph"),
      to: "/resources/graph",
    },
    {
      title: t("Resources.components.Menu.privat-graph"),
      to: "/resources/private-graph",
    },
  ];

  const isActive = (to: string) => {
    if (to === "/resources") return to === pathname;
    return pathname.includes(to);
  };

  return (
    <nav
      className="flex h-fit flex-col gap-5 bg-white p-3"
      data-testid="resources-menu"
    >
      {resourcesMenuItems
        .filter(
          (item) =>
            (process.env.NODE_ENV === "development" &&
              item.to === "/resources/private-graph") ||
            item.to !== "/resources/private-graph"
        )
        .map((resourcesMenuItem, index) => (
          <Button
            width="full"
            testid="resources-menu-item"
            key={index}
            title={`${resourcesMenuItem.title}`}
            to={resourcesMenuItem.to}
            variant={isActive(resourcesMenuItem.to) ? "primary" : "secondary"}
          />
        ))}
    </nav>
  );
};

export default ResourcesMenu;
