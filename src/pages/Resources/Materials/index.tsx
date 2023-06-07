import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesMaterialsProps {}

const ResourcesMaterials: React.FC<ResourcesMaterialsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3">
      <Heading variant="h2">{t("Resources.Materials.header")}</Heading>
    </div>
  );
};

export default ResourcesMaterials;
