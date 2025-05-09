import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
  Search,
  Text,
} from "@component-library/index";
import {
  OntoNode,
  OntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useOrganization from "@/hooks/useOrganization";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import Collapsible from "@/components/Collapsible/Collapsible";
import useGetOrgaNodesByType from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import ResourcesNodeView from "./NodeView";
import useModal from "@/hooks/useModal";

interface ResourcesNodeDraftProps {
  nodeType: OntoNodeType;
  setFormToDraft(nodeID: string): void;
  nodeAlreadyFilled: boolean;
}

const ResourcesNodeDraft: React.FC<ResourcesNodeDraftProps> = (props) => {
  const { nodeType, setFormToDraft } = props;
  const { t } = useTranslation();
  const nodes = useGetOrgaNodesByType(nodeType);
  const [paginationAll, setPaginationAll] = React.useState<number>(5);
  const { organization } = useOrganization();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();
  const [detailsNodeID, setDetailsNodeID] = React.useState<string>("");
  const { deleteModal } = useModal();

  const handleOnClickButtonDraft = (nodeID: string) => {
    setFormToDraft(nodeID);
  };

  const resetNodeID = () => {
    setDetailsNodeID("");
  };

  const handleOnClickModalButtonDraft = (nodeID: string) => {
    setFormToDraft(nodeID);
    deleteModal("nodeView");
  };

  if (nodes.isLoading) return <LoadingAnimation />;
  if (nodes.data !== undefined)
    return (
      <Container width="full" direction="col" className="card gap-0 bg-white">
        <Heading variant="h3" className="">
          {t("components.Resources.NodeDraft.draft")}
        </Heading>
        <Collapsible initialOpen showButton className="mt-5">
          <Container width="full" direction="col" className="">
            <Container width="full" direction="col" gap={3}>
              <Text className="text-center">
                {t("components.Resources.NodeDraft.draftDescription")}
              </Text>
              <Text className="text-center">
                {t("components.Resources.NodeDraft.draftDescription2")}
              </Text>
            </Container>
            <Search handleSearchInputChange={handleSearchInputChange} />

            <Container
              width="full"
              direction="col"
              className="mb-5 overflow-auto"
              justify="start"
              items="start"
            >
              <table className="card-container w-full table-auto border-separate border-spacing-x-0 p-0">
                <thead>
                  <tr>
                    <th className="bg-gray-50">
                      <div className="flex items-center justify-center ">
                        <Button
                          variant="text"
                          title={t("components.Resources.NodeDraft.table.name")}
                          onClick={() => handleSort("name")}
                          className="whitespace-nowrap"
                        >
                          <div className="ml-6 flex flex-row items-center justify-center">
                            {t("components.Resources.NodeDraft.table.name")}
                            {getSortIcon("name")}
                          </div>
                        </Button>
                      </div>
                    </th>
                    <th className="bg-gray-50">
                      <div className="flex items-center justify-center ">
                        <Button
                          variant="text"
                          title={t(
                            "components.Resources.NodeDraft.table.createdBy"
                          )}
                          onClick={() => handleSort("createdBy")}
                          className="whitespace-nowrap"
                        >
                          <div className="ml-6 flex flex-row items-center justify-center">
                            {t(
                              "components.Resources.NodeDraft.table.createdBy"
                            )}
                            {getSortIcon("createdBy")}
                          </div>
                        </Button>
                      </div>
                    </th>
                    <th className="bg-gray-50">
                      {t("components.Resources.NodeDraft.table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nodes.data
                    .filter((node) => filterDataBySearchInput(node))
                    .slice(0, paginationAll)
                    .sort(sortItems)
                    .map((node: OntoNode, index) => (
                      <tr key={node.nodeID}>
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          {node.name}
                        </td>
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          {node.createdBy === organization.hashedID
                            ? organization.name
                            : "Semper-KI"}
                        </td>
                        <td
                          className={`border-t-2 p-3 text-center ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <Container width="full">
                            <Button
                              variant="text"
                              size="sm"
                              title={t(
                                "components.Resources.NodeDraft.button.details"
                              )}
                              onClick={() => {
                                setDetailsNodeID(node.nodeID);
                              }}
                            />
                            <Button
                              variant="text"
                              size="sm"
                              title={t(
                                "components.Resources.NodeDraft.button.draft"
                              )}
                              onClick={() => {
                                handleOnClickButtonDraft(node.nodeID);
                              }}
                            />
                          </Container>
                        </td>
                      </tr>
                    ))}
                  {nodes.data.length > paginationAll ||
                  nodes.data.length > 0 ? (
                    <tr key="more">
                      <td colSpan={3} className="border-t-2 p-3">
                        <Container width="full">
                          {nodes.data.length > paginationAll ? (
                            <Button
                              onClick={() =>
                                setPaginationAll((prevState) => prevState + 5)
                              }
                              title={t("general.button.showMore")}
                              size="sm"
                              variant="text"
                            />
                          ) : null}
                          {paginationAll > 0 ? (
                            <Button
                              onClick={() =>
                                setPaginationAll((prevState) => prevState - 5)
                              }
                              title={t("general.button.showLess")}
                              size="sm"
                              variant="text"
                            />
                          ) : null}
                        </Container>
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td
                      colSpan={3}
                      className={`border-t-2 p-3 text-center ${
                        nodes.data
                          .filter((node) => filterDataBySearchInput(node))
                          .sort(sortItems).length %
                          2 ===
                        1
                          ? "bg-gray-50"
                          : "bg-white"
                      }`}
                    >
                      <Container width="full">
                        <Text>
                          {t("components.Resources.NodeDraft.notFound")}
                        </Text>
                        <Button
                          variant="text"
                          size="sm"
                          title={t(
                            "components.Resources.NodeDraft.button.search"
                          )}
                          to={`../../request/new?type=${nodeType}`}
                        />
                      </Container>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Container>
          </Container>
        </Collapsible>
        <ResourcesNodeView nodeID={detailsNodeID} closeModal={resetNodeID}>
          <Container
            width="fit"
            className="card sticky bottom-5 bg-white px-4 py-2"
          >
            <Button
              variant="text"
              size="sm"
              title={t("components.Resources.NodeDraft.button.draft")}
              onClick={() => {
                handleOnClickModalButtonDraft(detailsNodeID);
              }}
            />
          </Container>
        </ResourcesNodeView>
      </Container>
    );
  return <Text>{t("components.Resources.NodeDraft.error")}</Text>;
};

export default ResourcesNodeDraft;
