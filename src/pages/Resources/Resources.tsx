import { PageHeader } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ResourcesMenu from "./components/Menu";
import ResourcesMaterials from "./Materials/Materials";
import ResourcesOverview from "./Overview/Overview";
import ResourcesPostProcessings from "./PostProcessings/PostProcessings";
import ResourcesPrinters from "./Printers/Printers";
import OntoPrinterContextProvider from "@/contexts/OntoPrinterContextProvider";

interface ResoucesProps {}

const Resouces: React.FC<ResoucesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <PageHeader>
        <Heading variant="h1">{t("Resources.header")}</Heading>
      </PageHeader>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <ResourcesMenu />
        <Routes>
          <Route index element={<ResourcesOverview />} />
          <Route
            path="printers/*"
            element={
              <OntoPrinterContextProvider>
                <ResourcesPrinters />
              </OntoPrinterContextProvider>
            }
          />
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

export default Resouces;
