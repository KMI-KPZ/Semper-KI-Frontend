import { Container, PageHeader } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ResourcesMenu from "./components/Menu";
import ResourcesOverview from "./Overview/Overview";
import ResourcesPostProcessings from "./PostProcessings/PostProcessings";
import OntoPrinterContextProvider from "@/contexts/OntoPrinterContextProvider";
import ResourcesPrintersTable from "./Printers/Table";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ResourcesPrintersAdd from "./Printers/Add/Add";
import ResourcesMaterialsTable from "./Materials/Table";
import ResourcesMaterialsForm from "./Materials/Form";

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
        <Container direction="col" width="full" className="bg-white p-5">
          <Routes>
            <Route index element={<ResourcesOverview />} />
            <Route path="printers/*" element={<OntoPrinterContextProvider />}>
              <Route index element={<ResourcesPrintersTable />} />
              <Route
                path="add"
                element={
                  <PermissionGate
                    children={<ResourcesPrintersAdd />}
                    element="ResourcesPrintersAdd"
                  />
                }
              />
            </Route>
            <Route path="materials/*">
              <Route index element={<ResourcesMaterialsTable />} />
              <Route
                path="add"
                element={
                  <PermissionGate
                    element="ResourcesMaterialsForm"
                    showMessage
                    children={<ResourcesMaterialsForm />}
                  />
                }
              />
            </Route>
            <Route
              path="postprocessings/*"
              element={<ResourcesPostProcessings />}
            />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Resouces;
