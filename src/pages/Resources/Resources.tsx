import { Button, Container, PageHeader } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ResourcesMenu from "./components/Menu";
import ResourcesOverview from "./Overview/Overview";
import OrgaGraph from "./components/OrgaGraph";
import ResourcesNodeView from "../../components/Resources/NodeView";
import PrivateGraph from "./components/PrivateGraph";
import RequestInformationForm from "./RequestInformation/RequestInformationForm";
import RequestInformation from "./RequestInformation/RequestInformation";
import ResourcesOutlet from "@/outlets/ResourcesOutlet";
import ResourcesNodeTable from "../../components/Resources/Table";
import ResourcesNodeForm from "@/components/Resources/NodeForm";
import { useTranslation } from "react-i18next";

interface ResourcesProps {}

const Resources: React.FC<ResourcesProps> = (props) => {
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
            <Route element={<ResourcesOutlet />}>
              <Route index element={<ResourcesOverview />} />
              <Route path="request">
                <Route index element={<RequestInformation />} />
                <Route path="new" element={<RequestInformationForm />} />
              </Route>
              <Route path=":nodeType">
                <Route index element={<ResourcesNodeTable />} />
                <Route
                  path="create"
                  element={<ResourcesNodeForm type="create" />}
                />
                <Route path=":nodeID">
                  <Route
                    index
                    element={
                      <ResourcesNodeView>
                        <Button
                          size="sm"
                          title={t("Resources.components.NodeView.button.edit")}
                          to="edit"
                        />
                      </ResourcesNodeView>
                    }
                  />
                  <Route
                    path="edit"
                    element={<ResourcesNodeForm type="edit" />}
                  />
                </Route>
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
