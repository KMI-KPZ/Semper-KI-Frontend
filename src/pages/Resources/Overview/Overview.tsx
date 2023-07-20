import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesOverviewProps {}

const ResourcesOverview: React.FC<ResourcesOverviewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3"
      data-testid="resources-overview"
    >
      <Heading variant="h2">{t("Resources.Overview.header")}</Heading>
    </div>
  );
};

export default ResourcesOverview;
