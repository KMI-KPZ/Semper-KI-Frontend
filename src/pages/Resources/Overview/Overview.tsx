import { Button, Container, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { ResourcesMenuItem } from "../components/Menu";

interface ResourcesOverviewProps {}

const ResourcesOverview: React.FC<ResourcesOverviewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const resourcesMenuItems: ResourcesMenuItem[] = [
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
  // kriterien (gewichtung)
  // Portfolio (graph, material, printer, postprocessing)
  // Qualität Management (referenzbauteil, maturity level)

  return (
    <div
      className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3"
      data-testid="resources-overview"
    >
      <Heading variant="h2">{t("Resources.Overview.header")}</Heading>
      <Container>
        {resourcesMenuItems.map((resourcesMenuItem, index) => (
          <Button
            testid="resources-menu-item"
            key={index}
            title={`${resourcesMenuItem.title}`}
            to={resourcesMenuItem.to}
            variant={"primary"}
          />
        ))}
      </Container>
    </div>
  );
};

export default ResourcesOverview;
