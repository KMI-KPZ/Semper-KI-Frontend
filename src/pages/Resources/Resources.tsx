import { Container, PageHeader } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ResourcesMenu from "./components/Menu";
import ResourcesOverview from "./Overview/Overview";
import ResourcesPostProcessings from "./PostProcessings/PostProcessings";
import ResourcesPrintersTable from "./Printers/Table";
import ResourcesMaterialsTable from "./Materials/Table";
import ResourcesNode from "./components/Node";
import Graph from "./components/Graph";
import AddIcon from "@mui/icons-material/Add";

interface ResoucesProps {}

const Resouces: React.FC<ResoucesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <PageHeader>
        <Heading variant="h1">Matching Profil</Heading>
        {/* <Heading variant="h1">{t("Resources.header")}</Heading> */}
      </PageHeader>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <ResourcesMenu />
        <Container
          direction="col"
          width="full"
          justify="start"
          className="bg-white p-5"
        >
          <Routes>
            <Route index element={<ResourcesOverview />} />
            <Route path="printers/*">
              <Route index element={<ResourcesPrintersTable />} />
              <Route path="edit" element={<Navigate to=".." />} />
              <Route path="variant" element={<Navigate to=".." />} />
              <Route
                path="edit/:nodeID"
                element={<ResourcesNode type="edit" nodeType="printer" />}
              />
              <Route
                path="variant/:nodeID"
                element={<ResourcesNode type="variant" nodeType="printer" />}
              />
              <Route
                path="create"
                element={<ResourcesNode type="create" nodeType="printer" />}
              />
            </Route>
            <Route path="materials/*">
              <Route index element={<ResourcesMaterialsTable />} />
              <Route path="edit" element={<Navigate to=".." />} />
              <Route path="variant" element={<Navigate to=".." />} />
              <Route
                path="edit/:nodeID"
                element={<ResourcesNode type="edit" nodeType="material" />}
              />
              <Route
                path="variant/:nodeID"
                element={<ResourcesNode type="variant" nodeType="material" />}
              />
              <Route
                path="create"
                element={<ResourcesNode type="create" nodeType="material" />}
              />
            </Route>
            <Route path="postprocessings/*">
              <Route index element={<ResourcesPostProcessings />} />
              <Route path="edit" element={<Navigate to=".." />} />
              <Route path="variant" element={<Navigate to=".." />} />
              <Route
                path="edit/:nodeID"
                element={
                  <ResourcesNode type="edit" nodeType="additionalRequirement" />
                }
              />
              <Route
                path="variant/:nodeID"
                element={
                  <ResourcesNode
                    type="variant"
                    nodeType="additionalRequirement"
                  />
                }
              />
              <Route
                path="create"
                element={
                  <ResourcesNode
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
