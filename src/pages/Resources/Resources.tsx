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
import ResourcesNodeEdit from "./components/Edit";
import Graph from "./components/Graph";

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
                path="edit/:nodeID"
                element={<ResourcesNodeEdit type="edit" nodeType="printer" />}
              />
              <Route
                path="variant/:nodeID"
                element={
                  <ResourcesNodeEdit type="variant" nodeType="printer" />
                }
              />
              <Route
                path="create"
                element={<ResourcesNodeEdit type="create" nodeType="printer" />}
              />
            </Route>
            <Route path="materials/*">
              <Route index element={<ResourcesMaterialsTable />} />
              <Route
                path="edit/:nodeID"
                element={<ResourcesNodeEdit type="edit" nodeType="material" />}
              />
              <Route
                path="variant/:nodeID"
                element={
                  <ResourcesNodeEdit type="variant" nodeType="material" />
                }
              />
              <Route
                path="create"
                element={
                  <ResourcesNodeEdit type="create" nodeType="material" />
                }
              />
            </Route>
            <Route path="postprocessings/*">
              <Route index element={<ResourcesPostProcessings />} />
              <Route
                path="edit/:nodeID"
                element={
                  <ResourcesNodeEdit
                    type="edit"
                    nodeType="additionalRequirement"
                  />
                }
              />
              <Route
                path="variant/:nodeID"
                element={
                  <ResourcesNodeEdit
                    type="variant"
                    nodeType="additionalRequirement"
                  />
                }
              />
              <Route
                path="create"
                element={
                  <ResourcesNodeEdit
                    type="create"
                    nodeType="additionalRequirement"
                  />
                }
              />
            </Route>
            {process.env.NODE_ENV === "development" ? (
              <Route path="graph" element={<Graph />} />
            ) : null}
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Resouces;
