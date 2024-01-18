import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesPostProcessingsProps {}

const ResourcesPostProcessings: React.FC<ResourcesPostProcessingsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3"
      data-testid="resources-post-processings"
    >
      <Heading variant="h2">{t("Resources.PostProcessings.header")}</Heading>
    </div>
  );
};

export default ResourcesPostProcessings;
