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
import useGetOntoNodes, {
  OntoNode,
  OntoNodeNew,
  OntoNodeType,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { ResourcesNodeFormEdges } from "./NodeForm";
import { UseFormReset } from "react-hook-form";
import useOrganization from "@/hooks/useOrganization";
import useSearch from "@/hooks/useSearch";
import useSort from "@/hooks/useSort";
import Collapsible from "@/components/Collapsible/Collapsible";

interface ResourcesNodeDraftProps {
  nodeType: OntoNodeType;
  setFormToDraft(node: OntoNode): void;
  nodeAlreadyFilled: boolean;
}

const ResourcesNodeDraft: React.FC<ResourcesNodeDraftProps> = (props) => {
  const { nodeType, setFormToDraft, nodeAlreadyFilled } = props;
  const { t } = useTranslation();
  const nodes = useGetOntoNodes(nodeType);
  const { organization } = useOrganization();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<OntoNode>();
  const { getSortIcon, handleSort, sortItems } = useSort<OntoNode>();

  return (
    <Container width="full" direction="col" className="card gap-0">
      <Heading variant="h3" className="">
        {t("Resources.components.Edit.draft")}
      </Heading>
      <Collapsible initialOpen={true} className="mt-5">
        <Container width="full" direction="col" className="p-y5">
          <Search handleSearchInputChange={handleSearchInputChange} />
          {nodes.isLoading ? (
            <LoadingAnimation />
          ) : nodes.data !== undefined ? (
            <Container
              width="full"
              direction="col"
              className="overflow-auto"
              justify="start"
              align="start"
            >
              <table className="card-container w-full   table-auto border-separate border-spacing-x-0 p-0">
                <thead>
                  <tr>
                    <th className="bg-gray-50">
                      <div className="flex items-center justify-center ">
                        <Button
                          variant="text"
                          title={t("Resources.components.Edit.table.name")}
                          onClick={() => handleSort("name")}
                          className="whitespace-nowrap"
                        >
                          <div className="ml-6 flex flex-row items-center justify-center">
                            {t("Resources.components.Edit.table.name")}
                            {getSortIcon("name")}
                          </div>
                        </Button>
                      </div>
                    </th>
                    <th className="bg-gray-50">
                      <div className="flex items-center justify-center ">
                        <Button
                          variant="text"
                          title={t("Resources.components.Edit.table.createdBy")}
                          onClick={() => handleSort("createdBy")}
                          className="whitespace-nowrap"
                        >
                          <div className="ml-6 flex flex-row items-center justify-center">
                            {t("Resources.components.Edit.table.createdBy")}
                            {getSortIcon("createdBy")}
                          </div>
                        </Button>
                      </div>
                    </th>
                    <th className="bg-gray-50">
                      {t("Resources.components.Edit.table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nodes.data
                    .filter((node) => filterDataBySearchInput(node))
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
                            : "Sermper-KI"}
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
                                "Resources.components.Edit.button.draft"
                              )}
                              onClick={() => setFormToDraft(node)}
                            />
                          </Container>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Container>
          ) : (
            <Text>{t("Resources.components.Edit.error")}</Text>
          )}
        </Container>
      </Collapsible>
    </Container>
  );
};

export default ResourcesNodeDraft;
