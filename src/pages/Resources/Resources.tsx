import { Container, PageHeader } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ResourcesMenu from "./components/Menu";
import ResourcesOverview from "./Overview/Overview";
import ResourcesPostProcessings from "./PostProcessings/PostProcessings";
import ResourcesPrintersTable from "./Printers/Table";
import ResourcesMaterialsTable from "./Materials/Table";
import ResourcesNode from "./components/Node";
import OrgaGraph from "./components/OrgaGraph";
import ResourcesNodeView from "./components/NodeView";
import PrivateGraph from "./components/PrivateGraph";
import RequestInformationForm from "./RequestInformation/RequestInformationForm";
import RequestInformation from "./RequestInformation/RequestInformation";
import ResourcesOutlet from "@/outlets/ResourcesOutlet";

interface ResourcesProps {}

const Resources: React.FC<ResourcesProps> = (props) => {
  const {} = props;

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
            <Route element={<ResourcesOutlet />}>
              <Route index element={<ResourcesOverview />} />
              <Route path="request">
                <Route index element={<RequestInformation />} />
                <Route path="new" element={<RequestInformationForm />} />
              </Route>
              <Route path="printers/*">
                <Route index element={<ResourcesPrintersTable />} />
                <Route path="edit" element={<Navigate to=".." />} />
                <Route path="variant" element={<Navigate to=".." />} />
                <Route path="details" element={<Navigate to=".." />} />
                <Route
                  path="details/:nodeID"
                  element={
                    <>
                      <ResourcesPrintersTable />
                      <ResourcesNodeView />
                    </>
                  }
                />
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
                <Route path="details" element={<Navigate to=".." />} />
                <Route
                  path="details/:nodeID"
                  element={
                    <>
                      <ResourcesMaterialsTable />
                      <ResourcesNodeView />
                    </>
                  }
                />
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
                <Route path="details" element={<Navigate to=".." />} />
                <Route
                  path="details/:nodeID"
                  element={
                    <>
                      <ResourcesPostProcessings />
                      <ResourcesNodeView />
                    </>
                  }
                />
                <Route
                  path="edit/:nodeID"
                  element={
                    <ResourcesNode
                      type="edit"
                      nodeType="additionalRequirement"
                    />
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
              <Route path="graph" element={<OrgaGraph />} />
              {process.env.NODE_ENV === "development" ? (
                <Route path="private-graph" element={<PrivateGraph />} />
              ) : null}
            </Route>
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Resources;
