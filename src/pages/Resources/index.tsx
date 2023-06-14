import { PageHeader } from "@component-library/Page";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ResoucesMenu from "./components/Menu";
import ResourcesMaterials from "./Materials";
import ResourcesOverview from "./Overview";
import ResourcesPostProcessings from "./PostProcessings";
import ResourcesPrinters from "./Printers";

interface ResoucesViewProps {}

const ResoucesView: React.FC<ResoucesViewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <PageHeader>
        <Heading variant="h1">{t("Resources.header")}</Heading>
      </PageHeader>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <ResoucesMenu />
        <Routes>
          <Route index element={<ResourcesOverview />} />
          <Route path="printers/*" element={<ResourcesPrinters />} />
          <Route path="materials/*" element={<ResourcesMaterials />} />
          <Route
            path="postprocessings/*"
            element={<ResourcesPostProcessings />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ResoucesView;
